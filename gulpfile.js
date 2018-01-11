const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

gulp.task('serve', () => {
  browserSync.init({
    server: './app'
  });

  gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('minify-css', () => {
  return gulp.src('app/assets/styles/*.css')
    .pipe(cleanCSS({
      debug: true
    }, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve']);
