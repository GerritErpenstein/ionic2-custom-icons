"use strict";
var path_1 = require('path');
var fs_1 = require('fs');
var fs_extra_1 = require('fs-extra');
var _ = require('lodash');
var util_1 = require('./util');
var default_config_1 = require('./default-config');
var gulp_custom_icons_1 = require('./gulp-custom-icons');
var gulp = require('gulp');
var taskName = 'customIcons', envConfig = 'custom_icons', cwd = process.cwd();
// Main function called by the npm script
function run() {
    var config = _.merge(default_config_1.defaultConfig, getConfigFileData());
    validateConfig(config);
    cleanTargetDirs(config);
    createIcons(config)
        .then(function () { return createSassVarsFile(config); })
        .then(function () {
        console.log("ionic2-custom-icons: Successfully created icons");
    })
        .catch(function (err) {
        console.error("ionic2-custom-icons: Error creating custom icons: " + err);
        // Allow Node to exit gracefully
        process.exitCode = 1;
    });
}
exports.run = run;
function getConfigFileData() {
    var configRelFilePath = process.env['npm_package_config_' + envConfig], configFilePath = path_1.join(cwd, configRelFilePath);
    return require(configFilePath);
}
function createIcons(config) {
    return new Promise(function (resolve, reject) {
        var task = gulp.task(taskName, function () { return gulp_custom_icons_1.gulpCustomIcons(config); });
        gulp.start([taskName])
            .once('task_stop', resolve);
    });
}
function createSassVarsFile(config) {
    var src = path_1.join(__dirname, './../scss/variables.scss'), dest = path_1.join(cwd, config.scssTargetPath, 'variables.scss');
    return new Promise(function (resolve, reject) {
        // Copy (nearly) empty variables.scss
        fs_extra_1.copy(src, dest, function (err) {
            if (err) {
                var msg = "Error copying \"" + src + "\" to \"" + dest + "\": " + err;
                reject(msg);
                return;
            }
            // Generate import statements
            var scssImports = '';
            for (var _i = 0, _a = config.iconSets; _i < _a.length; _i++) {
                var iconSet = _a[_i];
                scssImports += '\n@import "' + iconSet.name + '";';
            }
            // Write import statements to target variables.scss
            fs_1.appendFile(dest, scssImports, function (err) {
                if (err) {
                    var msg = "Error adding imports to \"" + dest + "\": " + err;
                    reject(msg);
                    return;
                }
                resolve();
            });
        });
    });
}
function validateConfig(config) {
    if (!config.iconSets)
        throw 'Missing property \'iconSets\'.';
    for (var _i = 0, _a = config.iconSets; _i < _a.length; _i++) {
        var set = _a[_i];
        if (!set.src)
            throw new Error('Missing property \'src\' in icon set.');
        if (!set.name)
            throw new Error('Missing property \'name\' in icon set.');
        if (util_1.containsWhitespace(set.name))
            throw new Error('Property \'name\' contains whitespace.');
        if (!set.id)
            throw new Error('Missing property \'id\' in icon set.');
        if (util_1.containsWhitespace(set.id))
            throw new Error('Property \'id\' contains whitespace.');
    }
}
function cleanTargetDirs(config) {
    try {
        fs_extra_1.emptyDirSync(config.fontTargetPath);
        fs_extra_1.emptyDirSync(config.scssTargetPath);
    }
    catch (err) {
        throw new Error("Error cleaning target dirs : " + err);
    }
}
