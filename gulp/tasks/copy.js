import gulp from 'gulp';
import changed from 'gulp-changed';
import {copy as config} from '../config';

gulp.task('copy', config.deps, () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(gulp.dest(config.dest))
);
