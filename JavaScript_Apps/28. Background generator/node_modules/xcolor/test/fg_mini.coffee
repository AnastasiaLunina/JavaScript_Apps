assert = require 'assert'
xcolor = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'Basic colors (mini)', ->

  it 'should format a white message', ->
    msg = xcolor '&+wTest&n'
    assert.equal msg, "\x1B[37mTest#{reset}"

  it 'should format a black message', ->
    msg = xcolor '&+lTest&n'
    assert.equal msg, "\x1B[30mTest#{reset}"

  it 'should format a blue message', ->
    msg = xcolor '&+bTest&n'
    assert.equal msg, "\x1B[34mTest#{reset}"

  it 'should format a cyan message', ->
    msg = xcolor '&+cTest&n'
    assert.equal msg, "\x1B[36mTest#{reset}"

  it 'should format a green message', ->
    msg = xcolor '&+gTest&n'
    assert.equal msg, "\x1B[32mTest#{reset}"

  it 'should format a magenta message', ->
    msg = xcolor '&+mTest&n'
    assert.equal msg, "\x1B[35mTest#{reset}"

  it 'should format a red message', ->
    msg = xcolor '&+rTest&n'
    assert.equal msg, "\x1B[31mTest#{reset}"

  it 'should format a yellow message', ->
    msg = xcolor '&+yTest&n'
    assert.equal msg, "\x1B[33mTest#{reset}"

  afterEach ->
    #console.log msg

describe 'Bright colors (mini)', ->

  it 'should format a bright black message', ->
    msg = xcolor '&+LTest&n'
    assert.equal msg, "\x1B[90mTest#{reset}"

  it 'should format a bright red message', ->
    msg = xcolor '&+RTest&n'
    assert.equal msg, "\x1B[91mTest#{reset}"

  it 'should format a bright green message', ->
    msg = xcolor '&+GTest&n'
    assert.equal msg, "\x1B[92mTest#{reset}"

  it 'should format a bright yellow message', ->
    msg = xcolor '&+YTest&n'
    assert.equal msg, "\x1B[93mTest#{reset}"

  it 'should format a bright blue message', ->
    msg = xcolor '&+BTest&n'
    assert.equal msg, "\x1B[94mTest#{reset}"

  it 'should format a bright magenta message', ->
    msg = xcolor '&+MTest&N'
    assert.equal msg, "\x1B[95mTest#{reset}"

  it 'should format a bright cyan message', ->
    msg = xcolor '&+CTest&n'
    assert.equal msg, "\x1B[96mTest#{reset}"

  it 'should format a bright white message', ->
    msg = xcolor '&+WTest&N'
    assert.equal msg, "\x1B[97mTest#{reset}"


  afterEach ->
    #console.log msg
