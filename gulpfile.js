/**
 * Created by cry on 2016/12/25.
 */
var path = require('path');

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var express = require('gulp-express');

var sass = require('gulp-sass');

var gulpPlumber = require('gulp-plumber');
var gulpWatch = require('gulp-watch');

var webpackConfig = {
    output: {
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_nodules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

gulp.task('style', function () {
    gulp.src('./style/index.scss')
        .pipe(gulpPlumber())
        .pipe(sass())
        .pipe(gulp.dest('./www/dest'))
});

gulp.task('script', function () {
    return gulp.src('./script/template.jsx')
        .pipe(gulpPlumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./www/dest'))
});

gulp.task('serve', ['script'], function () {
    express.run(['./index.js']);
    gulp.start('script');
    gulp.start('style');

    gulpWatch(['script/**/*.jsx', 'script/**/*.js'], function (evt) {
        gulp.start('script', function () {
            express.notify(evt);
        });
    });

    gulpWatch('./style/**/*.scss', function (evt) {
        gulp.start('style', function () {
            express.notify(evt);
        });
    });
});