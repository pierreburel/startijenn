import gulp from 'gulp';
import {watch as config} from '../config';

gulp.task('watch:assets', ['build:assets'], function () {
  for (let task in config.assets) {
    gulp.watch(config.assets[task], [task]);
  };
});

gulp.task('watch:views', ['build:views'], function () {
  for (let task in config.views) {
    gulp.watch(config.views[task], [task]);
  };
});

gulp.task('watch', ['watch:assets', 'watch:views']);
