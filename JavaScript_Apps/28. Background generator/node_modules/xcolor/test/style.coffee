assert  = require 'assert'
xcolor  = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'Styles', ->

  it 'should format a bold message', ->
    msg = xcolor '{{bold}}Test{{/bold}}'
    assert.equal msg, "\x1B[1mTest\x1B[22m#{reset}"

  it 'should format an italic message', ->
    msg = xcolor '{{italic}}Test{{/italic}}'
    assert.equal msg, "\x1B[3mTest\x1B[23m#{reset}"

  it 'should format an underlined message', ->
    msg = xcolor '{{underline}}Test{{/underline}}'
    assert.equal msg, "\x1B[4mTest\x1B[24m#{reset}"

  it 'should format an inverse message', ->
    msg = xcolor '{{inverse}}Test{{/inverse}}'
    assert.equal msg, "\x1B[7mTest\x1B[27m#{reset}"

  afterEach ->
    #console.log msg