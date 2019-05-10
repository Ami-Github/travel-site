var gulp = require('gulp'),  // MAIN
watch = require ('gulp-watch'),
browserSync = require('browser-sync').create(); 


// watch changes in files
gulp.task('watch', function() {

  // Open browser on gulp watch command
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  // watch index.html and automatically refresh browser - REFRESH
  watch('./app/index.html', function() {
    browserSync.reload();
  });

  // watch .css files in styles folder and automatically inject css - INJECT
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });
});


// first call task 'styles' and after 'styles' task is complete run browserSync to inject css to browser
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
