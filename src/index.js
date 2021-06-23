import FirefoxLedgerBridge from './firefox'
import ChromeLedgerBridge from './chrome'

const isChrome = (/chrome/iu).test(window.navigator.userAgent)

module.exports = isChrome ? ChromeLedgerBridge : FirefoxLedgerBridge
