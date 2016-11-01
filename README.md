ionic2-custom-icons
============

A *npm-script* for creating custom icon fonts and an *Angular 2* directive to render the icons in your *Ionic 2* app.

Table of contents
------------------

<!-- toc -->

- [Description](#description)
- [Installation](#installation)
- [Configuration](#configuration)
  * [Setting up the npm-script](#setting-up-the-npm-script)
    + [1. Extending package.json](#1-extending-packagejson)
      - [1.1 Add npm-scripts](#11-add-npm-scripts)
      - [1.2 Set paths to config files](#12-set-paths-to-config-files)
    + [2. Config files](#2-config-files)
      - [2.1 Config for `copy` and `sass` task](#21-config-for-copy-and-sass-task)
        * [2.1.1 Edit `config/copy.config.js`](#211-edit-configcopyconfigjs)
        * [2.1.2 Edit `config/sass.config.js`](#212-edit-configsassconfigjs)
      - [2.2 Config for `ionic2-custom-icons`](#22-config-for-ionic2-custom-icons)
    + [Advanced configuration](#advanced-configuration)
- [Usage](#usage)
    + [Importing](#importing)
    + [Using the directive in templates](#using-the-directive-in-templates)
      - [Tabs](#tabs)
- [Example app](#example-app)
- [Changelog](#changelog)
- [Building the library](#building-the-library)
- [Contribution](#contribution)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

<!-- tocstop -->

Description
------------------

The *npm-script* allows creating icon fonts from a given set of SVG vector images during the app's build phase. Internally the *npm-script* uses [gulp](http://gulpjs.com/) and the awesome libraries [gulp-iconfont](https://github.com/nfroidure/gulp-iconfont) (by *Nicolas Froidure*) to generate the SVG/*TTF/EOT/WOFF/WOFF2* fonts and [gulp-iconfont-scss](https://github.com/nfroidure/gulp-iconfont-scss) (by *Thomas Jaggi* and *Nicolas Froidure*) to create *Sass* stylesheets from those generated fonts.

The *Angular 2* directive **CustomIcon** provides a convenient way to embed the previously generated icon fonts in an *Ionic 2* app by simply adding a component to the HTML template. See the following example:
```html
<custom-icon set="myIconSet" name="myIcon"></custom-icon>
```
A set of *Sass/CSS* rules comes along with directive, which allows adding icons to default  *Ionic 2* components like buttons and list items.

Theoretically the *npm-script* and directive should work within a generic *Angular 2* environment with minor modifications but right now this is completely untested and unsupported.

~**Notice:** Please be aware that there are serious reasons to not use icon fonts at all. See [here](https://sarasoueidan.com/blog/icon-fonts-to-svg/#recommended-reading) for further discussions. But as the Ionic 2 team prefers icon fonts over other solutions, this is also the path I have chosen.~

Installation
------------------

*ionic2-custom-icons* is available via the *Node Package Manager* (*NPM*).
You can install the package with the following command:
```
npm install ionic2-custom-icons --save
```
The *--save* parameter is optional and saves a reference into the *dependencies* array in your project's package descriptor file *package.json*.

Configuration
------------------

### Setting up the npm-script

Ionic uses `npm scripts` and [ionic-app-scripts](https://github.com/driftyco/ionic-app-scripts) for the build system. This new build system was introduced in version RC0.


#### 1. Extending package.json 

In order to run this library's *npm-script* for building the icon fonts, you have to extend your `package.json` file. This file contains all dependencies of your app and is the main configuration for the build process. 

##### 1.1 Add npm-scripts

Add a `pre-build` and a `pre-watch` script to the the `scripts` property:
```
...
"scripts": {
  "prebuild": "ionic2-custom-icons",
  "prewatch": "ionic2-custom-icons",
  ...
}
...
```

These scripts automatically get called BEFORE *Ionic's* build process starts. `ionic2-custom-icons` is the node script that runs the fonts creation. Thus the generated fonts and the SCSS data are ready to be processed and bundled by *Ionic*'s build tools in the subsequent phase.

See the [package.json](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/package.json) of the example project for reference.

##### 1.2 Set paths to config files

As already mentioned, the generated fonts and the SCSS data need to be processed and bundled in the main build phase of *Ionic's* build tools. For this to work you have to modify the paths processed by the `copy` and `sass` task which is achieved by extending *Ionic's* default configuration.

The first step to do so, is setting paths to custom config files for *Ionic*'s `copy` and `sass` task. The *ionic2-custom-icons* library is also configured by a config file.
Add the following `config` property to your `package.json`:
```
...
"config": {
  "ionic_copy": "./config/copy.config.js",
  "ionic_sass": "./config/sass.config.js",
  "custom_icons": "./config/custom-icons.config.js"
}
...
```

Note: Of course you can set any path you would like to use. Just make sure to adjust it in the next step. 

Again, see the [package.json](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/package.json) of the example project for reference.

#### 2. Config files

In this step you will set up the config files that are referenced in the previous step.
 
##### 2.1 Config for `copy` and `sass` task

[ionic-app-scripts](https://github.com/driftyco/ionic-app-scripts) provide default config files for the `copy` and `sass` task which you can copy and extend.
The **safest way** to get these config files is to look into your local `node_modules` directory.
```
node_modules/@ionic/app-scripts/config
```

(**Alternatively** you can get the files from the project's *GitHub* repository: [ionic-app-scripts/config](https://github.com/driftyco/ionic-app-scripts/tree/master/config). But **be warned**(!) that these config files may be incompatible with your local installation as the code is being actively developed on.) 

Copy the files `copy.config.js` and `sass.config.js` to a directory called `config` in your app's root directory. See the following screenshot for a better understanding:

![screenshot-dir-structure](https://raw.githubusercontent.com/GerritErpenstein/ionic2-custom-icons/master/resources/screenshot-dir-structure.png)

Please note that you have to check and may adapt the two config files everytime you update the `@ionic/app-scripts` library. Hopefully the *Ionic* team provides a better solution in the future.

###### 2.1.1 Edit `config/copy.config.js`

Add(!) the following object to the `include` array:
```
{
  src: '.tmp-custom-icons/fonts/',
  dest: 'www/assets/fonts/'
}
```

See the [copy.config.js](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/config/copy.config.js) of the example project for reference.

###### 2.1.2 Edit `config/sass.config.js`

Remove all properties except `includePaths` and `variableSassFiles`. (Don't worry about the now "missing" properties. *Ionic* merges them from the default config during the build process.)

Now add the following strings to the `includePaths` array:
```
'node_modules/ionic2-custom-icons/directive/scss/',
'.tmp-custom-icons/scss/'
```

Next, add the following string to the `variableSassFiles` array:
```
'.tmp-custom-icons/scss/variables.scss'
```

See the [sass.config.js](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/config/sass.config.js) of the example project for reference.

##### 2.2 Config for `ionic2-custom-icons`

This library also needs minimal configuration. You have to add each icon set you want to use to the file `config/custom-icons.config.js`.
See the following example:
```
// customIcons config
module.exports = {
  iconSets: [
    {
      src: 'icons/my-icons-1/*.svg',
      name: 'MyIcons1',
      id: 'mi1
    },
    {
      src: 'icons/my-icons-2/*.svg',
      name: 'MyIcons2',
      id: 'mi2
    }
  ]
};
```
Each icon set needs to be added to the `iconSets` array. An icon set config is an object that consists of the following three properties: `src`, `name` and `id`:

| Option | Type | Description |
| --- | --- | --- |
| `src` | `string`<br>or<br>`Array` |  Source image files matching the provided glob or array of globs. Glob refers to [ node-glob syntax](https://github.com/isaacs/node-glob) or a direct file path.  See [gulp.src(globs[, options])](https://gulp.readme.io/docs/gulpsrcglobs-options)  for more info. |
| `name` | `string` | A unique name for the icon set. May not contain whitespace. This value is used for naming the generated *Sass* files and the `font-family` property in the *Sass* files. |
| `id` | `string` | A unique, preferably short, identifier string for the icon set. May not contain whitespace. Use this value for the directive's `set` attribute. |

Note: Make sure to use the `module.exports` property as presented in the example. 

See the [custom-icons.config.js](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/config/custom-icons.config.js) of the example project for reference.

#### Advanced configuration

TODO

Usage
------------------

Using the *Angular 2* directive in your *Ionic 2* app to render custom icons is pretty easy.

#### Importing

As with every *Angular 2* directive, you have to provide it's reference to use it in a template. Since *Angular 2* RC5 this is done by using the `@NgModule` decorator function.

This library provides a module called `CustomIconsModule`. To use it in your app, locate your project's root module. *Ionic* names it `app.module.ts` by default. Add `CustomIconsModule` to the `imports` property of your app's root module configuration.
See the following example:
```javascript
...
import { CustomIconsModule } from 'ionic2-custom-icons';
...

@NgModule({
  ...
  imports: [
    IonicModule.forRoot(MyApp),
    CustomIconsModule // Add this!
  ],
  ...
})
export class AppModule {}
```

See the [app.module.ts](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/src/app/app.module.ts) of the example project for reference.

#### Using the directive in templates
Use the directive as follows to render a custom icon in your app:
```html
<custom-icon set="myIconSet" name="myIcon"></custom-icon>
```
The directive has two data-bound input properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `set` | `string` |  **yes** | The desired icon's set name as defined in the *gulp* taks's `id` option. |
| `name` | `string` |  **yes** | File name of the icon without it's file extension.<br>Example: `MyIcon.svg` becomes `MyIcon`. |

Special use cases, like adding an icon to an *Ionic* Button, are also supported:

```html
<button>
    <custom-icon set="myIconSet" name="myIcon"></custom-icon>
    My Button
</button>
```

See the file [icons.html](app/pages/icons/icons.html) in the example app for an overview.

##### Tabs

Support for adding custom icons to *Ionic*'s [tab component](http://ionicframework.com/docs/v2/api/components/tabs/Tab/) was introduced in Version 0.2.0.

Instead of using the `custom-icon` directly, use the two properties `customIconSet` and `customIconName` inside the `ion-tab` component tag.
See the following example:
```html
<ion-tabs class="tabs-icon-text">
    ...
    <ion-tab customIconSet="mySet" customIconName="myIcon" tabTitle="My title" [root]="myPageCmp"></ion-tab>
    ...
</ion-tabs>
```

Refer to the above table for the data-bound input property description. `customIconSet` is analogous to `set` and `customIconName` to `name`. 

Example app
------------------

A fully working example app is provided in an independent *GitHub* repository: [ionic2-custom-icons-example](https://github.com/GerritErpenstein/ionic2-custom-icons-example)

Changelog
---------

A changelog with upgrade information is available [here](https://github.com/GerritErpenstein/ionic2-custom-icons/blob/master/CHANGELOG.md).

Building the library
------------------
There are a few more steps required if you want to build the library. Please note, that this is not required if you just want to use the library in your *Ionic 2* app.

Make sure that all npm dependencies are installed:
```
npm install
```

Build the library by running the following command:
```
npm run build
```

Contribution
------------------
Any contribution is highly welcome! Please send pull requests, report bugs or request new features.

License
------------------

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments
The project originated during the development of the mobile app for the [TU Dortmund University](http://www.tu-dortmund.de/) at the [IT & Medien Centrum (ITMC)](http://www.itmc.tu-dortmund.de/) who kindly allowed me to release this piece of software to the public.

Contact
------------------

Gerrit Erpenstein <gerrit.erpenstein.dev@gmail.com>

Note: Please use the [issue tracker](issues) for bug reports or feature requests.
