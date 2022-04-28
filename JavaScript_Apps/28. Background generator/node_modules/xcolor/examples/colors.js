var xcolor = require('../lib/xcolor')


// Simple colors
xcolor.log('{{cyan}}Simple cyan text{{/color}}')
xcolor.log('{{red}}Red{{/red}} {{green}}Green{{/green}} {{blue}}Blue{{//blue}}')
xcolor.log('{{bg red}}{{black}}Black on red text{{/color}}')

// Extended html colors
xcolor.log('{{salmon}}Salmon colored text{{/salmon}}')
xcolor.log('{{snowWhite}}Winter {{mediumSpringGreen}}Spring {{maroon}}Summer {{orange}}Fall')
xcolor.log('{{bg midnightblue}}{{cornsilk}}Cornsilk on midnight blue text{{/color}}')

// Styles
xcolor.log('{{bold}}Bold text{{/bold}}')
xcolor.log('{{underline}}Underlined text{{/underline}}')
xcolor.log('{{inverse}}Inverted text{{/inverse}}')
xcolor.log('{{underline}}{{goldenrod}}Underlined goldenrod text{{/color}}')
xcolor.log('{{inverse}}{{fuchsia}}Inverted fuschia text{{/color}}')

// Hex colors
xcolor.log('{{#32CD32}}Lime green text')
xcolor.log('{{#78D5E3}}Teal text')
xcolor.log('{{bg #6A5ACD}}Slate blue background text')

// Xterm 256 colors
xcolor.log('{{93}}Purple text')
xcolor.log('{{bg 130}}Brown background text')

// Custom styles
xcolor.addStyle({intense: ['bold', 'underline', 'tomato']})
xcolor.log('{{.intense}}Intense bold underlined tomato colored text!{{/color}}')

// Mini syntax templates
xcolor.log('&+gGreen, &+Gbright green &+yand &+Yyellow text')
xcolor.log('&=CWWhite on cyan text')

// Format a string without logging it
msg = xcolor('{{green}}Format me!{{/green}}')

// Printf-style args work
xcolor.log('{{blue}}%d is a blue %s.', 123, 'number')