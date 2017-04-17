'use strict';

const Adapter = require('@frctl/fractal').Adapter;

class PugAdapter extends Adapter {
  constructor(engine, source, app) {
    super(engine, source);
    this._app = app;
  }
  
  render(path, str, context, meta) {
    context['_self'] = meta.self;
    context['_target'] = meta.target;
    context['_env'] = meta.env;
    context['_config'] = this._app.config();
    context['path'] = (path) => {
      // TODO
      return path;
    };
    let views = {};
    this.views.forEach(view => (views[view.handle] = view.content));
    return Promise.resolve(this.engine.render(str, context, views));
  }
}

module.exports = function() {
  return {
    register(source, app) {
      const adapter = new PugAdapter(require('pug'), source, app);
      return adapter;
    }
  }
};
