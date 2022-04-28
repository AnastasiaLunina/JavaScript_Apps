# outlet

> Run an ordered series of functions before and after execution of a function.
  
## Install

```
npm i -S outlet
```

## Usage

```js
const container = {}
const outlet = new Outlet(container)
outlet.before('foo', async () => {})
outlet.after('foo', async () => {})
outlet.run('foo', async () => {})
```

## Benchmark

```bash
gulp lib:compile && node lib/__bench__/index.js
```

## License

[MIT](http://vjpr.mit-license.org)
