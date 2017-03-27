import gulp from 'gulp';
import notify from 'gulp-notify';
import nunjucks from 'gulp-nunjucks';
import {views as config} from '../config';

gulp.task('views', config.deps, () => 
  gulp.src(config.src)
    .pipe(nunjucks.compile(config.data, config.nunjucks).on('error', notify.onError({title: 'Nunjucks error'})))
    .pipe(gulp.dest(config.dest))
);
