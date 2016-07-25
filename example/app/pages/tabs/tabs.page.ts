import {Component} from '@angular/core';

@Component({
    template: `
    <ion-header>
        <ion-navbar>
            <button menuToggle>
                <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title>Tabs example</ion-title>
        </ion-navbar>
    </ion-header>
    <ion-content padding>
        MyContent
    </ion-content>
`
})
class TabIconTextPage {
}

@Component({
    templateUrl: 'build/pages/tabs/tabs.page.html',
    //directives: [CUSTOM_ICON_DIRECTIVES]
})
export class TabsPage {
    tabOne = TabIconTextPage;
    tabTwo = TabIconTextPage;
    tabThree = TabIconTextPage;
    tabFour = TabIconTextPage;
}
