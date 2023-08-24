//this gulp file is only for developpement part

var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass'))
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    concat = require('gulp-concat');
    minify = require('gulp-minify');
    sync = require('browser-sync').create();
    cleanCSS = require('gulp-clean-css');
    replace = require('gulp-replace');
    del = require('del');
    browserSync = require('browser-sync').create();

const options = require("./package.json").options;

// fetch command line arguments
const arg = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {

            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;

        }
        else {

            // argument name
            curOpt = opt;
            arg[curOpt] = true;

        }

    }

    return arg;

})(process.argv);


// Compile SCSS files and minify CSS files
gulp.task('sass', () => {

    return (gulp.src('assets/css/sass/base.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'))
        .pipe(sync.stream()));

});

// Compile all JS files and minify it in 1 JS file
gulp.task('compress', () => {
    return gulp.src(
        [
            'assets/js/jquery-3.7.0.min.js',
            'assets/js/gsap/minified/ScrollTrigger.min.js',
            'assets/js/gsap/minified/gsap.min.js',
            'assets/js/index.js',
        ]
    )
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js/main-js/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/js/main-js/'));
});


//Watch any changes on scss, HTML or JS file ans make a reload of browser
gulp.task('watch', function(){
    browserSync.init({
        proxy: "http://localhost/" + options.links_front.dev,
        port: options.port + 1
    });

    gulp.watch('assets/css/sass/components/*.scss', gulp.series('sass'));

    gulp.watch(['*.html','partials/*.html', 'assets/js/*.js', 'assets/css/*.css', 'assets/css/sass/*.scss', 'assets/css/sass/components/*.scss']).on('change', browserSync.reload);

    gulp.watch(['assets/js/*.js'], gulp.series('compress'));

    gulp.watch(['assets/js/*.js', 'assets/js/**/*.js']).on('change', browserSync.reload);

});


gulp.task('default', gulp.series('sass','compress','watch'));


