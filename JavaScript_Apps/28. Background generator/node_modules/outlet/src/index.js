const {Event} = require('./event')
const {Outlet} = require('./outlet')

const globalContainer = {}
const main = function() {
  return new Outlet(globalContainer)
}
main.Event = Event
main.Outlet = Outlet

module.exports = main
