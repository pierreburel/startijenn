import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import {images as config} from '../config';

gulp.task('images', () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(imagemin(config.imagemin))
    .pipe(gulp.dest(config.dest))
);
