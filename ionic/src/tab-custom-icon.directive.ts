import {Directive, Input, Host, ElementRef, AfterContentInit, OnDestroy, OnChanges, SimpleChange} from '@angular/core';
import {Tab, Tabs, Config} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {CustomIconBase} from './custom-icon-base';
import {ClassUpdater} from './util/ClassUpdater';
import {HTMLElementClassUpdater} from './util/HTMLElementClassUpdater';

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
export class TabCustomIcon extends CustomIconBase implements AfterContentInit, OnChanges, OnDestroy {

  /**
   * Icon set name
   */
  @Input('customIconSet')
  public iconSet: string = '';
  /**
   * Icon name
   */
  @Input('customIconName')
  public iconName: string = '';
  /**
   * Icon element in DOM
   */
  private _iconElement: HTMLElement;
  /**
   * Promise resolve function that is called when the icon has been added to the DOM.
   */
  private _iconAddedResolve: () => void;

  constructor(private _elementRef: ElementRef,
              private _tab: Tab,
              @Host() private _tabs: Tabs,
              config: Config) {
    super(config);
    // Observable from Promise that resolves when the icon is added to the DOM
    const iconAdded$ = Observable.fromPromise(new Promise(resolve => this._iconAddedResolve = resolve));
    // Subscribe to tab change events and call _onTabSelected on change.
    this._tabs.ionChange.asObservable()
      .flatMap((selectedTab: Tab) => iconAdded$.map(() => selectedTab))
      .subscribe((selectedTab: Tab) => {
        this._onTabSelected(selectedTab);
      });
  }

  /**
   * (Called after Angular projects external content into its view.)
   */
  public ngAfterContentInit() {
    setTimeout(() => {
      this._addIcon();
    });
  }

  /**
   * Add icon element to it's corresponding tab.
   * @private
   */
  private _addIcon() {
    let element = this._elementRef.nativeElement,
      tabsElement = this._tabs.getElementRef().nativeElement,
      index: number = -1,
      childNodes = tabsElement.childNodes,
      childNode: Node,
      tabBarNode: Node,
      tabNode: Node;

    // Find tab bar node and index of tab item
    for (let i = 0, l = childNodes.length; i < l; i++) {
      childNode = childNodes[i];
      if (childNode.nodeType === 1) {
        if ((<Element>childNode).classList.contains('tabbar')) {
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
      let tabBarIndex: number = -1;
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
      throw 'TabCustomIcon: Error finding tab bar node "ion-tabbar"';
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
      this.classUpdater = new HTMLElementClassUpdater(this._iconElement);
      tabNode.insertBefore(this._iconElement, tabNode.firstChild);
    } else {
      throw 'TabCustomIcon: Target tab not found.';
    }

    // add classes to custom icon element
    if (this.iconName && this.iconSet) {
      super.updateIcon(this.iconName);
      super.updateSet(this.iconSet);
    }
    // Resolve promise
    this._iconAddedResolve();
  }

  /**
   * Called on input parameter value changes.
   */
  public ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (this._iconElement) {
      if (changes.hasOwnProperty('iconName')) {
        super.updateIcon(this.iconName);
      }
      if (changes.hasOwnProperty('iconSet')) {
        super.updateSet(this.iconSet);
      }
    }
  }

  /**
   * Called on selected tab change.
   * @param selectedTab The newly selected Tab
   * @private
   */
  private _onTabSelected(selectedTab: Tab) {
    if (selectedTab === this._tab) {
      super.updateActive(true);
    } else {
      super.updateActive(false);
    }
  }

  /**
   * Called just before Angular destroys the directive/component.
   */
  public ngOnDestroy() {
    // remove icon element from DOM
    if (this._iconElement) {
      super.removeElementClasses();
      let parentNode: Node = this._iconElement.parentNode;
      if (parentNode) {
        parentNode.removeChild(this._iconElement);
      }
    }
  }
}
