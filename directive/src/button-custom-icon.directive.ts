import {Directive, ElementRef, Renderer, AfterContentInit, AfterContentChecked} from '@angular/core';


/**
 * Directive that assigns an appropriate CSS class to button components with a custom-icon as child.
 * This code has been adapted from Ionic's button component class.
 *
 * @see https://github.com/driftyco/ionic/blob/2.0/src/components/button/button.ts
 */
@Directive({
   selector: 'button:not([ion-item]),[button]'
})
export class ButtonCustomIcon implements AfterContentInit, AfterContentChecked {

   private _role: string = 'button';
   /**
    * Additional icon specific CSS class
    */
   private _icon: string;
   /**
    * Content initialized?
    */
   private _init: boolean;

   constructor(private _elementRef: ElementRef,
               private _renderer: Renderer) {
   }

   public ngAfterContentInit() {
      this._init = true;
      this._setIconClass();
   }

   public ngAfterContentChecked() {
      this._setIconClass();
   }

   /**
    * Iterate component's child nodes, find custom icons and set icon specific CSS class.
    * @private
    */
   private _setIconClass() {
      let element = this._elementRef.nativeElement;

      // figure out if and where the icon lives in the button
      let childNodes = element.childNodes;
      if (childNodes.length > 0) {
         childNodes = childNodes[0].childNodes;
      }
      let childNode: Node;
      let nodes: number[] = [];
      for (let i = 0, l = childNodes.length; i < l; i++) {
         childNode = childNodes[i];

         if (childNode.nodeType === 3) {
            // text node
            if (childNode.textContent.trim() !== '') {
               nodes.push(TEXT);
            }

         } else if (childNode.nodeType === 1) {
            if (childNode.nodeName === 'CUSTOM-ICON') {
               // icon element node
               nodes.push(ICON);

            } else {
               // element other than an <ion-icon>
               nodes.push(TEXT);
            }
         }
      }

      // Remove any classes that are set already
      this._setClass(this._icon, false);

      // Determine icon specific CSS class (if there is an icon)
      if (nodes.length > 1) {
         if (nodes[0] === ICON && nodes[1] === TEXT) {
            this._icon = 'icon-left';

         } else if (nodes[0] === TEXT && nodes[1] === ICON) {
            this._icon = 'icon-right';
         }

      } else if (nodes.length === 1 && nodes[0] === ICON) {
         this._icon = 'icon-only';
      }

      // Finally set CSS class
      this._setClass(this._icon, true);
   }

   /**
    * Set/remove given CSS class for this component's element.
    * @param type CSS class without prefix
    * @param assignCssClass `true` to add class, `false` to remove class
    * @private
    */
   private _setClass(type: string, assignCssClass: boolean) {
      if (type && this._init) {
         this._renderer.setElementClass(this._elementRef.nativeElement, this._role + '-' + type.toLowerCase(), assignCssClass);
      }
   }

}

const TEXT = 1;
const ICON = 2;
