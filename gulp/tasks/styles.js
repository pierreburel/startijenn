import gulp from 'gulp';
import changed from 'gulp-changed';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import importer from 'node-sass-magic-importer';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import {styles as config} from '../config';

config.sass.importer = importer(config.importer);

gulp.task('styles', () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass).on('error', notify.onError({title: 'Sass error'})))
    .pipe(postcss([
      autoprefixer(config.autoprefixer)
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
);
