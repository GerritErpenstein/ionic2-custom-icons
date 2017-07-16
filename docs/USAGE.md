Usage
============


Using the *Angular 2* directive in your *Ionic 2* app to render custom icons is pretty easy. After adding the icons (following a simple naming syntax) you can use it in your app.

<!-- toc -->

- [Icon file naming](#icon-file-naming)
- [Importing the module](#importing-the-module)
- [Using the directive in templates](#using-the-directive-in-templates)
  * [Tabs](#tabs)
  * [Action Sheets](#action-sheets)

<!-- tocstop -->

#### Icon file naming

Put the icon files in the directory you specified via the `src`-property in your `config/custom-icons.config.js`.
Naming the icons follows a certain simple syntax:

```
{name}-{os?}-{{'inactive'?}}.svg
```

where

| Name part | Required | Description |
| --- | --- | --- | --- |
| `name`  |  **yes** | The specific icon name. May contain hyphens. |
| `os`  |  **no** | The string representation of the target Operating System: `ios` (iOS), `md` (Android/Material Design) or `wp` (Windows Phone). |
| `inactive`  |  **no** | The string `inactive` to set the icon for inactive/outline mode. |

Example icon names:

`gorilla.svg`
`ocelot-ios.svg`
`sea-otter-ios.svg`
`meerkant-inactive.svg`
`warthog-md-inactive.svg`

The example app contains a few more examples: [icons](https://github.com/GerritErpenstein/ionic2-custom-icons-example/tree/master/icons)

#### Importing the module

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
By using the optional `isActive` property you can set the icon to the active (default) or inactive state.
```html
<custom-icon set="myIconSet" name="myIcon" isActive="false"></custom-icon>
```

The directive has three data-bound input properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `set` | `string` |  **yes** | The desired icon's set name as defined in the *gulp* taks's `id` option. |
| `name` | `string` |  **yes** | File name of the icon without it's file extension.<br>Example: `MyIcon.svg` becomes `MyIcon`. |
| `isActive` | `boolean` |  **no** | Sets the icon's state to active/inactive. The default value is `true`. |

Special use cases, like adding an icon to an *Ionic* Button, are also supported:

```html
<button>
    <custom-icon set="myIconSet" name="myIcon"></custom-icon>
    My Button
</button>
```

See the file [icons.page.html](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/src/pages/icons/icons.page.html) in the example app for an overview.

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

##### Action Sheets

Support for adding custom icons to *Ionic*'s [Action Sheet](https://ionicframework.com/docs/components/#action-sheets) dialog was introduced in Version 0.5.0.
Please make sure you understand the basics concepts of using *Ionic's* [ActionSheetController](https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/) as this library builds on top of it.

If you want to use custom icons in your action sheet dialog, use/inject `ActionSheetCustomIconController` instead of *Ionic*'s `ActionSheetController`.
This class is a drop-in replacement for *Ionic*'s implementation which additionally allows setting the `customIcon` option for an element in the `buttons` array property.
The ActionSheet button options now support the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `text` | `string` | The button's text. * |
| `icon` | `string` | The button's default *Ionic* icon. * **Note**: Don't set this property if you want to use a custom icon. |
| `customIcon` | `ActionSheetButtonCustomIconOptions` | The button's custom icon. Supply an object consisting of the following properties: `name` (`string`), `set` (`string`), `active` (`boolean`, optional) |
| `role` | `string` | How the button should be displayed, destructive or cancel. If not role is provided, it will display the button without any additional styles. * |
| `cssClass` | `string` | Additional classes for custom styles, separated by spaces. * |
| `handler` | `function` | A function that is called when the user has clicked the action sheet button. |

<sub>* copied from *Ionic* docs</sub>

This is an example of creating an action sheet with custom icon buttons:
```javascript
...
import {ActionSheetCustomIconController} from 'ionic2-custom-icons';
...

// Create action sheet
let actionSheet = this.actionsheetCtrl.create({
  title: 'My action sheet',
  buttons: [
    // Custom icon button
    {
      text: 'Circle',
      customIcon: {
        set: 'myIconSet',
        name: 'myIcon',
      },
      handler: () => {
        console.log('My custom icon clicked');
      }
    },
    // Default icon button
    {
      text: 'Linux',
      icon: 'tux',
      handler: () => {
        console.log('Tux from ionic's default icon set clicked');
      }
    }
  ]
});
// Show action sheet
actionSheet.present();

```

See the files [action-sheet.page.ts](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/src/pages/action-sheet/action-sheet.page.ts) and [action-sheet.page.html](https://github.com/GerritErpenstein/ionic2-custom-icons-example/blob/master/src/pages/action-sheet/action-sheet.page.html) in the example app for a complete and working example.
