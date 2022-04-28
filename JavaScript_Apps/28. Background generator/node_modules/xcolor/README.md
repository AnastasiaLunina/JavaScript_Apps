# xcolor

xcolor provides extended color support and string markup for Node.js console applications.

### Features

* Simple mustache-style markup for applying colors
* 256 colors in the terminal
* CSS color names supported
* Hex code conversion
* Graceful degradation for Windows and other non-256 terminals
* Set custom style combinations
* Load custom styles from a file
* Alternate mini-syntax for basic colors
* Log directly to the console or just format a string

## Installation

Install using npm:

    $ npm install xcolor

## Examples

    var xcolor = require('xcolor')

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

    // Printf-style args work
    xcolor.log('{{blue}}%d is a blue %s.', 123, 'number')

    // Format a string without logging it
    msg = xcolor('{{green}}Format me!{{/green}}')

## Markup syntax

Color and style commands are wrapped inside of double curly braces and can be used anywhere inside of a string. Colors are always reset when switching to a new one, but styles must be explicitly reset with a closing tag. All strings are reset at the end of the line automatically. Use `{{/color}}` to clear all styles.

    xcolor.log('This {{blue}}string {{red}}has many {{bold}}colors and{{/bold}} styles{{/color}}!')

## Basic colors

The 8 basic colors along with their bright counterparts are all supported. Prefix the color command with `bg` to change the background instead of the foreground.

`white`,`black`,`blue`,`cyan`,`green`,`magenta`,`red`,`yellow`,`brightBlack`,`brightRed`,`brightGreen`, `brightYellow`,`brightBlue`,`brightMagenta`,`brightCyan`,`brightWhite`

    xcolor.log('{{white}}This is white {{blue}}and this is blue.')
    xcolor.log('This string has {{bg blue}}blue background{{/color}} text.')

## CSS colors

All 147 CSS color names are also supported. When used, these colors will be converted to the closest Xterm-256 matching color. See the [Wikipedia article](http://en.wikipedia.org/wiki/Web_colors) for the complete list of supported color names. Prefix the color command with `bg` to change the background instead of the foreground.

    xcolor.log('{{purple}}This is purple and {{cornflowerBlue}}cornflower blue text.')
    xcolor.log('{{bg fuchsia}}{{whiteSmoke}}This is white smoke text on fuchsia.'')

# Hex colors

Colors can also be specified in hex-code format, which will be converted to the closest Xterm-256 matching color. Prefix the color command with `bg` to change the background instead of the foreground.

     xcolor.log('{{#EA7E5D}}This is burnt sienna text')
     xcolor.log('This string has {{bg #E0B0FF}}mauve background{{/color}} text.')

## Xterm 256

If you already know the exact Xterm-256 color you'd like to use, you can access it directly as well. Prefix the color command with `bg` to change the background instead of the foreground.

    xcolor.log('{{172}}This is orange text')
    xcolor.log('{{bg 172}}{{255}}This is white text on an orange background')

## Degradation

When used under Windows or on any other terminal that does not identify itself as `xterm-256color`, all extended colors will automatically degrade to the closest basic colors.

## Text styles

`Bold`, `underline` and `inverse` text are all supported and can be used in any combination with other styles and color. To clear a style, prefix the name with a forward slash.

    xcolor.log('This is {{bold}}bold{{//bold}} and now {{underline}}underlined{{/underline}} text')
    xcolor.log('{{inverse}}{{goldenrod}}This is inverted goldenrod text')

## Custom styles

Mix and match styles, foreground colors and background colors to create custom styles. This is also helpful for defining a palette for your application that can easily be changed in one place.

Custom styles are defined via an object hash that contains the name of the style as the key with either a single valid keyword or an array of them as the value. Any of the color code types used in the examples above can be used to create a custom style. They can then be accessed in your string templates by prefacing the name of the style with a `.`.

     xcolor.addStyle({emphasis: ['bold', 'crimson', 'underline']})
     xcolor.log('{{.emphasis}}This is emphatic bold, crimson and underlined text.')

## Custom style files

Custom styles can be stored in a JSON file and loaded when needed. The JSON file should follow the same syntax as above, and can support as many unique custom styles per file as desired.

##### Example file:

    {
      "color1" : ["bold", "olive"],
      "color2" : ["underline", "seaGreen"]
      "color3" : ["#EA7E5D"]
    }

##### Usage:

    xcolor.loadStyles('/path/to/styles.json')
    xcolor.log('{{.color1}}Bold olive {{.color2}}underlined sea green {{.color3}} burnt sienna!')

## Mini syntax

The mini color change syntax can come in handy when horizontal space is at a premium and several color changes within a string are required. Inspired by the ansi markup syntax used on [MUDs](http://en.wikipedia.org/wiki/MUD).

The mini codes have the following syntax:

* `&+`  - Sets the foreground. Lower case letters are normal, upper case are bright.
* `&=`  - Sets the background and foreground.
* `&n`  - Resets all colors.

Only the basic colors and their bright variants are available with this syntax;

* `w`: white
* `l`: black
* `r`: red
* `g`: green
* `b`: blue
* `m`: magenta
* `c`: cyan
* `y`: yellow

##### Example:

    xcolor.log('This is &+rred, &+Gbright green &+band blue.')
    xcolor.log('&=rwThis ia white text on an orange background')

## Running the tests

To run the test suite, invoke the following commands in the repository:

    $ npm install
    $ npm test

## License

(The MIT License)

Copyright (c) 2013 Charles Moncrief <<cmoncrief@gmail.com>>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.





