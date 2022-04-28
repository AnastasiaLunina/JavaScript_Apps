# Service registration

> Can it use the same callbacks mechanism?
 
At present we automatically namespace `app.fire('routes')` under its root folder.

If other modules can call `app.fire('live-routes:routes')`, the listeners of this event must not rely on any other functionality in `live-routes:routes`.

Maybe it should use the `provides` terminology.

```
app.on('live-routes:routes', async () => {
  return koa().get(...)
})
```

```
// app-api/live.js
app.provide('live-routes:routes', async function() {
  return koa().get(...)
})

// live-route-logger/live.js
// TODO: Routes should be cached - unless something has changed?
app.fire('routes', async function(routes) {
  routes.map(route => console.log(route))
})

// live-routes/live.js
const rootApp = koa()
app.fire('routes', async function(routes) {
  routes.map(route => rootApp.use(route)
})
```

But this could also be modelled as a task creating some confusion.

```

// Where routePlugins is dynamically generated, from a loader perhaps?
// But should not know about them.
//
// Also, if there are multiple plugins, should the callback be fired for each, or for all at once. And should they be more like koa middleware...travelling down and back up.
//
// Can this be specified into a `loader` stage? 
//
const routePlugins = ['live-route-logger:routes']
app.task('routes', routePlugins, async function(opts) {
  routes.map(route => console.log(route))
})

// app-api/live.js
app.task('routes', async function(opts) {
  return koa().get(...)
})

// live-route-logger/live.js
// TODO: Routes should be cached - unless something has changed?
app.task('routes', async function(routes) {
  routes.map(route => console.log(route))
})

```

See how Angular does it. They have a nice DI system. Just need to decouple it.StackTrace.generateArtificially

# TODO

- Add cycle checker. Maybe use dependency tree module, as we define all events up front.
