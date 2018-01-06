import {Config} from './config';
import {logInfo} from './util';

const gulp = require('gulp'),
  iconfont = require('gulp-iconfont'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  mergeStream = require('merge-stream');

const PLUGIN_NAME = 'ionic2-custom-icons',
  FONT_NAME_PREFIX = 'custom-icons-',
  FILENAME_PREFIX = FONT_NAME_PREFIX;

export function gulpCustomIcons(config: Config) {
  // One gulp stream for each icon set
  const streams: Array<any> = [];
  for (let iconSet of config.iconSets) {
    logInfo(PLUGIN_NAME + ': Creating custom icon set \'' + iconSet.id + '\'');
    const fontName = FONT_NAME_PREFIX + iconSet.id;
    // run gulp tasks: iconfont, iconfontCSS
    let stream = gulp.src([iconSet.src])
      .pipe(iconfont({
        fontName: fontName,
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
        normalize: true,
        centerHorizontally: true,
        fontHeight: 1000,
        log: config.debug ? logInfo : () => {}
      }))
      .on('glyphs', function (glyphs: any[], options: any) {
        let setClass = iconSet.id;
        processGlyphs(glyphs, setClass);
        gulp.src(config.templatePath)
          .pipe(template({
            glyphs: glyphs,
            fontName: fontName,
            setClass: setClass,
            fontPath: config.fontRelPath
          }))
          .pipe(rename(FILENAME_PREFIX + iconSet.id + '.scss'))
          .pipe(gulp.dest(config.scssTargetPath))
      })
      .pipe(gulp.dest(config.fontTargetPath));
    streams.push(stream);
  }
  // return merged streams of all icon sets
  return mergeStream(streams);
}

/**
 * Process glyphs and set class name based on its filename
 * @param glyphs
 * @param setClass
 */
function processGlyphs(glyphs: any[], setClass: string) {
  for (let glyph of glyphs) {
    let namePartsTmp = glyph.name.split('-'),
      curNamePart = namePartsTmp.splice(-1)[0],
      iconClassTmp = '';
    // inactive class
    if (curNamePart === 'inactive') {
      iconClassTmp = '.inactive';
      curNamePart = namePartsTmp.splice(-1)[0];
    }
    // mode class
    if (curNamePart === 'ios' || curNamePart === 'md' || curNamePart === 'wp') {
      iconClassTmp = '.' + curNamePart + iconClassTmp;
      curNamePart = namePartsTmp.splice(-1)[0]
    }

    // Prepend base name
    iconClassTmp = curNamePart + iconClassTmp;
    if (namePartsTmp.length) {
      iconClassTmp = namePartsTmp.join('-') + '-' + iconClassTmp;
    }

    // combined classes of glyph
    glyph.class = 'custom-icon.' + 'set-' + setClass + '.' + 'icon-' + iconClassTmp;
    // unicode string of glyph
    glyph.char = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase();
  }
}
