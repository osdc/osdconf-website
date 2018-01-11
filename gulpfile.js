const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('serve', () => {
  browserSync.init({
    server: './app'
  });

  gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
