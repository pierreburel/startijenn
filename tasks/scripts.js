import gulp from 'gulp';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import include from 'gulp-include';
import babel from 'gulp-babel';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import {scripts as config} from '../config';

gulp.task('scripts', () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(include(config.include).on('error', notify.onError({title: 'Include error'})))
    .pipe(babel(config.babel).on('error', notify.onError({title: 'Babel error'})))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
);
