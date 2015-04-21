var gulp = require('gulp');
var sass = require('gulp-sass');
var react = require('gulp-react');
var ts = require('gulp-typescript');

var paths = {
	target: 'compiled',
    source: {
        typeScript: 'src/*.ts',
        sass: 'stylesheets/*.sass',
    }
};


var typeScriptConfig = ts.createProject({
	typescript: require('typescript'),
	"target": "ES5",
	"module": "commonjs",
	"noImplicitAny": true,
	"removeComments": true,
	"preserveConstEnums": true,
	"sourceMap": true,
	"out": "terminal.js",
});

var sassConfig = {
	indentedSyntax: true,
    errLogToConsole: true
};

gulp.task('default', function() {
    gulp.start('compile-typescript', 'compile-sass', 'compile-react');
});

gulp.task('compile-typescript', function() {
	//TODO add gulp-cache
	gulp.src(paths.source.typeScript).pipe(ts(typeScriptConfig)).pipe(gulp.dest(paths.target));
});

gulp.task('compile-sass', function() {
    gulp.src(paths.source.sass).pipe(sass(sassConfig)).pipe(gulp.dest(paths.target));
});

gulp.task('compile-react', function () {
    return gulp.src('react.js').pipe(react()).pipe(gulp.dest(paths.target));
});