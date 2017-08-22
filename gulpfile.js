var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css');

var paths = {
  src: 'src/',
  npm: 'node_modules/',
  dist: 'dist/',
  demo: 'demo/',
  assets: 'assets/'
};

var modules = {
  http: paths.src + 'http/http',
  loader: paths.src + 'loader/loader',
  modals: paths.src + 'modals/modals',
  props: paths.src + 'props/props'
};

gulp.task('imports',
  function () {
    gulp.src(paths.npm + 'angular/angular.min.js')
      .pipe(gulp.dest(paths.assets + 'lib/angular'));

    gulp.src(paths.npm + 'angular/angular-csp.css')
      .pipe(cleanCSS())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(paths.assets + 'lib/angular'));

    gulp.src(paths.npm + 'angular-ui-bootstrap/dist/*tpls.js')
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(paths.assets + 'lib/angular-ui-bootstrap'));

    gulp.src(paths.npm + 'angular-ui-bootstrap/dist/*.css')
      .pipe(cleanCSS())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(paths.assets + 'lib/angular-ui-bootstrap'));

    gulp.src(paths.npm + 'requirejs/require.js')
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(paths.assets + 'lib/requirejs'));

    gulp.src(paths.npm + 'jquery/dist/jquery.min.js')
      .pipe(gulp.dest(paths.assets + 'lib/jquery'));

    gulp.src([
        paths.npm + 'bootstrap/dist/*/bootstrap.min.css',
        '!' + paths.npm + 'bootstrap/dist/*/*.min.css.map',
        paths.npm + 'bootstrap/dist/*/*.eot',
        paths.npm + 'bootstrap/dist/*/*.woff',
        paths.npm + 'bootstrap/dist/*/*.woff2',
        paths.npm + 'bootstrap/dist/*/*.ttf'
      ])
      .pipe(gulp.dest(paths.assets + 'lib/bootstrap'));

    gulp.src([
        paths.npm + 'font-awesome/*/*.min.css',
        paths.npm + 'font-awesome/*/*.eot',
        paths.npm + 'font-awesome/*/*.ttf',
        paths.npm + 'font-awesome/*/*.woff',
        paths.npm + 'font-awesome/*/*.woff2'
      ])
      .pipe(gulp.dest(paths.assets + 'lib/font-awesome'));

    gulp.src([paths.npm + 'angular-translate/dist/*.min.js', paths.npm + 'angular-translate*/*.min.js'])
      .pipe(rename({
        dirname: ''
      }))
      .pipe(gulp.dest(paths.assets + 'lib/angular-translate'));
  }
);

gulp.task('demos',
  function () {
    gulp.run('imports');

    Object.keys(modules).forEach((module) => {
      gulp.src(modules[module] + '.js')
        .pipe(rename(resolveRename('nggs-', '.js')))
        .pipe(gulp.dest(paths.demo));
    });

    gulp.src(modules.http)
      .pipe(rename({
        dirname: '',
        prefix: 'nggs-',
        extname: '.js'
      }))
      .pipe(gulp.dest(paths.demo + 'loader'));

    gulp.src(modules.loader + '.css')
      .pipe(rename(resolveRename('nggs-', '.css')))
      .pipe(gulp.dest(paths.demo));
  }
);

gulp.task('dist',
  function () {

    Object.keys(modules).forEach((module) => {
      gulp.src(modules[module] + '.js')
        .pipe(rename(resolveRename('nggs-', '.js')))
        .pipe(gulp.dest(paths.dist));

      gulp.src(modules[module] + '.js')
        .pipe(uglify())
        .pipe(rename(resolveRename('nggs-', '.min.js')))
        .pipe(gulp.dest(paths.dist));
    });


    // CSS
    gulp.src(modules.loader + '.css')
      .pipe(rename(resolveRename('nggs-', '.css')))
      .pipe(gulp.dest(paths.dist));

    gulp.src(modules.loader + '.css')
      .pipe(cleanCSS())
      .pipe(rename(resolveRename('nggs-', '.min.css')))
      .pipe(gulp.dest(paths.dist));
  }
);

function resolveRename(prefix, extname) {
  return function (path) {
    path.dirname = path.basename;
    path.basename = prefix + path.basename;
    path.extname = extname;
  }
}