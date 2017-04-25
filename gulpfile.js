require('babel-register');

const requireDir = require('require-dir');

requireDir('tasks', { recurse: false });
