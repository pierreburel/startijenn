import gulp from 'gulp';
import {build as config} from '../config';

gulp.task('build:assets', config.assets);

gulp.task('build:views', config.views);

gulp.task('build', ['build:assets', 'build:views']);
