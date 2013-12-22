# request-error-log-middleware

  Log an [express](https://github.com/visionmedia/express) request if the response has a bad status code.


## Example

```js
var errorLog = require('request-error-log-middleware');
var logger = new require('winston').Logger();

var app = express();

app.configure('production', function () {
  app.use(errorLog(logger));
});
```

## API

### errorLog(logger, statuses)

  Return a request error logger middleware with custom `statuses`:

```js
{
    404: logger.warn, // warn if its a 404
    '*': logger.error // error if its anything else
}
```

## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```