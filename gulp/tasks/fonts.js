import gulp from 'gulp';
import {fonts as config} from '../config';

gulp.task('fonts', () => {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
