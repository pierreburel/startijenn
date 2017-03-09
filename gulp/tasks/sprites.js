import gulp from 'gulp';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import {sprites as config} from '../config';

gulp.task('sprites', () => {
  return gulp.src(config.src)
    .pipe(svgmin(config.svgmin))
    .pipe(rename(config.rename))
    .pipe(svgstore(config.svgstore))
    .pipe(gulp.dest(config.dest));
});
