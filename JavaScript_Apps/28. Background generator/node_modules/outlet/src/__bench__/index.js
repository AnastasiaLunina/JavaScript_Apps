var Benchmark = require('benchmark')
var suite = new Benchmark.Suite('Outlet')
var {Outlet} = require('../outlet')

process.on('unhandledException', () => { throw e })

function ee(EventEmitter, deferred) {
  const emitter = new EventEmitter
  emitter.on('foo:before', () => {
    emitter.emit('foo')
  })
  emitter.on('foo', () => {
    emitter.emit('foo:after')
  })
  emitter.on('foo:after', () => {
    deferred.resolve()
  })
  emitter.emit('foo:before')
}

suite

  .add('Outlet#run (async/await)', function(deferred) {
    const container = {}
    const outlet = new Outlet(container)
    const eventName = 'foo'
    const event = outlet.event(eventName)
    outlet.before(eventName, async (opts) => {})
    outlet.after(eventName, async (opts) => {})
    event.run({}, async (opts, results) => {}).then(() => {
      deferred.resolve()
    })
  }, {defer: true})

  // TODO
  //.add('Outlet#run (callbacks)', function(deferred) {
  //  const container = {}
  //  const outlet = new Outlet(container)
  //  const eventName = 'foo'
  //  const event = outlet.event(eventName)
  //  outlet.before(eventName, (done) => {})
  //  outlet.after(eventName, (done) => {})
  //  event.run({}, (done) => {}).then(() => {
  //    deferred.resolve()
  //  })
  //}, {defer: true})

  .add('understudy', function(deferred) {
    const Understudy = require('understudy')
    const actor = new Understudy
    const eventName = 'foo'
    actor.before(eventName, (next) => { next('hello') })
    actor.after(eventName, (next) => {
      next()
      deferred.resolve()
    })
    actor.perform(eventName, (next) => { next('hello') })
  }, {defer: true})

  .add('EventEmitter', function(deferred) {
    const EventEmitter = require('events')
    ee(EventEmitter, deferred)
  }, {defer: true})

  .add('EventEmitter3', function(deferred) {
    const EventEmitter = require('eventemitter3')
    ee(EventEmitter, deferred)
  }, {defer: true})

suite.on('cycle', function(event) {
  console.log(String(event.target))
})

if (!module.parent) {
  suite.run()
}

module.exports = suite
