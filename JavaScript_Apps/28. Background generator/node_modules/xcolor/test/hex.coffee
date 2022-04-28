assert  = require 'assert'
xcolor  = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'Hex colors', ->

  it 'should format a brown message', ->
    msg = xcolor '{{#603311}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;94mTest#{reset}"

  it 'should format an orange background message', ->
    msg = xcolor '{{bg #FF7722}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;209mTest#{reset}"

  it 'should print background and foreground hex colors', ->
    msg = xcolor '{{bg #ffffff}}{{#8E2323}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;231m\x1B[38;5;131mTest#{reset}"

  afterEach ->
    #console.log msg