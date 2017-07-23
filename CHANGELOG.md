# [0.5.1](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.5.0...0.5.1) (2017-07-23)
- Fixed custom icon colors

# [0.5.0](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.4.1...0.5.0) (2017-07-16)
- Support for custom icons in actions sheets ([#19](https://github.com/GerritErpenstein/ionic2-custom-icons/issues/19))
- `ionic-cli 3.x` is supported now ([#18](https://github.com/GerritErpenstein/ionic2-custom-icons/issues/18)). See the respective [docs](https://github.com/GerritErpenstein/ionic2-custom-icons/blob/master/docs/CONFIGURATION.md#11-add-npm-scripts) for instructions to update your `package.json` file.
- Updated dependencies

# [0.4.1](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.3.1...0.4.1) (2017-04-23)
- Support for platform-specific icons ([#9](https://github.com/GerritErpenstein/ionic2-custom-icons/issues/9)). This feature allows 'outline' icons for iOS.
- Inactive icons
- Cleanup/improvements for Sass file generation
- Upgraded to Ionic 3, Angular 4, Typescript 2.2
- Various fixes and improvements
- The docs are split in multiple files

#### Breaking changes

- The directory `directive` was renamed `ionic`. Please update your `sass.config.js` file:
 Change the old path
 ```
 node_modules/ionic2-custom-icons/directive/scss/
 ``` 
 to
 ```
 node_modules/ionic2-custom-icons/ionic/scss/
 ```
- The property `name` in the file `custom-icons.config.js` is obsolete and not used anymore. The code shows a warning to remove it but still runs fine.

# [0.3.1](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.3.0...0.3.1) (2016-11-01)
- Updated dependencies

# [0.3.0](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.2.1...0.3.0) (2016-10-07)
- Upgraded to Ionic 2.0.0-rc.0
- Switched from *gulp* to *npm* build system
- Fixed tabs directive (Ionic changed DOM structure)
- Updated README
- Moved example app to independent *GitHub* repository: [ionic2-custom-icons-example](https://github.com/GerritErpenstein/ionic2-custom-icons-example)

#### Breaking changes

*Ionic* switched its build system from *gulp* to *npm scripts* ([ionic-app-scripts](https://github.com/driftyco/ionic-app-scripts)). Consequently you have to reconfigure your build settings for *ionic2-custom-icons*. See the [Readme (Setting up the npm-script)](https://github.com/GerritErpenstein/ionic2-custom-icons/blob/master/README.md#setting-up-the-npm-script) for a detailed step-by-step guide.

# [0.2.1](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.2.0...0.2.1) (2016-08-09)
- Upgraded to Ionic 2.0.0-beta.11
- Adapted structural changes of ion-tabs

# [0.2.0](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.1.1...0.2.0) (2016-07-25)

- Added support for tabs
- Shortened import path: (old path still works)

```import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';```

# [0.1.1](https://github.com/GerritErpenstein/ionic2-custom-icons/compare/0.1.0...0.1.1) (2016-06-29)

- Upgraded to Ionic 2.0.0-beta.10

# 0.1.0 (2016-06-21)

- Initial release
