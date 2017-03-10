import gulp from 'gulp';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import {styles as config} from '../config';

gulp.task('styles', () => {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass).on('error', notify.onError({title: 'Sass error'})))
    .pipe(postcss([
      autoprefixer(config.autoprefixer)
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
});
