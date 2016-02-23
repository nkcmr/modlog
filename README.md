### modlog
a sane module specific logging solution

```javascript
'use strict'
var log = require('modlog')('database')

log.info('db is doing good. just fyi.')
// [21:28:30][database] db is doing good. just fyi.
```

logs are only useful when you actually know who is saying what. it is easy to get your application to a point where logs are pouring in your console. this can help with all the noise and give seperate parts of your app there own name in your logs.

### api
the module consists of a single function that initializes a logger.

#### modlog_factory(module\_name[, options])
the first argument is the modules name and the second argument is an object that only has one property.

```javascript
{
	logger: console
}
```

you can set the internal logging mechanism to something else with `logger`, like [winston](https://www.npmjs.com/package/winston) or something. it defaults to the global `console` object.