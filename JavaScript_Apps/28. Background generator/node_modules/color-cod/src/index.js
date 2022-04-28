import chalk from 'chalk'

const colorNames = [
  'red',
  'green',
  //'yellow',
  'blue',
  'magenta',
  'cyan',
  //'bgRed',
  //'bgGreen',
  //'bgYellow',
  //'bgBlue',
  //'bgMagenta',
  //'bgCyan',
  //'bgWhite',
]

class ColorCode {

  colorIndex = 0;

  colorMap = {};

  get(name) {
    // Assign color.
    let color = this.colorMap[name]
    if (!color) {
      color = this.colorMap[name] = colorNames[this.colorIndex++ % colorNames.length]
    }
    return chalk[color](name)
  }

  getColor(name) {
    let color = this.colorMap[name]
    if (!color) {
      this.get(name)
    }
    return this.colorMap[name]
  }

}

const singleton = new ColorCode

const main = () => {
  const instance = new ColorCode
  return (name) => instance.get(name)
}

main.ColorCode = ColorCode

module.exports = main
