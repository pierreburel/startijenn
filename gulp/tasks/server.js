import gulp from 'gulp';
import browserSync from 'browser-sync';
import {server as config} from '../config.js';

gulp.task('server', config.deps, () => {
  for (let task in config.watch) {
    gulp.watch(config.watch[task], [task]);
  };
  
  let bs = browserSync.create();
  bs.init(config.browserSync);
});
