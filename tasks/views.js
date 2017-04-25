import gulp from 'gulp';
import changed from 'gulp-changed';
import notify from 'gulp-notify';
import twig from 'gulp-twig';
import {views as config} from '../config';

gulp.task('views', config.deps, () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(twig(config.twig).on('error', notify.onError({title: 'Twig error'})))
    .pipe(gulp.dest(config.dest))
);
