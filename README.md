# gulp-pepino
> A plugin for translating step files to cucumberjs by using Pepino.

## Usage

First, install `gulp-pepino` as a development dependency:

```shell
npm install --save-dev gulp-pepino
```

Then, add it to your `gulpfile.js`:

### Translating step files
```javascript
var pepinoPlugin = require('gulp-pepino');

gulp.task('translating-step-files', function(){
  gulp.src(['./tests/*.step'])
    .pipe(pepino());
});
