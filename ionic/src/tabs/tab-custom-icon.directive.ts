import {AfterContentInit, Directive, ElementRef, Host, Input, OnChanges, OnDestroy, SimpleChange} from '@angular/core';
import {Config, Tab, Tabs} from 'ionic-angular';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {flatMap, map} from 'rxjs/operators';
import {CustomIconBase} from '../custom-icon-base';
import {HTMLElementClassUpdater} from '../util/HTMLElementClassUpdater';

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
   * Active tab icon color
   */
  @Input('customIconColorActive')
  public iconColorActive: string = '';
  /**
   * Inactive tab icon color
   */
  @Input('customIconColorInactive')
  public iconColorInactive: string = '';
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
    const iconAdded$ = fromPromise(new Promise(resolve => this._iconAddedResolve = resolve));
    // Subscribe to tab change events and call _onTabSelected on change.
    this._tabs.ionChange.asObservable().pipe(
      flatMap((selectedTab: Tab) => iconAdded$.pipe(map(() => selectedTab)))
    ).subscribe((selectedTab: Tab) => {
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
      tabBarNode: Node | undefined = undefined,
      tabNode: Node | undefined = undefined;

    // Find tab bar node and index of tab item
    for (let i = 0, l = childNodes.length; i < l; i++) {
      childNode = childNodes[i];
      if (childNode.nodeType === 1) {
        if ((<Element>childNode).classList.contains('tabbar')) {
          // tab bar found!
          tabBarNode = childNode;
        } else if (childNode.nodeName === 'ION-TAB') {
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
    if (!tabBarNode) {
      throw 'TabCustomIcon: Error finding tab bar node "ion-tabbar"';
    }

    // Find tab node in tab bar
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

    if (!tabNode) {
      throw 'TabCustomIcon: Target tab not found.';
    }

    // add icon to tab
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

    // add classes to custom icon element
    if (this.iconName && this.iconSet) {
      super.updateIcon(this.iconName);
      super.updateSet(this.iconSet);
    }
    this._iconElement.classList.add('tab-button-icon');
    // Resolve promise
    this._iconAddedResolve();
  }

  /**
   * Called on input parameter value changes.
   */
  public ngOnChanges(changes: { [key: string]: SimpleChange }) {
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
    const active: boolean = (selectedTab === this._tab) ? true : false;
    super.updateActive(active);
    this.updateTabColor(active);
  }

  /**
   * Update the tab's icon color.
   * @param {boolean} active
   */
  private updateTabColor(active: boolean) {
    if (active && this.iconColorActive) {
      this._iconElement.style.color = this.iconColorActive;
    } else if (!active && this.iconColorInactive) {
      this._iconElement.style.color = this.iconColorInactive;
    } else {
      this._iconElement.style.color = '';
    }
  }

  /**
   * Called just before Angular destroys the directive/component.
   */
  public ngOnDestroy() {
    // remove icon element from DOM
    if (this._iconElement) {
      this._iconElement.classList.remove('tab-button-icon');
      super.removeElementClasses();
      let parentNode: Node = this._iconElement.parentNode!;
      if (parentNode) {
        parentNode.removeChild(this._iconElement);
      }
    }
  }
}
