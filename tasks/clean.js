import gulp from 'gulp';
import del from 'del';
import {clean as config} from '../config';

gulp.task('clean', () => del(config.src, config.del));
