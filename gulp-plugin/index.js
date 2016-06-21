var gulp = require('gulp'),
    gutil = require('gulp-util'),
    iconfont = require('gulp-iconfont'),
    iconfontCSS = require('gulp-iconfont-css'),
    _ = require('lodash'),
    mergeStream = require('merge-stream');

var PLUGIN_NAME = 'ionic2-custom-icons';

var containsWhitespace = new RegExp("[\\s]");

function validateOptions(options) {
    if (!options.src)
        throw new gutil.PluginError(PLUGIN_NAME, 'Missing option "src"');
    if (!options.name)
        throw new gutil.PluginError(PLUGIN_NAME, 'Missing option "name"');
    if (containsWhitespace.test(options.name))
        throw new gutil.PluginError(PLUGIN_NAME, 'Option "name" contains whitespace');
    if (!options.id)
        throw new gutil.PluginError(PLUGIN_NAME, 'Missing option "id"');
    if (containsWhitespace.test(options.id))
        throw new gutil.PluginError(PLUGIN_NAME, 'Option "id" contains whitespace');
}

module.exports = function (options) {

    var defaultOptions = {
        templatePath: __dirname + '/template.scss',
        fontTargetPath: 'www/build/fonts',
        fontRelPath: '../fonts/',
        scssTargetRelPath: '../../scss/' + options.name + '.scss'
    };

    // One gulp stream for each icon set
    var streams = [];

    options.forEach(function (curOptions) {
        // validate supplied options
        validateOptions(curOptions);
        // merge options with default options
        curOptions = _.merge({
            templatePath: __dirname + '/template.scss',
            fontTargetPath: 'www/build/fonts',
            fontRelPath: '../fonts/',
            scssTargetRelPath: '../../scss/' + curOptions.name + '.scss'
        }, curOptions);

        gutil.log(PLUGIN_NAME + ': Creating custom icon set "' + curOptions.name + '".');
        // run gulp tasks: iconfont, iconfontCSS
        var stream = gulp.src([curOptions.src])
            .pipe(iconfontCSS({
                fontName: curOptions.name,
                cssClass: curOptions.id,
                path: curOptions.templatePath,
                targetPath: curOptions.scssTargetRelPath,
                fontPath: curOptions.fontRelPath
            }))
            .pipe(iconfont({
                fontName: curOptions.name,
                prependUnicode: true,
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
                normalize: true,
                centerHorizontally: true,
                fontHeight: 1000
            }))
            .pipe(gulp.dest(curOptions.fontTargetPath));
        streams.push(stream);
    });

    // return merged streams of all icon sets
    return mergeStream(streams);
};