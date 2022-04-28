assert  = require 'assert'
path    = require 'path'
xcolor  = require '../lib/xcolor'
{reset} = require '../lib/codes'

msg = ""

describe 'Custom styles', ->

  it 'should allow adding custom styles', ->
    assert xcolor.addStyle({boldFuchsia: ['bold', 'fuchsia']})
    assert xcolor.addStyle({goldenThistle: ['bg thistle', 'goldenrod']})
    assert xcolor.addStyle({underSalmon: ['underline', 'salmon']})

  it 'should load custom styles from a file', ->
    xcolor.loadStyles path.join(__dirname, "styles.json")
    msg = xcolor '{{.fileStyle}}Test{{/color}}'
    assert.equal msg, "\x1B[1m\x1B[38;5;142mTest#{reset}"

  it 'should print a bold fuchsia message from the custom style', ->
    msg = xcolor '{{.boldFuchsia}}Test{{/color}}'
    assert.equal msg, "\x1B[1m\x1B[38;5;201mTest#{reset}"

  it 'should print a slate/goldenrod message from the custom style', ->
    msg = xcolor '{{.goldenThistle}}Test{{/color}}'
    assert.equal msg, "\x1B[48;5;188m\x1B[38;5;179mTest#{reset}"

  it 'should print an underlined salmon message from the custom style', ->
    msg = xcolor '{{.underSalmon}}Test{{/color}}'
    assert.equal msg, "\x1B[4m\x1B[38;5;216mTest#{reset}"

  afterEach ->
    #console.log msg

describe 'Custom files', ->

  it 'should load custom styles from a file', ->
    xcolor.loadStyles(path.join(__dirname, "styles.json"))
    msg = xcolor '{{.fileStyle}}Test{{/color}}'
    assert.equal msg, "\x1B[1m\x1B[38;5;142mTest#{reset}"
    
  it 'should return an error if the file does not exist', ->
    val = xcolor.loadStyles 'thisdoesnotexist.json'
    assert.equal val.code, 'ENOENT'
