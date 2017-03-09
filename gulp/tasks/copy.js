import gulp from 'gulp';
import {copy as config} from '../config';

gulp.task('copy', config.deps, () => {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
