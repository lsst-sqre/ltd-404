import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import gulpInlineSource from 'gulp-inline-source';
import minimist from 'minimist';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import GulpRunner from 'gulp-run';
import runSequence from 'run-sequence';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

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
    level: 2
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
  let stream = gulp
    .src('styles.scss')
    // Initialize sourcemaps
    .pipe(sourcemaps.init())
    // Compile sass synchronously
    .pipe(sass.sync().on('error', sass.logError))
    // Autoprefix
    .pipe(postcss([autoprefixer()]))
    // Clean CSS
    .pipe(cleanCSS(cleanCssConfig[env]));

  if (env === 'dev') {
    // Write out sourcemaps
    stream.pipe(sourcemaps.write());
  }

  stream.pipe(gulp.dest('.')).pipe(browserSync.stream());
  return stream;
};
gulp.task('sass', sassTask);

/*
 * gulp js
 * Package and babelize the javascript with webpack.
 */
const jsTask = () => {
  return GulpRunner('./node_modules/.bin/webpack').exec();
};
gulp.task('js', jsTask);

/*
 * gulp html
 * Inline assets into the deployable HTML.
 *
 * link and script tags need an 'inline' attribute to be inlined.
 * https://github.com/fmal/gulp-inline-source
 */
export const html = () => {
  return (
    gulp
      .src('404.html')
      // I was getting uglify-js errors, and since webpack is already compressing
      // the content, there's no need for inline-source to compress too.
      .pipe(gulpInlineSource({ compress: false }))
      .pipe(gulp.dest('_build'))
  );
};

/*
 * gulp watch
 * Watch for changes, re-compile the site, and refresh browser-sync.
 *
 * This is only useful for development. For production, use `gulp html`
 * to build the fully-packaged 404 page.
 */
const watchTask = () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: '404.html'
    }
  });

  gulp.watch('styles.scss', ['sass']);
  gulp.watch('404.html').on('change', browserSync.reload);
  gulp.watch('app.bundle.js').on('change', browserSync.reload);
};
gulp.task('watch', watchTask);

/*
 * gulp
 * Default task that compiles site and launches a development server with
 * Browsersync.
 */
gulp.task('default', ['js', 'sass', 'watch']);

/*
 * gulp build
 * Build site for production
 */
gulp.task('build', callback => {
  runSequence('js', 'sass', 'html', callback);
});
