import {join} from 'path';
import {DefaultConfig} from './config';

export const defaultConfig: DefaultConfig = {
   templatePath: join(__dirname, '../scss/template.scss'),
   fontTargetPath: '.tmp-custom-icons/fonts',
   fontRelPath: '../assets/fonts/',
   scssTargetPath: '.tmp-custom-icons/scss/',
   scssRelPath: '../scss/${name}.scss'
};
