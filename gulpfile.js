const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');

const paths = {
  styles: {
    src: 'app/assets/styles/*.css',
    dest: 'build/assets/styles'
  },
  scripts: {
    src: 'app/assets/scripts/*.js',
    dest: 'build/assets/scripts'
  },
  templates: {
    src: 'app/*.html',
    dest: 'build'
  }
};

gulp.task('clean', () => {
  del(['build']);
});

gulp.task('serve', ['copy-html', 'minify-css', 'uglify-js'], () => {
  browserSync.init({
    server: './build'
  });

  gulp.watch(paths.styles.src, ['minify-css']);
  gulp.watch(paths.scripts.src, ['uglify-js']);
  gulp
    .watch(paths.templates.src, ['copy-html'])
    .on('change', browserSync.reload);
});

gulp.task('minify-css', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('uglify-js', () => {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});

gulp.task('copy-html', () => {
  return gulp.src(paths.templates.src).pipe(gulp.dest(paths.templates.dest));
});

gulp.task('default', ['serve']);
