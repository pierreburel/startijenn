import gulp from 'gulp';
import rsync from 'gulp-rsync';
import {deploy as config} from '../config';

gulp.task('deploy', () => 
  gulp.src(config.src)
    .pipe(rsync(config.rsync))
);
