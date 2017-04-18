// All dem modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var jsmin = require('gulp-minify');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');



// Compile sass task
gulp.task('autoprefixer', function(){
  return gulp.src('app/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
});

// Compile sass task
gulp.task('compile-sass', function(){
  return gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compile jade task
gulp.task('compile-jade', function(){
  return gulp.src('app/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify JS
// gulp.task('jsmin', function() {
//   gulp.src('app/js/*.js')
//     .pipe(jsmin({
//         ext:{
//             src:'.js',
//             min:'-min.js'
//         },
//         ignoreFiles: ['.combo.js', '*-min.js']
//     }))
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });




// Fire up local server
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});

// On gulp command, fire up server, compile sass and jade, then watch for sass/jade changes
gulp.task('default', ['browserSync', 'compile-sass', 'autoprefixer', 'compile-jade'], function(){
  gulp.watch('app/**/*.sass', ['compile-sass']);
  gulp.watch('app/**/*.css', ['autoprefixer']);
  gulp.watch('app/**/*.jade', ['compile-jade']);
  // gulp.watch('app/**/*.js', ['jsmin']);
});





// Minify images
gulp.task('minify-images', () =>
    gulp.src('dist/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

// Move output files to the dist directory
gulp.task('copyOver',function(){
  gulp.src('./app/**/**.html', {base: './app'})
    .pipe(gulp.dest('./dist'));
  gulp.src('./app/img/**', {base: './app'})
      .pipe(gulp.dest('./dist'));
  gulp.src('./app/css/**.css', {base: './app'})
    .pipe(gulp.dest('./dist'));
  gulp.src('./app/js/**.js', {base: './app'})
    .pipe(gulp.dest('./dist'));
})

// On gulp build command,
gulp.task('build', ['copyOver','minify-images']);
