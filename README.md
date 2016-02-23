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

### The MIT License (MIT)

Copyright &copy; 2016 Nick Comer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.