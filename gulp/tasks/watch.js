import gulp from 'gulp';
import {watch as config} from '../config.js';

gulp.task('watch', config.deps, () => {
  config.watchers.forEach((watcher) => {
    let tasks = [].concat(watcher.task, watcher.tasks).filter(n => n);
    gulp.watch(watcher.src, tasks);
  });
});
