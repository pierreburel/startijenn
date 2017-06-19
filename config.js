import path from 'path';
import pkg from './package.json';

export const paths = {
  src: 'src',
  dest: 'dist'
};

export default {
  tasks: ['server']
};

export const build = {
  assets: ['images', 'fonts', 'sprites', 'styles', 'scripts'],
  views: ['views', 'copy']
};

export const clean = {
  src: path.join(paths.dest, '*'),
  del: {
    dot: true
  }
};

export const copy = {
  src: path.join(paths.src, 'static/**/*.*'),
  dest: paths.dest
};

export const deploy = {
  src: path.join(paths.dest, '**'),
  rsync: {
    root: 'dist/',
    hostname: '', // TODO
    destination: '', // TODO
    archive: true,
    silent: false,
    compress: true,
    incremental: true,
    progress: true,
    emptyDirectories: true,
    clean: true
  }
};

export const fonts = {
  src: path.join(paths.src, 'assets/fonts/**/*.{woff,woff2,ttg,otf}'),
  dest: path.join(paths.dest, 'assets/fonts/')
};

export const images = {
  src: path.join(paths.src, 'assets/images/**/*.{jpg,jpeg,png,gif,svg}'),
  dest: path.join(paths.dest, 'assets/images/'),
  imagemin: {
    
  }
};

export const scripts = {
  src: path.join(paths.src, 'assets/scripts/*.js'),
  dest: path.join(paths.dest, 'assets/scripts/'),
  include: {
    includePaths: ['node_modules', path.join(paths.src, 'assets/scripts')],
  },
  babel: {
    ignore: ['vendor.js', 'jquery.js'],
    presets: [
      ['env', {
        targets: {
          browsers: pkg.browserlist
        }
      }]
    ]
  }
};

export const sprites = {
  src: path.join(paths.src, 'assets/images/sprite/*.svg'),
  dest: path.join(paths.dest, 'assets/images/'),
  svgmin: {
    
  },
  rename: {
    prefix: 'sprite-'
  },
  svgstore: {
    inline: true
  }
};

export const styles = {
  src: path.join(paths.src, 'assets/styles/**/*.scss'),
  dest: path.join(paths.dest, 'assets/styles/'),
  sass: {
    includePaths: ['node_modules', path.join(paths.src, 'assets/styles')],
    outputStyle: 'compressed',
    precision: 10
  },
  importer: {
    disableImportOnce: true
  },
  autoprefixer: {
    browsers: pkg.browserlist
  }
};

export const start = {
  browserSync: {
    files: [
      path.join(paths.dest, '**/*.html'), 
      path.join(paths.dest, 'assets/styles/**/*.css'),
      path.join(paths.dest, 'assets/scripts/**/*.js'),
      path.join(paths.dest, 'assets/images'),
      path.join(paths.dest, 'assets/fonts')
    ],
    injectChanges: true,
    server: 'dist',
    ghostMode: false,
    open: false
  }
};

export const views = {
  src: [path.join(paths.src, '**/*.twig'), '!' + path.join(paths.src, 'partials/**/*.twig')],
  dest: paths.dest,
  twig: {
    base: 'src',
    data: {
      title: pkg.name,
      lang: 'fr'
    }
  }
};

export const watch = {
  assets: {
    fonts: fonts.src,
    images: images.src,
    scripts: scripts.src,
    sprites: sprites.src,
    styles: styles.src
  },
  views: {
    copy: copy.src,
    views: views.src[0]
  }
}
