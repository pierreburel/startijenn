import gulp from 'gulp';
import changed from 'gulp-changed';
import notify from 'gulp-notify';
import twig from 'gulp-twig';
import {views as config} from '../config';

// config.twig.extend = function (Twig) {
//   Twig.exports.extendTag({
//     type: 'component',
//     regex: /^component\s+(.+)$/,
//     next: [ ],
//     open: true,
//     compile: function (token) {
//       var expression = token.match[1];
// 
//       token.stack = Twig.expression.compile.apply(this, [{
//         type:  Twig.expression.type.expression,
//         value: expression
//       }]).stack;
// 
//       delete token.match;
//       return token;
//     },
//     parse: function (token, context, chain) {
//       return {
//         chain: false,
//         output: 'Test'
//       };
//     }
//   });  
// };
// 
// config.twig.functions = [{
//   name: 'path',
//   func: function (args) {
//     return "the function";
//   }
// }];
// 
// config.twig.filters = [];

gulp.task('views', config.deps, () => 
  gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(twig(config.twig).on('error', notify.onError({title: 'Twig error'})))
    .pipe(gulp.dest(config.dest))
);
