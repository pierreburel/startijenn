import gulp from 'gulp';
import changed from 'gulp-changed';
import {fonts as config} from '../config';

gulp.task('fonts', () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(gulp.dest(config.dest))
);
