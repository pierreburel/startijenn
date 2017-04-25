import gulp from 'gulp';
import path from 'path';
import fractal from '../fractal';

const logger = fractal.cli.console;

gulp.task('styleguide:start', ['watch:assets'], function () {
  const server = fractal.web.server();
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task('styleguide:build', ['build:assets'], function () {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});

// Aliases
gulp.task('styleguide', ['styleguide:start']);
gulp.task('start:styleguide', ['styleguide:start']);
gulp.task('start:all', ['start', 'styleguide:start']);
gulp.task('build:styleguide', ['styleguide:build']);
gulp.task('build:all', ['build', 'build:styleguide']);
