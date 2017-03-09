import gulp from 'gulp';
import config from '../config';

gulp.task('default', config.deps, config.task);
