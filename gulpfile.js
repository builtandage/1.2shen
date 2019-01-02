var gulp = require('gulp');
var scss = require("gulp-sass");
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
//scss
gulp.task('scss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(clean())
        .pipe(gulp.dest('./src/css/'))
})



//js
gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/'))
})



//watch
gulp.task('watchscss', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('scss'))
})
gulp.task('watchjs', function() {
    gulp.watch('./src/js/*.js', gulp.series('js'))
})


//服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8000,
            livereload: true,
            open: true
        }))
})

//default
gulp.task('default', gulp.series('server', 'scss', 'js', 'watchscss', 'watchjs'));

//build
gulp.task('build', function() {
    gulp.src(['./src/**', '!./src/**/*.scss'])
        .pipe(gulp.dest('./dist/'));
})