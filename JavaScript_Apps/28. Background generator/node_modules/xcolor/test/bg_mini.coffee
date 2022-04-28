assert = require 'assert'
xcolor = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'Basic background colors (mini)', ->

  it 'should format a white background message', ->
    msg = xcolor '&=wwTest&n'
    assert.equal msg, "\x1B[47m\x1B[37mTest#{reset}"

  it 'should format a black background message', ->
    msg = xcolor '&=lwTest&n'
    assert.equal msg, "\x1B[40m\x1B[37mTest#{reset}"

  it 'should format a blue background message', ->
    msg = xcolor '&=bwTest&n'
    assert.equal msg, "\x1B[44m\x1B[37mTest#{reset}"

  it 'should format a cyan background message', ->
    msg = xcolor '&=cwTest&n'
    assert.equal msg, "\x1B[46m\x1B[37mTest#{reset}"

  it 'should format a green background message', ->
    msg = xcolor '&=gwTest&n'
    assert.equal msg, "\x1B[42m\x1B[37mTest#{reset}"

  it 'should format a magenta background message', ->
    msg = xcolor '&=mwTest&n'
    assert.equal msg, "\x1B[45m\x1B[37mTest#{reset}"

  it 'should format a red background message', ->
    msg = xcolor '&=rwTest&n'
    assert.equal msg, "\x1B[41m\x1B[37mTest#{reset}"

  it 'should format a yellow background message', ->
    msg = xcolor '&=ywTest&n'
    assert.equal msg, "\x1B[43m\x1B[37mTest#{reset}"

  afterEach ->
    #console.log msg
