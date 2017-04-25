import gulp from 'gulp';
import browserSync from 'browser-sync';
import {start as config} from '../config';

gulp.task('start', ['watch'], () => {
  let bs = browserSync.create();
  bs.init(config.browserSync);
});

// Alias
gulp.task('server', ['start']);
