var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, Input, Host, ElementRef } from '@angular/core';
import { Tabs, Config } from 'ionic-angular';
import { CustomIconBase } from './custom-icon-base';
import { HTMLElementClassUpdater } from './util/HTMLElementClassUpdater';
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
export var TabCustomIcon = (function (_super) {
    __extends(TabCustomIcon, _super);
    function TabCustomIcon(_elementRef, _tabs, config) {
        _super.call(this, config);
        this._elementRef = _elementRef;
        this._tabs = _tabs;
        /**
         * Icon set name
         */
        this.iconSet = '';
        /**
         * Icon name
         */
        this.iconName = '';
    }
    /**
     * (Called after Angular projects external content into its view.)
     */
    TabCustomIcon.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._addIcon();
            _this._update();
        });
    };
    /**
     * Add icon element to it's corresponding tab.
     * @private
     */
    TabCustomIcon.prototype._addIcon = function () {
        var element = this._elementRef.nativeElement, tabsElement = this._tabs.getElementRef().nativeElement, index = -1, childNodes = tabsElement.childNodes, childNode, tabBarNode, tabNode;
        // Find tab bar node and index of tab item
        for (var i = 0, l = childNodes.length; i < l; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 1) {
                if (childNode.classList.contains('tabbar')) {
                    // tab bar found!
                    tabBarNode = childNode;
                }
                else if (childNode.nodeName === 'ION-TAB') {
                    index++;
                    if (element === childNode) {
                        // target tab found!
                        break;
                    }
                }
            }
        }
        if (index === -1) {
            throw 'TabCustomIcon: Error finding tab index.';
        }
        // Find tab node in tab bar
        if (tabBarNode) {
            childNodes = tabBarNode.childNodes;
            var tabBarIndex = -1;
            for (var i = 0, l = childNodes.length; i < l; i++) {
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
        }
        else {
            throw 'TabCustomIcon: Error finding tab bar node "ion-tabbar"';
        }
        // add icon to tab
        if (tabNode) {
            // remove class 'has-title-only' from tab, add class 'has-icon'
            var tabCssClass = tabNode.className;
            tabCssClass = tabCssClass.replace(/(?:^|\s)has-title-only(?!\S)/, '');
            if (!/has-title/.test(tabCssClass))
                tabCssClass += ' icon-only';
            tabCssClass += ' has-icon';
            tabNode.className = tabCssClass;
            // create and add custom-icon element to tab
            this._iconElement = document.createElement('custom-icon');
            this.classUpdater = new HTMLElementClassUpdater(this._iconElement);
            tabNode.insertBefore(this._iconElement, tabNode.firstChild);
        }
        else {
            throw 'TabCustomIcon: Target tab not found.';
        }
    };
    /**
     * Called on input parameter value changes.
     */
    TabCustomIcon.prototype.ngOnChanges = function (changes) {
        if (this._iconElement)
            this._update();
    };
    /**
     * Update/set the icon's css class.
     * @private
     */
    TabCustomIcon.prototype._update = function () {
        _super.prototype.update.call(this, this.iconName, this.iconSet);
    };
    /**
     * Called just before Angular destroys the directive/component.
     */
    TabCustomIcon.prototype.ngOnDestroy = function () {
        // remove icon element from DOM
        if (this._iconElement) {
            _super.prototype.removeElementClasses.call(this);
            var parentNode = this._iconElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(this._iconElement);
            }
        }
    };
    TabCustomIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-tab[customIconSet],ion-tab[customIconName],'
                },] },
    ];
    /** @nocollapse */
    TabCustomIcon.ctorParameters = [
        { type: ElementRef, },
        { type: Tabs, decorators: [{ type: Host },] },
        { type: Config, },
    ];
    TabCustomIcon.propDecorators = {
        'iconSet': [{ type: Input, args: ['customIconSet',] },],
        'iconName': [{ type: Input, args: ['customIconName',] },],
    };
    return TabCustomIcon;
}(CustomIconBase));
