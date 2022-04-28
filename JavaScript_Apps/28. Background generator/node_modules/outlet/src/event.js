/* @flow weak */

// $FlowFixMe
const {log, error, warn, debug} = require('zog')
const _ = require('lodash')

export class Event {

  name:string;
  app:any;
  callbacks:any;
  callbackOrdering:any;
  callInfo:any;
  moduleName:any;
  fn:any;
  description:any;

  constructor(name:string, app:any, {callInfo, moduleName, fn} = {}) {
    this.name = name
    this.app = app
    this.callbacks = {before: [], after: []}
    this.callbackOrdering = {before: [], after: []}
    // Callsite info.
    Object.assign(this, {callInfo, moduleName, fn})
  }

  desc(description) {
    this.description = description
    return this
  }

  async run(opts, performFn) {
    if (!this.name) return error('Event name not set')
    // Forward results from before hooks, if there is not a perform fn.
    let fn
    if (performFn) {
      fn = performFn
    } else {
      fn = this.fn ? this.fn : async (opts, beforeResults) => { return beforeResults }
    }
    return await this.app._perform(this.name, opts, fn)
  }

  /**
   * @param {string} stage - when the hooks should run. E.g. `before`, `after`.
   * @param {Object} opts
   * @param {string} opts.source - Used to determine whether this called as a hook on a previous event.
   */
  async runHooks(stage:string, opts:{source: any, stage: any}) {
    if (!this.callbacks[stage]) {
      warn(`No hooks for stage '${stage}' of event '${this.name}'`)
      return
    }
    const source = this.name
    let results = []
    const orderedCallbacks = this.constructor._orderCallbacks(this.callbacks[stage], this.callbackOrdering[stage])
    for (let callback of orderedCallbacks) {
      //this.vent.emit('runHook', stage, name, callInfo)
      //await exec(fn, opts)
      opts.source = source
      opts.stage = stage
      const result = await callback.run(opts)
      results.push(result)
    }
    return results
  }

  static _orderCallbacks(events, ordering) {
    let orderedEvents = []
    // Add events in order in which they are in the `ordering` array.
    for (const eventName of ordering) {
      // TODO(vjpr): Support passing an Event object instead of just a string.
      const event = _(events).find({name: eventName})
      if (event) orderedEvents.push(event)
    }
    // Add any events not in the `ordering` array.
    const remainingEvents = _.reject(events, event => _.includes(ordering, event.name))
    const allOrderedEvents = orderedEvents.concat(remainingEvents)
    return allOrderedEvents
  }

  addCallback(stage, cb) {
    this.callbacks[stage].push(cb)
    return this
  }

  // Set ordering of callbacks.
  order(stage, ordering) {
    this.callbackOrdering[stage] = ordering
  }

  //
  // Legacy
  //

  async get(...args) {return await this.run(...args)}

  async fire(...args) {return await this.run(...args)}

}
