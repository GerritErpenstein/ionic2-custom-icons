ionic2-custom-icons
============

A *gulp* plugin for creating custom icon fonts and an *Angular 2* directive to render the icons in your *Ionic 2* app.

Table of contents
------------------

<!-- toc -->

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
  * [Setting up a gulp task](#setting-up-a-gulp-task)
    + [1. Add the plugin](#1-add-the-plugin)
    + [2. Create a new task](#2-create-a-new-task)
    + [3. Add new task to "build" and "watch" tasks](#3-add-new-task-to-build-and-watch-tasks)
    + [4. Add directory to "sass" task](#4-add-directory-to-sass-task)
    + [5. Import icon sets in app.core.scss](#5-import-icon-sets-in-appcorescss)
    + [6. Extend clean task (optional)](#6-extend-clean-task-optional)
    + [Complete example](#complete-example)
  * [Gulp plugin API options](#gulp-plugin-api-options)
  * [Using the directive](#using-the-directive)
    + [Importing](#importing)
      - [Option 1: Globally](#option-1-globally)
      - [Option 2: Per component](#option-2-per-component)
    + [Using the directive in templates](#using-the-directive-in-templates)
      - [Tabs](#tabs)
- [Example app](#example-app)
- [Building](#building)
- [ToDo](#todo)
- [Contribution](#contribution)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

<!-- tocstop -->

Description
------------------

The *gulp* plugin allows creating icon fonts from a given set of SVG vector images during the app's build phase. Internally the plugin uses the great libraries [gulp-iconfont](https://github.com/nfroidure/gulp-iconfont) (by *Nicolas Froidure*) to generate the SVG/*TTF/EOT/WOFF/WOFF2* fonts and [gulp-iconfont-scss](https://github.com/nfroidure/gulp-iconfont-scss) (by *Thomas Jaggi* and *Nicolas Froidure*) to create *Sass* stylesheets from those generated fonts.

The *Angular 2* directive **CustomIcon** provides a convenient way to embed the previously generated icon fonts in an *Ionic 2* app by simply adding a component to the HTML template. See the following example:
```html
<custom-icon set="myIconSet" name="myIcon"></custom-icon>
```
A set of *Sass/CSS* rules comes along with directive, which allows adding icons to default  *Ionic 2* components like buttons and list items.

Theoretically the *gulp* plugin and directive should work within a generic *Angular 2* environment with minor modifications But right now this is completely untested and unsupported.

~**Notice:** Please be aware that there are serious reasons to not use icon fonts at all. See [here](https://sarasoueidan.com/blog/icon-fonts-to-svg/#recommended-reading) for further discussions. But as the Ionic 2 team prefers icon fonts over other solutions, this is also the path I have chosen.~

Installation
------------------

*ionic2-custom-icons* is available via the *Node Package Manager* (*NPM*).
You can install the package with the following command:
```
npm install ionic2-custom-icons --save
```
The *--save* parameter is optional and saves a reference into the *dependencies* array in your project's package descriptor file *package.json*.

Usage
------------------

### Setting up a gulp task

#### 1. Add the plugin
Add the *gulp* plugin to your `gulpfile.js`:
```javascript
var customIcons = require('ionic2-custom-icons/gulp-plugin');
```
#### 2. Create a new task
Create a task and configure the plugin:
```javascript
gulp.task('customicons', function () {
    return customIcons([
        // config
        {
            src: 'icons/my-icons1/*.svg',
            name: 'MyIcons1',
            id: 'mi1'
        },
        {
            src: 'icons/my-icons2/*.svg',
            name: 'MyIcons2',
            id: 'mi2'
        }
    ])
});
```
In this example the task is named `customicons` but you can name it whatever you like. Just make sure you use the particular name for referencing it afterwards.
The plugin's function takes an array as parameter which consists of one or more objects. Each object configures the creation of an icon set. An icon set is a set of an arbitrary number of icons using SVG image files as source.
In the example above there are two icon sets configured: `MyIcons1` and `MyIcons2`.
A configuration object **requires** at least the following three properties: `src`, `name` and `id`. See [Plugin API options](#plugin-api-options) below for an explanation and listing of required and optional configuration properties.

#### 3. Add new task to "build" and "watch" tasks
Next, add the created task `customicons` to the existing `build` and `watch` task:
```javascript
gulp.task('watch', ['clean'], function (done) {
    runSequence(
        // edit the following line
        'customicons', ['sass', 'html', 'fonts', 'scripts'],
        function () {
            // omitted for brevity
        }
    );
});

gulp.task('build', ['clean'], function (done) {
    runSequence(
        // edit the following line
        'customicons', ['sass', 'html', 'fonts', 'scripts'],
        function () {
            // omitted for brevity
        }
    );
});
```
Note: The new task is not inside the previous `runSequence` array as this would cause the task and the `sass` task to both run async. This is not desired as the `customicons` task creates a *Sass* file that is processed in the subsequent `sass` task.

#### 4. Add directory to "sass" task
The plugin generates a *Sass* file for every icon set. These files need to be processed and converted to *CSS* by the *Sass* interpreter during the build phase. Additionally the plugin provides a mandatory *Sass* file for the `custom-icon` directive.
One option to accomplish this is to overwrite the default paths for the `sass` task (*ionic-gulp-sass-build* plugin):
```javascript
gulp.task('sass', function () {
    return buildSass({
        sassOptions: {
            includePaths: [
                // default paths (see ionic-gulp-sass-build)
                'node_modules/ionic-angular',
                'node_modules/ionicons/dist/scss',
                // added for custom icons
                'node_modules/ionic2-custom-icons/directive/lib/scss/',
                'www/scss'
            ]
        }
    });
});
```
Note: The path `www/scss` results from the default value of the plugin's option `scssTargetRelPath` which can be reconfigured.
An alternative way to process the *Sass* files during the build lifecycle is to use the `@import`statements in the *Ionic* app's `app.core.scss`for every single of the before mentioned files.

#### 5. Import icon sets in app.core.scss
Add a reference to each icon set into *Ionic's* `app.core.scss` file in the default path `app/theme/app.core.scss`. This is done by using *Sass*'s `@import` statement and the icon set's name used in the plugin configuration:
```
@import "MyIcons1";
@import "MyIcons2";
```
Note: In the above example the icon set names from step 2 are used (*MyIcons1* and *MyIcons2*). You have to use the names from your individual configuration. For example, if your custom icon set is named '*MySuperDuperIcons*', use `@import "MySuperDuperIcons"`.

#### 6. Extend clean task (optional)
Using the above default configuration, a directory `www/scss` is created during the build phase. If you want it to be deleted when the `clean` task runs, edit it as follows:
```javascript
gulp.task('clean', function () {
    return del(['www/build', 'www/scss']);
});
```

#### Complete example
See the relevant files in the example *Ionic 2* project in the [example](example): directory

* [gulpfile.js](example/gulpfile.js) 
* [app/theme/app.core.scss](example/app/theme/app.core.scss) 

### Gulp plugin API options

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `src` | `string`<br>or<br>`Array` |  **yes** | Source image files matching the provided glob or array of globs. Glob refers to [ node-glob syntax](https://github.com/isaacs/node-glob) or a direct file path.  See [gulp.src(globs[, options])](https://gulp.readme.io/docs/gulpsrcglobs-options)  for more info. |
| `name` | `string` |  **yes** | A unique name for the icon set. May not contain whitespace. This value needs to be referenced in your app's `app.core.scss` via the *Sass* `@import` statement. |
| `id` | `string` | ** yes** | A unique, preferably short, identifier string for the icon set. May not contain whitespace. Use this value for the directive's `set` attribute. |
| `templatePath` | `string` | no | Path to a template file that is used to generate the icon set's *Sass* file. For more info see the plugin's default template (`gulp-plugin/template.scss`) or the *gulp-iconfont-css* [example templates](https://github.com/backflip/gulp-iconfont-css/tree/master/templates).<br>**Default value:** Path to the plugin's default template. |
| `fontTargetPath` | `string` | no | Path to icon set fonts output directory.<br>**Default value**: `www/build/fonts` (Ionic default directory)|
| `fontRelPath` | `string` | no | Relative path to the icon set fonts from the *CSS* base path.<br>**Default value**: `../fonts/` (Ionics default *CSS* path is www/build/css) |
| `scssTargetRelPath` | `string` | no | Path to the generated icon set's *Sass* file, relative to the path used in `fontTargetPath`. <br>**Default value**: `'../../scss/' + name + '.scss'` (Points to `www/scss/<name>.scss`)  |

### Using the directive

Using the *Angular 2* directive in your *Ionic 2* app to render custom icons is pretty easy. As with every *Angular 2* directive, you have to provide it's reference to use it in a template. There are two options to do this: Define it globally (preferred) or define it for every component. The first option is preferred as the *custom-icon* directive is probably used in several templates.

#### Importing

##### Option 1: Globally
To add the *custom-icon* directive globally, import the directive and edit your bootstrap configuration in your `app.ts` file:
```typescript
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';

// ...

ionicBootstrap(MyApp, [
    {
        provide: PLATFORM_DIRECTIVES, useValue: [CUSTOM_ICON_DIRECTIVES], multi: true
    }
]);
```
The *custom-icon* directive is available to all components now. This means you don't need to import and reference it for every `@Component` decorator. Just use `custom-icon` in your templates.

##### Option 2: Per component
If you don't want the directive to be available globally, you can import and reference it for individual components. For this, import the directive and add it to the `@Component` decorator's `directives` array:
```typescript
// ...
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';

@Component({
    templateUrl: 'myTemplate.html',
    directives: [CUSTOM_ICON_DIRECTIVES]
})
export class MyComponent {
    // ...
}
```

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
See the [example](example) directory for a working example *Ionic* app that showcases the *gulp* plugin configuration and various custom icon directive use cases.

Building
------------------
There are a few more steps required if you want to build the library. Please note, that this is not required if you just want to use the library in your *Ionic 2* app.

Make sure that all npm dependencies are installed:
```
npm install
```
Install *typings* globally:
```
npm install typings --global
```
Running this as root user might be necessary, depending on your npm environment.
After that, install the TypeScript definitions:
```
typings install
```
Build the library by running the following command:
```
npm run build
```
You can find the result in the `lib` directory.

ToDo
------------------

* **gulp plugin**
    * Improve streaming capabilities
    * Add more options?
* **directive**
    * ~~Support for *Ionic 2* tabs component~~ (added in 0.2.0)
* Support for generic *Angular 2* environments

Let me know if you have any feature suggestions!

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