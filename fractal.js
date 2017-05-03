require('babel-register');

const fs = require('fs');
const path = require('path');
const config = require('./config').styleguide;
const fractal = module.exports = require('@frctl/fractal').create();

// Project
fractal.set('project.title', config.title);

// Components
fractal.components.set('path', config.src);
fractal.components.engine('@frctl/twig');
fractal.components.set('ext', '.twig');
// TODO: better separation of collated components
fractal.components.set('default.collator', function(markup, item) {
    return `<!-- Start: @${item.handle} -->\n${markup}\n<!-- End: @${item.handle} -->\n`
});

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
theme.addLoadPath('./src/fractal');
fractal.web.theme(theme);

// Export components list as JSON
function exportComponents() {
  const components = {};
  for (let component of fractal.components.filter('isHidden', false).flattenDeep()) {
    components[`@${component.alias || component.handle}`] = path.relative('./src', component.viewPath);
  }
  fs.writeFileSync('src/components.json', JSON.stringify(components, null, 2), 'utf8');
}

fractal.components.on('updated', function(){
  exportComponents();
});

fractal.cli.command('export', function(opts, done){
  exportComponents();
  done();
}, {
  description: 'Export components list as JSON'
});
