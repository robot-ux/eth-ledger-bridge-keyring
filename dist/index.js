
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./bsc-ledger-bridge-keyring.cjs.production.min.js')
} else {
  module.exports = require('./bsc-ledger-bridge-keyring.cjs.development.js')
}
