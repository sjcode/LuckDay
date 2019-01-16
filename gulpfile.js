var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    concat= require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    gulpPugBeautify = require('gulp-pug-beautify'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream,
    autoprefixer = require('gulp-autoprefixer'),
    mainBowerFiles = require('main-bower-files'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    del = require('del'),
    rev = require('gulp-rev'),
    minifyCss = require('gulp-minify-css'),
    revCollector = require('gulp-rev-collector');

gulp.task('clean', function(cb){
    del(['dist'], cb);
});

gulp.task('styles', function(){
  return gulp.src('assets/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    //.pipe(csso())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/styles'));
});

//gulp.task('vendors', function(){
//    return gulp.src(mainBowerFiles({
//        debugging: false
//    }))
//        .pipe(filter(['**/*.js']))
//        .pipe(concat('vendors.js'))
//         .pipe(uglify()).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
//        .pipe(gulp.dest('dist/js'));
//});
//
gulp.task('js', function () {
    return gulp.src('assets/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify()).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/js'));
});

gulp.task('connect', function(){
  connect.server({
      path:'dist',
    livereload: true
  });
});

gulp.task('html', ['styles', 'js'], function() { 
    var source = gulp.src(['dist/js/*.js','dist/styles/*.css'], {read: false});
    gulp.src('assets/**/*.html')
        .pipe(inject(source))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('assets/**/*.html', ['html']);
    gulp.watch('assets/styles/sass/**/*.scss', ['html']);
    gulp.watch('assets/js/**/*.js', ['html']);

});

gulp.task('default', ['watch','connect']);
