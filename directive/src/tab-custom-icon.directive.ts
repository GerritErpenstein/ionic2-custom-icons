import {Directive, Input, Host, ElementRef, AfterContentInit, OnDestroy, OnChanges, SimpleChange} from '@angular/core';
import {Tabs} from 'ionic-angular';

/**
 * Directive for adding a custom icon to an ion-tab element. Use the input properties 'customIconSet' and
 * 'customIconName' to set the icon's set and name.
 *
 * Example usage:
 * @usage
 * ```html
 * <ion-tab customIconSet="mySet" customIconName="myIcon" ...></ion-tab>
 * ```
 *
 * @author Gerrit Erpenstein
 */
@Directive({
    selector: 'ion-tab[customIconSet],ion-tab[customIconName],'
})
export class TabCustomIcon implements AfterContentInit, OnChanges, OnDestroy {

    /**
     * Icon set name
     */
    @Input('customIconSet')
    private iconSet:string = '';
    /**
     * Icon name
     */
    @Input('customIconName')
    private iconName:string = '';
    /**
     * Icon element in DOM
     */
    private _iconElement:HTMLElement;

    constructor(private _elementRef:ElementRef,
                @Host() private _tabs:Tabs) {
    }

    /**
     * (Called after Angular projects external content into its view.)
     */
    public ngAfterContentInit() {
        setTimeout(() => {
            this._addIcon();
            this._update();
        });
    }

    /**
     * Add icon element to it's corresponding tab.
     * @private
     */
    private _addIcon() {
        let element = this._elementRef.nativeElement,
            tabsElement = this._tabs.getElementRef().nativeElement;
        // find out index of tab item
        let index:number = -1,
            childNodes = tabsElement.childNodes,
            childNode:Node,
            // target tab node
            tabNode:Node;
        for (let i = 0, l = childNodes.length; i < l; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 1 && childNode.nodeName === 'ION-TAB') {
                index++;
                if (element === childNode) {
                    // found it!
                    break;
                }
            }
        }
        if (index === -1) {
            console.warn('Error finding tab index.');
            return;
        }

        // find corresponding tab element in tab bar
        let tabBarNode:Node = childNodes[0];
        if (tabBarNode.nodeType === 1 && tabBarNode.nodeName === 'ION-TABBAR') {
            childNodes = tabBarNode.childNodes;
            let tabBarIndex:number = -1;
            for (let i = 0, l = childNodes.length; i < l; i++) {
                childNode = childNodes[i];
                if (childNode.nodeType === 1 && childNode.nodeName === 'A') {
                    tabBarIndex++;
                    if (index === tabBarIndex) {
                        // found target tab node
                        tabNode = childNode;
                        break;
                    }
                }
            }
        } else {
            console.warn('No ion-tabbar node at index 0.');
            return;
        }

        // add icon to tab
        if (tabNode) {
            // remove class 'has-title-only' from tab, add class 'has-icon'
            let tabCssClass = (<HTMLElement>tabNode).className;
            tabCssClass = tabCssClass.replace(/(?:^|\s)has-title-only(?!\S)/, '');
            if (!/has-title/.test(tabCssClass))
                tabCssClass += ' icon-only';
            tabCssClass += ' has-icon';
            (<HTMLElement>tabNode).className = tabCssClass;
            // create and add custom-icon element to tab
            this._iconElement = document.createElement('custom-icon');
            tabNode.insertBefore(this._iconElement, tabNode.firstChild);
        } else {
            console.warn('Target tab not found.');
            return;
        }
    }

    /**
     * (Called on input parameter value changes.)
     */
    public ngOnChanges(changes:{[key:string]:SimpleChange}) {
        if (this._iconElement)
            this._update();
    }

    /**
     * Update/set the icon's css class.
     * @private
     */
    private _update() {
        let cssClass = this.iconSet + '-' + this.iconName;
        this._iconElement.className = cssClass;
        this._iconElement.className += ' tab-button-icon';
    }

    /**
     * (Called just before Angular destroys the directive/component.)
     */
    public ngOnDestroy() {
        // remove icon element from DOM
        if (this._iconElement) {
            let parentNode:Node = this._iconElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(this._iconElement);
            }
        }
    }
}