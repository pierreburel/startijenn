require('babel-register');

const config = require('./config').styleguide;

const fractal = module.exports = require('@frctl/fractal').create();

// Project
fractal.set('project.title', config.title);

// Components
fractal.components.set('path', config.src);
fractal.components.engine('@frctl/twig');
fractal.components.set('ext', '.twig');

// Docs
fractal.docs.set('path', config.docs);

// Web
fractal.web.set('static.path', config.assets);
fractal.web.set('static.mount', 'assets');
fractal.web.set('builder.dest', config.dest);

// Server
if (config.browserSync) {
  fractal.web.set('server.sync', true);
  fractal.web.set('server.syncOptions', config.browserSync);
}

// Theme
const mandelbrot = require('@frctl/mandelbrot');
const theme = mandelbrot(config.theme);
fractal.web.theme(theme);
