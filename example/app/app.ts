import {Component, ViewChild, provide, Provider, PLATFORM_DIRECTIVES} from '@angular/core';
import {Platform, ionicBootstrap, Nav, MenuController, IONIC_DIRECTIVES, ionicProviders} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {RootPage} from './root.page';
import {IconsPage} from './pages/icons/icons.page';
import {TabsPage} from './pages/tabs/tabs.page';

import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    @ViewChild(Nav)
    private _nav:Nav;
    public rootPage:any;
    public pages:Array<{title:string, component:any}>;

    constructor(private _platform:Platform,
                private _menu:MenuController) {
        this._initializeApp();
        this.rootPage = RootPage;
        this.pages = [
            {title: 'Custom icons example', component: IconsPage},
            {title: 'Tabs example', component: TabsPage}
        ];
    }

    private _initializeApp() {
        this._platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    public openPage(page) {
        this._menu.close();
        this._nav.setRoot(page.component);
    }

}

ionicBootstrap(MyApp, [
    {
        provide: PLATFORM_DIRECTIVES, useValue: [CUSTOM_ICON_DIRECTIVES], multi: true
    }
]);