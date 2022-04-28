/* @flow weak */

// $FlowFixMe
const {log, error, warn, debug} = require('zog')
import path from 'path'
import EventEmitter from 'eventemitter3'
import _ from 'lodash'
import uniqueid from 'uniqueid'
// $FlowFixMe
import {getCallerFile, makeIDELink} from 'live-caller'
import {Event} from './event'

const getId = uniqueid()

export class Outlet {

  container;
  state;
  events;
  vent;
  moduleName;

  constructor(container = {}) {

    _.defaults(container, {
      events: {},
      state: {},
      vent: new EventEmitter,
    })

    this.container = container
    this.events = container.events
    this.state = container.state
    this.vent = container.vent

  }

  async runHooks(stage, name, opts = {}) {
    const event = this.events[name]
    if (!event) {
      console.warn(`Event was not found: '${name}'`)
      return
    }
    const results = await event.runHooks(stage, opts)
    return results
  }

  // name can also be an `Event` object.
  getOrCreateEvent(name, event) {
    if (event) {
      if (!this.events[event.name]) this.events[event.name] = event
      return event
    }
    return this.events[name] = this.events[name] || new Event(name, this)
  }

  addHook(stage, {name, event: sourceEvent, opts, fn, targetEvent, targetEvents}) {
    const callInfo = getCallerFile(3) // TODO(vjpr): Set correctly.
    const event = this.getOrCreateEvent(name, sourceEvent)

    const callbackName = (fn && fn.name) || `anon${getId()}`
    const callback = this.getOrCreateEvent(callbackName, targetEvent)
    callback.callInfo = callInfo
    callback.moduleName = this.moduleName
    if (!targetEvent) {
      callback.fn = fn
    }

    this.vent.emit('add-callback', name, callback)
    event.addCallback(stage, callback)
    return callback
  }

  async perform(name, opts, fn) {
    if (!fn) { fn = opts; opts = {} }
    if (!opts) opts = {}
    const callInfo = getCallerFile(2) // TODO: Need to find the first non-regenerator for live-app perform.
    await this._perform(name, {callInfo, ...opts}, fn)
  }

  async _perform(name, opts, fn) {
    if (!fn) { fn = opts; opts = {} }
    if (!opts) opts = {}
    this.vent.emit('start-perform', name, opts)
    const beforeResults = await this.runHooks('before', name, opts)
    this.vent.emit('run-event', name, opts)
    let result = null
    if (fn) result = await fn(opts, beforeResults)
    const afterResults = await this.runHooks('after', name, opts)
    return result
  }

  // Defines an event that handlers can be added to.
  event(name, opts, fn) {
    if (!fn) { fn = opts; opts = {} }
    if (!opts) opts = {}
    const evt = this.getOrCreateEvent(name)
    if (fn) evt.fn = fn // TODO(vjpr): Might be a bad idea.
    return evt
  }

  // TODO: Should we store lifecycle events for each event, or store events with a naming convention.
  // E.g. `app.on('before:some:event')` OR `app.before('some:event')`.
  // Two parts: Implementation and API.
  on(_name, _opts, _fn) {
    // TODO: Allow `before:event` sugar.
    //if (const rest = hasBeforePrefix(name)) return this.addHook('before', opts, ...rest.join(''))
    this.addHook('after', parseParams(arguments))
  }

  //register(name, opts, fn, done) {
  //
  //  const {before, after, ...rest} = opts
  //
  //  // Wrap function in perform function to trigger hooks.
  //  const performFn = this.perform.bind(this, name, opts, fn)
  //
  //  // TODO(vjpr): Only supports 1 before hook. Should support array.
  //  if (before) {
  //    this.addHook('before', {name: before[0], opts, fn: performFn})
  //    return
  //  }
  //
  //  if (after) {
  //    this.addHook('after', {name: after[0], opts, fn: performFn})
  //    return
  //  }
  //
  //}

  before(_name, _opts, _fn) {
    return this.addHook('before', parseParams(arguments))
  }

  after(_name, _opts, _fn) {
    return this.addHook('after', parseParams(arguments))
  }

  //
  // Legacy
  //

  reply(_name, _opts, _fn) {
    return this.addHook('before', parseParams(arguments))
  }

  // TODO: instead of logging with prefix `before`, use `provide`.
  provide(_name, _opts, _fn) {
    return this.addHook('before', parseParams(arguments))
  }

  //consumes(_name, _opts, _fn) {
  //  return this.addHook('after', parseParams(arguments))
  //}

  consume(name) {
    return this.event(name)
  }

  // ---

}

function parseParams(args) {
  let name, event, fn, opts, targetEvent, targetEvents
  if (_.isString(args[0])) {
    name = args[0]
  } else if (args[0] instanceof Event) {
    event = args[0]
  }

  if (args.length === 2) {
    if (args[1] instanceof Event) {
      targetEvent = args[1]
    } else if (_.isFunction(args[1])) {
      fn = args[1]
    }
  }

  if (args.length === 3) {
    opts = args[1]
    if (_.isFunction(args[2])) {
      fn = args[2]
    } else if (args[2] instanceof Event) {
      targetEvent = args[2]
    } else if (_.isArray(args[2])) {
      targetEvents = args[2] // TODO(vjpr): Allow passing an array of functions/Events.
    }
  }

  return {name, event, opts, fn, targetEvent}
}


//function parseParams(args) {
//  const {name, event, opts, fn, targetEvent} = Args([
//    [
//      {name: Args.STRING | Args.Required},
//      {event: Args.OBJECT | Args.Required, _type: Event},
//    ],
//    [
//      {fn: Args.FUNCTION | Args.Optional},
//      {targetEvent: Args.OBJECT | Args.Optional, _type: Event},
//      {targetEvents: Args.ARRAY | Args.Optional}, // TODO(vjpr): Allow passing an array of functions/Events.
//    ],
//  ], args)
//  return {name, event, opts, fn, targetEvent}
//}

function hasBeforePrefix(name) {
  // $FlowFixMe
  const [first, ...rest] = name.split(':')
  // $FlowFixMe
  if (first === 'before') return rest
  return false
}
