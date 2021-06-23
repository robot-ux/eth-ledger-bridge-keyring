import TransportUsb from '@ledgerhq/hw-transport-webusb'
import LedgerEth from '@ledgerhq/hw-app-eth'
import { byContractAddress } from '@ledgerhq/hw-app-eth/erc20'

export default class LedgerBridge {
  async makeApp () {
    try {
      this.transport = await TransportUsb.create()
      this.app = new LedgerEth(this.transport)
    } catch (e) {
      console.log('LEDGER:::CREATE APP ERROR', e)
      throw e
    }
  }

  async cleanUp () {
    this.app = null
    if (this.transport) {
      await this.transport.close()
    }
  }

  async unlock (hdPath) {
    try {
      await this.makeApp()
      return await this.app.getAddress(hdPath, false, true)
    } catch (err) {
      return Promise.reject(this.ledgerErrToMessage(err))
    } finally {
      await this.cleanUp()
    }
  }

  async signTransaction (hdPath, tx, to) {
    try {
      await this.makeApp()
      if (to) {
        const isKnownERC20Token = byContractAddress(to)
        if (isKnownERC20Token) {
          await this.app.provideERC20TokenInformation(isKnownERC20Token)
        }
      }
      return await this.app.signTransaction(hdPath, tx)
    } catch (err) {
      return Promise.reject(this.ledgerErrToMessage(err))
    } finally {
      await this.cleanUp()
    }
  }

  async signPersonalMessage (hdPath, message) {
    try {
      await this.makeApp()
      return await this.app.signPersonalMessage(hdPath, message)
    } catch (err) {
      return Promise.reject(this.ledgerErrToMessage(err))
    } finally {
      this.cleanUp()
    }
  }

  ledgerErrToMessage (err) {
    const isU2FError = (e) => Boolean(e) && Boolean(e.metaData)
    const isStringError = (e) => typeof e === 'string'
    // eslint-disable-next-line no-prototype-builtins
    const isErrorWithId = (e) => e.hasOwnProperty('id') && e.hasOwnProperty('message')
    const isWrongAppError = (e) => String(e.message || e).includes('6804')
    const isLedgerLockedError = (e) => e.message && e.message.includes('OpenFailed')

    // https://developers.yubico.com/U2F/Libraries/Client_error_codes.html
    if (isU2FError(err)) {
      if (err.metaData.code === 5) {
        return 'LEDGER_TIMEOUT'
      }
      return err.metaData.type
    }

    if (isWrongAppError(err)) {
      return 'LEDGER_WRONG_APP'
    }

    if (
      isLedgerLockedError(err) ||
      (isStringError(err) && err.includes('6801'))
    ) {
      return 'LEDGER_LOCKED'
    }

    if (isErrorWithId(err)) {
      // Browser doesn't support U2F
      if (err.message.includes('U2F not supported')) {
        return 'U2F_NOT_SUPPORTED'
      }
    }

    // Other
    return err.toString()
  }
}
