# request-errorlog-middleware

    A request error logger middleware.

## Example

```js
var errorLog = require('request-log');
var logger = new require('winston').Logger();

var app = express();

app.configure('production', function () {
  app.use(errorLog(logger));
});
```

## API

### errorLog(logger, levels)

    Return a request error logger middleware with custom `levels`:

```js
{
    404: logger.warn, // warn if its a 404
    '*': logger.error // error if its anything else
}
```

