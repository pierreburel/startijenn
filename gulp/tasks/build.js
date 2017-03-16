import gulp from 'gulp';
import sequence from 'run-sequence';
import {build as config} from '../config';

gulp.task('build', config.deps, (cb) => sequence.apply(null, config.sequence.concat(cb)));
