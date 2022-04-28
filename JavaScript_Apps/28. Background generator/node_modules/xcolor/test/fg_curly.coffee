assert = require 'assert'
xcolor = require '../lib/xcolor'
{reset} = require '../lib/codes'

resetAll = "\x1b[39m#{reset}"

msg = ""

describe 'Basic foreground colors (curly)', ->

  it 'should format a white message', ->
    msg = xcolor '{{white}}Test{{/white}}'
    assert.equal msg, "\x1B[37mTest#{resetAll}"

  it 'should format a black message', ->
    msg = xcolor '{{black}}Test{{/black}}'
    assert.equal msg, "\x1B[30mTest#{resetAll}"

  it 'should format a blue message', ->
    msg = xcolor '{{blue}}Test{{/blue}}'
    assert.equal msg, "\x1B[34mTest#{resetAll}"

  it 'should format a cyan message', ->
    msg = xcolor '{{cyan}}Test{{/cyan}}'
    assert.equal msg, "\x1B[36mTest#{resetAll}"

  it 'should format a green message', ->
    msg = xcolor '{{green}}Test{{/green}}'
    assert.equal msg, "\x1B[32mTest#{resetAll}"

  it 'should format a magenta message', ->
    msg = xcolor '{{magenta}}Test{{/magenta}}'
    assert.equal msg, "\x1B[35mTest#{resetAll}"

  it 'should format a red message', ->
    msg = xcolor '{{red}}Test{{/red}}'
    assert.equal msg, "\x1B[31mTest#{resetAll}"

  it 'should format a yellow message', ->
    msg = xcolor '{{yellow}}Test{{/yellow}}'
    assert.equal msg, "\x1B[33mTest#{resetAll}"

  it 'should format a grey message', ->
    msg = xcolor '{{grey}}Test{{/grey}}'
    assert.equal msg, "\x1B[90mTest#{resetAll}"

  afterEach ->
    #console.log msg

describe 'Bright colors (curly)', ->

  it 'should format a bright black message', ->
    msg = xcolor '{{brightBlack}}Test{{/brightBlack}}'
    assert.equal msg, "\x1B[90mTest#{resetAll}"

  it 'should format a bright red message', ->
    msg = xcolor '{{brightRed}}Test{{/brightRed}}'
    assert.equal msg, "\x1B[91mTest#{resetAll}"

  it 'should format a bright green message', ->
    msg = xcolor '{{brightGreen}}Test{{/brightGreen}}'
    assert.equal msg, "\x1B[92mTest#{resetAll}"

  it 'should format a bright yellow message', ->
    msg = xcolor '{{brightYellow}}Test{{/brightYellow}}'
    assert.equal msg, "\x1B[93mTest#{resetAll}"

  it 'should format a bright blue message', ->
    msg = xcolor '{{brightBlue}}Test{{/brightBlue}}'
    assert.equal msg, "\x1B[94mTest#{resetAll}"

  it 'should format a bright magenta message', ->
    msg = xcolor '{{brightMagenta}}Test{{/brightMagenta}}'
    assert.equal msg, "\x1B[95mTest#{resetAll}"

  it 'should format a bright cyan message', ->
    msg = xcolor '{{brightCyan}}Test{{/brightCyan}}'
    assert.equal msg, "\x1B[96mTest#{resetAll}"

  it 'should format a bright white message', ->
    msg = xcolor '{{brightWhite}}Test{{/brightWhite}}'
    assert.equal msg, "\x1B[97mTest#{resetAll}"


  afterEach ->
    #console.log msg
