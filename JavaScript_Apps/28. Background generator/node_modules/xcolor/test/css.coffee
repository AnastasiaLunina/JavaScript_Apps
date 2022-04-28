assert = require 'assert'
xcolor = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'CSS color foregrounds', ->

  it 'should format a goldenrod message', ->
    msg = xcolor '{{goldenrod}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;179mTest#{reset}"

  it 'should format a fuchsia message', ->
    msg = xcolor '{{fuchsia}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;201mTest#{reset}"

  it 'should format a firebrick message', ->
    msg = xcolor '{{firebrick}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;131mTest#{reset}"

  it 'should format a greenyellow message', ->
    msg = xcolor '{{greenyellow}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;155mTest#{reset}"

  it 'should format a indigo message', ->
    msg = xcolor '{{indigo}}Test{{/color}}'
    assert.equal msg, "\x1B[38;5;55mTest#{reset}"

describe 'CSS color background', ->

  it 'should format a goldenrod background message', ->
    msg = xcolor '{{bg goldenrod}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;179mTest#{reset}"

  it 'should format a fuchsia background message', ->
    msg = xcolor '{{bg fuchsia}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;201mTest#{reset}"

  it 'should format a firebrick background message', ->
    msg = xcolor '{{bg firebrick}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;131mTest#{reset}"

  it 'should format a greenyellow background message', ->
    msg = xcolor '{{bg greenyellow}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;155mTest#{reset}"

  it 'should format a indigo background message', ->
    msg = xcolor '{{bg indigo}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;55mTest#{reset}"

  afterEach ->
    #console.log msg