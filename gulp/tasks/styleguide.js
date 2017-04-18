import gulp from 'gulp';
import path from 'path';
import {styleguide as config} from '../config';

const fractal = require('@frctl/fractal').create();
// const consolidate = require('@frctl/consolidate');
// const twig = require('twig');
// const twigAdapter = consolidate('twig', twig);

// Project
fractal.set('project.title', config.project.title);

// Components
fractal.components.set('path', config.components.path);
fractal.components.engine('@frctl/twig');
fractal.components.set('ext', '.twig');

// Docs
fractal.docs.set('path', config.docs.path);

// Web
fractal.web.set('static.path', config.web.static.path);
fractal.web.set('static.mount', config.web.static.mount);
fractal.web.set('builder.dest', config.web.builder.dest);

// Theme
const mandelbrot = require('@frctl/mandelbrot');
const theme = mandelbrot(config.web.theme);
fractal.web.theme(theme);

// Logs
const logger = fractal.cli.console;

gulp.task('styleguide:server', function(){
  const server = fractal.web.server(config.web.server);
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task('styleguide:build', function(){
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});
