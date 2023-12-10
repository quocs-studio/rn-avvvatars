
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rn-avvvatars.cjs.production.min.js')
} else {
  module.exports = require('./rn-avvvatars.cjs.development.js')
}
