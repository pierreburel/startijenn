import path from 'path';
import gulp from 'gulp';
import changed from 'gulp-changed';
import notify from 'gulp-notify';
import twig from 'gulp-twig';
import {views as config} from '../config';

// Load Fractal components with @handle
import components from '../src/components.json';
config.twig.extend = function(Twig) {
  // Monkey patch Twig.js default fs loader
  const loader = Twig.Templates.loaders.fs;
  Twig.Templates.registerLoader('fs', function(location, params, callback, errorCallback) {
    if (location.startsWith('@')) {
      try {
        params.path = location = path.join(params.base, components[location]);
      } catch (err) {
        throw new Twig.Error('Unable to find component ' + location + ' in components.json');
      }
    }
    return loader.call(this, location, params, callback, errorCallback);
  });
};

// TODO: relative asset path
config.twig.filters = [{
  name: 'path',
  func: function (path) {
    return path;
  }
}];

gulp.task('views', config.deps, () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(twig(config.twig).on('error', notify.onError({title: 'Twig error'})))
    .pipe(gulp.dest(config.dest))
);
