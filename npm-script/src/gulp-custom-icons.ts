import * as _ from 'lodash';
import {Config} from './config';

const gulp = require('gulp'),
   gutil = require('gulp-util'),
   iconfont = require('gulp-iconfont'),
   iconfontCSS = require('gulp-iconfont-css'),
   mergeStream = require('merge-stream');

const PLUGIN_NAME = 'ionic2-custom-icons';
const CSS_PREFIX = 'custom-icons-';

export function gulpCustomIcons(config: Config) {
   // One gulp stream for each icon set
   const streams: Array<any> = [];
   for (let iconSet of config.iconSets) {
      gutil.log(PLUGIN_NAME + ': Creating custom icon set \'' + iconSet.name + '\'');
      // run gulp tasks: iconfont, iconfontCSS
      let stream = gulp.src([iconSet.src])
      // https://www.npmjs.com/package/gulp-iconfont-css
         .pipe(iconfontCSS({
            fontName: iconSet.name,
            cssClass: CSS_PREFIX + iconSet.id,
            path: config.templatePath,
            targetPath: _.template(config.scssRelPath)(iconSet),
            fontPath: config.fontRelPath
         }))
         // https://github.com/nfroidure/gulp-iconfont
         .pipe(iconfont({
            fontName: iconSet.name,
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize: true,
            centerHorizontally: true,
            fontHeight: 1000
         }))
         .pipe(gulp.dest(config.fontTargetPath));
      streams.push(stream);
   }
   // return merged streams of all icon sets
   return mergeStream(streams);
}
