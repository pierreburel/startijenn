import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import {scripts as config} from '../config';

gulp.task('scripts', config.deps, (cb) => {
  return gulp.src(config.src)
    .pipe(named())
    .pipe(webpackStream(config.webpack, webpack))
    .pipe(gulp.dest(config.dest));
});
