assert  = require 'assert'
xcolor  = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'Xterm 256 foreground colors', ->

  it 'should format a red string', ->
    msg = xcolor '{{1}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;1mTest#{reset}"

  it 'should format a teal string', ->
    msg = xcolor '{{42}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;42mTest#{reset}"

  it 'should format a blue string', ->
    msg = xcolor '{{21}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;21mTest#{reset}"

  it 'should format a puce string', ->
    msg = xcolor '{{101}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;101mTest#{reset}"

  it 'should format a dull yellow string', ->
    msg = xcolor '{{142}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;142mTest#{reset}"

  it 'should format a dark grey string', ->
    msg = xcolor '{{242}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;242mTest#{reset}"

  afterEach ->
    #console.log msg

describe 'Xterm 256 background colors', ->

  it 'should format a red background string', ->
    msg = xcolor '{{bg 1}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;1mTest#{reset}"

  it 'should format a teal background string', ->
    msg = xcolor '{{bg 42}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;42mTest#{reset}"

  it 'should format a blue background string', ->
    msg = xcolor '{{bg 21}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;21mTest#{reset}"

  it 'should format a puce background string', ->
    msg = xcolor '{{bg 101}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;101mTest#{reset}"

  it 'should format a dull yellow background string', ->
    msg = xcolor '{{bg 142}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;142mTest#{reset}"

  it 'should format a dark grey background string', ->
    msg = xcolor '{{bg 242}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;242mTest#{reset}"

  afterEach ->
    #console.log msg