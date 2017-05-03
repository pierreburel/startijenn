import pkg from './package.json';

export default {
  tasks: ['server']
};

export const build = {
  assets: ['images', 'fonts', 'sprites', 'styles', 'scripts'],
  views: ['views', 'copy']
};

export const clean = {
  src: './dist/*',
  del: {
    dot: true
  }
};

export const copy = {
  src: './src/static/**/*.*',
  dest: './dist/'
};

export const fonts = {
  src: './src/assets/fonts/**/*.{woff,woff2,ttg,otf}',
  dest: './dist/assets/fonts/'
};

export const images = {
  src: './src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
  dest: './dist/assets/images/',
  imagemin: {
    
  }
};

export const scripts = {
  src: './src/assets/scripts/*.js',
  dest: './dist/assets/scripts/',
  include: {
    includePaths: ['./node_modules', './src/assets/scripts', './src'],
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
  src: './src/assets/images/sprite/*.svg',
  dest: './dist/assets/images/',
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
  src: './src/assets/styles/**/*.scss',
  dest: './dist/assets/styles/',
  sass: {
    includePaths: ['./node_modules', './src/assets/styles', './src'],
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

export const styleguide = {
  title: `${pkg.name} : Styleguide`,
  docs: './src/docs',
  src: './src/components',
  assets: './dist/assets',
  dest: './dist/styleguide',
  browserSync: {
    open: false
  },
  theme: {
    skin: 'navy',
    format: 'yaml',
    nav: ['components', 'docs'],
    panels: ['html', 'twig', 'view', 'context', 'resources', 'info', 'notes'],
    lang: 'en',
    static: {
      mount: 'theme'
    }
  }
};

export const start = {
  browserSync: {
    files: [
      './dist/**/*.html', 
      './dist/assets/styles/**/*.css', 
      './dist/assets/scripts/**/*.js', 
      './dist/assets/images', 
      './dist/assets/fonts'
    ],
    injectChanges: true,
    server: './dist',
    ghostMode: false,
    open: false
  }
};

export const views = {
  src: ['./src/**/*.twig', '!./src/components/**/*.twig', '!./src/partials/**/*.twig'],
  dest: './dist',
  twig: {
    base: './src',
    data: {
      title: pkg.name,
      lang: 'fr'
    }
  }
};

export const watch = {
  assets: {
    fonts: './src/assets/fonts/**/*.{woff,woff2,ttg,otf}',
    images: './src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
    scripts: ['./src/assets/scripts/**/*.js', './src/components/**/*.js'],
    sprites: './src/assets/images/**/*.svg',
    styles: ['./src/assets/styles/**/*.scss', './src/components/**/*.scss']
  },
  views: {
    copy: './src/static/**/*.*',
    views: './src/**/*.twig'
  }
}
