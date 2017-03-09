import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import {images as config} from '../config';

gulp.task('images', config.deps, () => {
  return gulp.src(config.src)
    .pipe(imagemin(config.imagemin))
    .pipe(gulp.dest(config.dest));
});
