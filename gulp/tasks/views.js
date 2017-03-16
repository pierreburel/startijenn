import gulp from 'gulp';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import {views as config} from '../config';

gulp.task('views', config.deps, () => 
  gulp.src(config.src)
    .pipe(pug(config.pug).on('error', notify.onError({title: 'Pug error'})))
    .pipe(gulp.dest(config.dest))
);
