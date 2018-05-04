import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import gulpInlineSource from 'gulp-inline-source';
import minimist from 'minimist';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

// parse command line options
// [--env dev (default) | prod]
const options = minimist(process.argv);
const env = options.env || 'dev';

// Environment-based configurations for CleanCss
// https://github.com/jakubpawlowicz/clean-css
const cleanCssConfig = {
  dev: {
    compatibility: '*',
    level: 2,
    format: 'beautify'
  },

  prod: {
    compatibility: '*',
    level: 2,
  }
};

/*
 * gulp environment
 * Prints the environment setting.
 */
export const environment = () => console.log(`${env}`);

/*
 * gulp sass
 * Compile the sass
 */
const sassTask = () => {
  let stream = gulp.src('styles.scss')
    // Initialize sourcemaps
    .pipe(sourcemaps.init())
    // Compile sass synchronously
    .pipe(sass.sync().on('error', sass.logError))
    // Clean CSS
    .pipe(cleanCSS(cleanCssConfig[env]));

  if (env === 'dev') {
    // Write out sourcemaps
    stream.pipe(sourcemaps.write());
  }

  stream.pipe(gulp.dest('.'));
  return stream;

};
gulp.task('sass', sassTask);

/*
 * gulp html
 * Inline assets into the deployable HTML.
 *
 * link and script tags need an 'inline' attribute to be inlined.
 * https://github.com/fmal/gulp-inline-source
 */
export const html = () => {
  return gulp.src('404.html')
    .pipe(gulpInlineSource())
    .pipe(gulp.dest('_build'));
};

/*
 * gulp
 * Default task.
 */
export default environment;
