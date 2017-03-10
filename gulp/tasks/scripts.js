import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import {scripts as config} from '../config';

gulp.task('scripts', config.deps, () => {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream(config.webpack, webpack).on('error', notify.onError({title: 'Webpack error'})))
    .pipe(gulp.dest(config.dest));
});
