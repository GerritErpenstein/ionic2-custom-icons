ionic2-custom-icons
============

A *npm-script* for creating custom icon fonts and *Angular 4* directives to render the icons in your *Ionic 3* app.

```
The library has been tested with Ionic 3.6.1, @ionic/app-scripts 2.1.4 and ionic-cli 3.9.2.
```

Please note that Ionic is under heavy development. This library will be updated promptly if there are any modifications/updates necessary. 

Table of contents
------------------

<!-- toc -->

- [Description](#description)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
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

The *npm-script* allows creating icon fonts from a given set of SVG vector images during the app's build phase. Internally the *npm-script* uses [gulp](http://gulpjs.com/) and the awesome libraries [gulp-iconfont](https://github.com/nfroidure/gulp-iconfont) (by *Nicolas Froidure*) to generate the SVG/*TTF/EOT/WOFF/WOFF2* fonts.

The *Angular 2* directive **CustomIcon** provides a convenient way to embed the previously generated icon fonts in an *Ionic 2* app by simply adding a component to the HTML template. See the following example:
```html
<custom-icon set="myIconSet" name="myIcon"></custom-icon>
```
A set of *Sass/CSS* rules comes along with directive, which allows adding icons to default  *Ionic 2* components like buttons and list items.

<sub>**Notice:** Please be aware that there are serious reasons to not use icon fonts at all. See [here](https://sarasoueidan.com/blog/icon-fonts-to-svg/#recommended-reading) for further discussions. But as the Ionic 2 team prefers icon fonts over other solutions, this is also the path I have chosen.</sub>

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
[See *CONFIGURATION* docs](docs/CONFIGURATION.md) (`docs/CONFIGURATION.md`)

Usage
------------------

[See *USAGE* docs](docs/USAGE.md) (`docs/USAGE.md`)

Example app
------------------

A fully working example app is provided in an independent *GitHub* repository: [ionic2-custom-icons-example](https://github.com/GerritErpenstein/ionic2-custom-icons-example)

Changelog
---------

A changelog with upgrade information is available [here](https://github.com/GerritErpenstein/ionic2-custom-icons/blob/master/CHANGELOG.md).

Building the library
------------------

[See *BUILDING* docs](docs/BUILDING.md) (`docs/BUILDING.md`)

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
