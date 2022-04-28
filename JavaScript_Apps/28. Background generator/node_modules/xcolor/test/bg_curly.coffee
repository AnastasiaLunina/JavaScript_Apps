assert = require 'assert'
xcolor = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'Basic background colors (curly)', ->

  it 'should format a white background message', ->
    msg = xcolor '{{bg white}}Test{{/color}}'
    assert.equal msg, "\x1B[47mTest#{reset}"

  it 'should format a black background message', ->
    msg = xcolor '{{bg black}}Test{{/color}}'
    assert.equal msg, "\x1B[40mTest#{reset}"

  it 'should format a blue message', ->
    msg = xcolor '{{bg blue}}Test{{/color}}'
    assert.equal msg, "\x1B[44mTest#{reset}"

  it 'should format a cyan background message', ->
    msg = xcolor '{{bg cyan}}Test{{/color}}'
    assert.equal msg, "\x1B[46mTest#{reset}"

  it 'should format a green background message', ->
    msg = xcolor '{{bg green}}Test{{/color}}'
    assert.equal msg, "\x1B[42mTest#{reset}"

  it 'should format a magenta background message', ->
    msg = xcolor '{{bg magenta}}Test{{/color}}'
    assert.equal msg, "\x1B[45mTest#{reset}"

  it 'should format a red background message', ->
    msg = xcolor '{{bg red}}Test{{/color}}'
    assert.equal msg, "\x1B[41mTest#{reset}"

  it 'should format a yellow background message', ->
    msg = xcolor '{{bg yellow}}Test{{/color}}'
    assert.equal msg, "\x1B[43mTest#{reset}"

  it 'should format a grey background message', ->
    msg = xcolor '{{bg grey}}Test{{/color}}'
    assert.equal msg, "\x1B[100mTest#{reset}"

  afterEach ->
    #console.log msg