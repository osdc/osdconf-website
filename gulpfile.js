const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

const paths = {
  styles: {
    src: 'app/assets/styles/*.css',
    dest: 'build/styles'
  },
  scripts: {
    src: 'app/assets/scripts/*.js',
    dest: 'build/scripts'
  },
  templates: {
    src: 'app/*.html',
    dest: 'build'
  }
}

gulp.task('serve', () => {
  browserSync.init({
    server: './app'
  });

  gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('minify-css', () => {
  return gulp.src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('copy-html', () => {
  return gulp.src(paths.templates.src)
    .pipe(gulp.dest(paths.templates.dest));
});

gulp.task('default', ['serve']);
