import { EventEmitter } from 'events'
import HDKey from 'hdkey'
import ethUtil from 'ethereumjs-util'
import LedgerBridge from './LedgerBridge'

const pathBase = 'm'
const hdPathString = `${pathBase}/44'/60'/0'`
const type = 'Ledger Hardware'

const MAX_INDEX = 1000
const NETWORK_API_URLS = {
  ropsten: 'http://api-ropsten.etherscan.io',
  kovan: 'http://api-kovan.etherscan.io',
  rinkeby: 'https://api-rinkeby.etherscan.io',
  mainnet: 'https://api.etherscan.io',
}

class ChromeLedgerBridge extends EventEmitter {
  constructor (opts = {}) {
    super()
    this.accountDetails = {}
    this.type = type
    this.page = 0
    this.perPage = 5
    this.unlockedAccount = 0
    this.hdk = new HDKey()
    this.paths = {}
    this.network = 'mainnet'
    this.implementFullBIP44 = false
    this.deserialize(opts)

    this.bridge = new LedgerBridge()
  }

  serialize () {
    return Promise.resolve({
      hdPath: this.hdPath,
      accounts: this.accounts,
      accountDetails: this.accountDetails,
      implementFullBIP44: false,
    })
  }

  deserialize (opts = {}) {
    this.hdPath = opts.hdPath || hdPathString
    this.accounts = opts.accounts || []
    this.accountDetails = opts.accountDetails || {}
    this.implementFullBIP44 = opts.implementFullBIP44 || false

    // Remove accounts that don't have corresponding account details
    this.accounts = this.accounts.filter((account) => Object.keys(this.accountDetails).includes(
      ethUtil.toChecksumAddress(account),
    ))

    return Promise.resolve()
  }

  isUnlocked () {
    return Boolean(this.hdk && this.hdk.publicKey)
  }

  setAccountToUnlock (index) {
    this.unlockedAccount = parseInt(index, 10)
  }

  setHdPath (hdPath) {
    // Reset HDKey if the path changes
    if (this.hdPath !== hdPath) {
      this.hdk = new HDKey()
    }
    this.hdPath = hdPath
  }

  unlock (hdPath) {
    if (this.isUnlocked() && !hdPath) {
      return Promise.resolve('already unlocked')
    }
    const path = hdPath ? this._toLedgerPath(hdPath) : this.hdPath

    return this.bridge.unlock(path).then((payload) => {
      this.hdk.publicKey = Buffer.from(payload.publicKey, 'hex')
      this.hdk.chainCode = Buffer.from(payload.chainCode, 'hex')
      return payload.address
    })
  }

  getFirstPage () {
    this.page = 0
    return this.__getPage(1)
  }

  getNextPage () {
    return this.__getPage(1)
  }

  getPreviousPage () {
    return this.__getPage(-1)
  }

  updateTransportMethod () {
    console.log('Only for compatible')
  }

  signTransaction (address, tx, accountIndex) {
    return this.unlock().then((_) => {
      tx.v = ethUtil.bufferToHex(tx.getChainId())
      tx.r = '0x00'
      tx.s = '0x00'

      let hdPath
      if (this._isLedgerLiveHdPath()) {
        const index = accountIndex
        hdPath = this._getPathForIndex(index)
      } else {
        hdPath = this._toLedgerPath(this._pathFromAddress(address))
      }

      return this.bridge
        .signTransaction(
          hdPath,
          tx.serialize().toString('hex'),
          ethUtil.bufferToHex(tx.to).toLowerCase(),
        )
        .then((payload) => {
          tx.v = Buffer.from(payload.v, 'hex')
          tx.r = Buffer.from(payload.r, 'hex')
          tx.s = Buffer.from(payload.s, 'hex')
          return tx
        })
    })
  }

  async __getPage (increment) {
    this.page += increment

    if (this.page <= 0) {
      this.page = 1
    }
    const from = (this.page - 1) * this.perPage
    const to = from + this.perPage

    await this.unlock()
    let accounts
    if (this._isLedgerLiveHdPath()) {
      accounts = await this._getAccountsBIP44(from, to)
    } else {
      accounts = this._getAccountsLegacy(from, to)
    }

    return accounts
  }

  async _getAccountsBIP44 (from, to) {
    const accounts = []

    for (let i = from; i < to; i++) {
      const path = this._getPathForIndex(i)
      const address = await this.unlock(path)
      const valid = this.implementFullBIP44
        ? await this._hasPreviousTransactions(address)
        : true
      accounts.push({
        address,
        balance: null,
        index: i,
      })
      // PER BIP44
      // "Software should prevent a creation of an account if
      // a previous account does not have a transaction history
      // (meaning none of its addresses have been used before)."
      if (!valid) {
        break
      }
    }
    return accounts
  }

  _getAccountsLegacy (from, to) {
    const accounts = []

    for (let i = from; i < to; i++) {
      const address = this._addressFromIndex(pathBase, i)
      accounts.push({
        address,
        balance: null,
        index: i,
      })
      this.paths[ethUtil.toChecksumAddress(address)] = i
    }
    return accounts
  }

  _padLeftEven (hex) {
    return hex.length % 2 === 0 ? hex : `0${hex}`
  }

  _normalize (buf) {
    return this._padLeftEven(ethUtil.bufferToHex(buf).toLowerCase())
  }

  // eslint-disable-next-line no-shadow
  _addressFromIndex (pathBase, i) {
    const dkey = this.hdk.derive(`${pathBase}/${i}`)
    const address = ethUtil
      .publicToAddress(dkey.publicKey, true)
      .toString('hex')
    return ethUtil.toChecksumAddress(`0x${address}`)
  }

  _pathFromAddress (address) {
    const checksummedAddress = ethUtil.toChecksumAddress(address)
    let index = this.paths[checksummedAddress]
    if (typeof index === 'undefined') {
      for (let i = 0; i < MAX_INDEX; i++) {
        if (checksummedAddress === this._addressFromIndex(pathBase, i)) {
          index = i
          break
        }
      }
    }

    if (typeof index === 'undefined') {
      throw new Error('Unknown address')
    }
    return this._getPathForIndex(index)
  }

  _toAscii (hex) {
    let str = ''
    let i = 0
    const l = hex.length
    if (hex.substring(0, 2) === '0x') {
      i = 2
    }
    for (; i < l; i += 2) {
      const code = parseInt(hex.substr(i, 2), 16)
      str += String.fromCharCode(code)
    }

    return str
  }

  _getPathForIndex (index) {
    // Check if the path is BIP 44 (Ledger Live)
    return this._isLedgerLiveHdPath()
      ? `m/44'/60'/${index}'/0/0`
      : `${this.hdPath}/${index}`
  }

  _isLedgerLiveHdPath () {
    return this.hdPath === `m/44'/60'/0'/0/0`
  }

  _toLedgerPath (path) {
    return path.toString().replace('m/', '')
  }

  async _hasPreviousTransactions (address) {
    const apiUrl = this._getApiUrl()
    const response = await window.fetch(
      `${apiUrl}/api?module=account&action=txlist&address=${address}&tag=latest&page=1&offset=1`,
    )
    const parsedResponse = await response.json()
    if (parsedResponse.status !== '0' && parsedResponse.result.length > 0) {
      return true
    }
    return false
  }

  _getApiUrl () {
    return NETWORK_API_URLS[this.network] || NETWORK_API_URLS.mainnet
  }
}

ChromeLedgerBridge.type = type
export default ChromeLedgerBridge
