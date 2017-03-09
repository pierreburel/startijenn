import gulp from 'gulp';
import runSequence from 'run-sequence';
import {build as config} from '../config';

gulp.task('build', config.deps, (cb) => runSequence.apply(null, config.sequence.concat(cb)));
