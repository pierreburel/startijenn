import gulp from 'gulp';
import browserSync from 'browser-sync';
import {server as config} from '../config.js';

gulp.task('server', config.deps, () => {
  config.watch.forEach((watch) => {
    let tasks = [].concat(watch.task, watch.tasks).filter(n => n);
    gulp.watch(watch.src, tasks);
  });
  
  let bs = browserSync.create();
  bs.init(config.browserSync);
});
