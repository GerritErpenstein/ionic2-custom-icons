import {join} from 'path';
import {appendFile as fsAppendFile} from 'fs';
import {copy as fsCopy, emptyDirSync} from 'fs-extra';
import * as _ from 'lodash';
import {Config, IconSetConfig} from './config';
import {containsWhitespace} from './util';
import {defaultConfig} from './default-config';
import {gulpCustomIcons} from './gulp-custom-icons';

const gulp: any = require('gulp'),
  gutil: any = require('gulp-util');

const taskName = 'customIcons',
  envConfig = 'custom_icons',
  cwd = process.cwd();

// Main function called by the npm script
export function run() {
  const config: Config = _.merge(defaultConfig, getConfigFileData());

  validateConfig(config);

  cleanTargetDirs(config);

  createIcons(config)
    .then(() => createSassVarsFile(config))
    .then(() => {
      console.log(`ionic2-custom-icons: Successfully created icons`);
    })
    .catch((err) => {
      console.error(`ionic2-custom-icons: Error creating custom icons: ${err}`);
      // Allow Node to exit gracefully
      process.exitCode = 1;
    });
}

function getConfigFileData() {
  const configRelFilePath = process.env['npm_package_config_' + envConfig],
    configFilePath = join(cwd, configRelFilePath);
  return require(configFilePath);
}

function createIcons(config: Config): Promise<any> {
  return new Promise((resolve, reject) => {
    const task = gulp.task(taskName, () => gulpCustomIcons(config));
    gulp.start([taskName])
      .once('task_stop', resolve);
  });
}

function createSassVarsFile(config: Config): Promise<any> {
  const src = join(__dirname, './../scss/variables.scss'),
    dest = join(cwd, config.scssTargetPath, 'variables.scss');
  return new Promise((resolve, reject) => {
    // Copy (nearly) empty variables.scss
    fsCopy(src, dest, (err:any) => {
      if (err) {
        const msg = `Error copying "${src}" to "${dest}": ${err}`;
        reject(msg);
        return;
      }
      // Generate import statements
      let scssImports: string = '';
      for (let iconSet of config.iconSets) {
        scssImports += '\n@import "' + 'custom-icons-' + iconSet.id + '";';
      }
      // Write import statements to target variables.scss
      fsAppendFile(dest, scssImports, (err:any) => {
        if (err) {
          const msg = `Error adding imports to "${dest}": ${err}`;
          reject(msg);
          return;
        }
        resolve();
      });
    });
  });
}

function validateConfig(config: Config) {
  if (!config.iconSets)
    throw 'Missing property \'iconSets\'.';

  for (let set of config.iconSets) {
    if (!set.src)
      throw new Error('Missing property \'src\' in icon set.');
    if (containsWhitespace(set.name))
      throw new Error('Property \'name\' contains whitespace.');
    if (!set.id)
      throw new Error('Missing property \'id\' in icon set.');
    if (containsWhitespace(set.id))
      throw new Error('Property \'id\' contains whitespace.');
    if (set.name)
      console.warn('ionic2-custom-icons: Property \'name\' in config is obsolete and safe to remove.');
  }
}

function cleanTargetDirs(config: Config) {
  try {
    emptyDirSync(config.fontTargetPath);
    emptyDirSync(config.scssTargetPath);
  } catch (err) {
    throw new Error(`Error cleaning target dirs : ${err}`);
  }
}
