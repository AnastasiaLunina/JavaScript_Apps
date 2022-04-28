import {Outlet, Event} from '..'

process.on('unhandledRejection', e => { throw e })

describe('Event', function() {

  it('sets name', () => {
    const name = 'foo'
    const event = new Event(name)
    expect(event.name).to.equal(name)
  })

})

describe('Outlet', function() {

  it('callbacks fire in the correct order', (done) => {

    const eventName = 'foo'
    const outlet = new Outlet
    const event = outlet.event(eventName)

    //outlet.vent.on('add-callback', (a) => {
    //  console.log('add-callback', a)
    //})

    const beforeCb1 = sinon.spy()
    const beforeCb2 = sinon.spy()
    const runCb = sinon.spy()
    const afterCb1 = sinon.spy()
    const afterCb2 = sinon.spy()

    outlet.before('foo', async() => {
      beforeCb1()
    })

    outlet.before('foo', async() => {
      beforeCb2()
    })

    outlet.after('foo', async() => {
      afterCb1()
    })

    outlet.after('foo', async() => {
      afterCb2()
    })

    event.run({}, async() => {
      runCb()
    }).then(() => {
      beforeCb1.should.be.calledBefore(beforeCb2)
      beforeCb2.should.be.calledBefore(runCb)
      runCb.should.have.been.calledOnce
      afterCb1.should.be.calledAfter(runCb)
      afterCb2.should.be.calledAfter(afterCb1)
      done()
    })

  })

  it('callbacks fire in correct order when manually ordered', (done) => {

    const eventName = 'foo'
    const outlet = new Outlet
    const event = outlet.event(eventName)

    const afterCb1 = sinon.spy()
    const afterCb2 = sinon.spy()

    const bar1 = outlet.event('bar1', async() => afterCb1())
    const bar2 = outlet.event('bar2', async() => afterCb2())

    // In real-world these handlers could be registered in separate files/modules.
    outlet.after('foo', bar1)
    outlet.after('foo', bar2)

    //outlet.after('foo', async () => afterCb1())
    //outlet.after('foo', async () => afterCb2())

    event.order('after', ['bar2', 'bar1'])

    event
      .run({}, async() => {true})
      .then(() => {
        //afterCb1.should.be.calledBefore(afterCb2)
        afterCb2.should.be.calledBefore(afterCb1)
        done()
      })
  })

})
