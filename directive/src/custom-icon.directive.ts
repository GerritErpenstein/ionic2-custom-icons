import {Directive, ElementRef, Renderer, Input, OnChanges, SimpleChange} from '@angular/core';

/**
 * Directive to display custom icons from generated icon font.
 *
 * Example usage:
 * @usage
 * ```html
 * <custom-icon set="mySet" name="myIcon"></custom-icon>
 * ```
 *
 * @author Gerrit Erpenstein
 */
@Directive({
   selector: 'custom-icon',
   host: {
      'role': 'img'
   }
})
export class CustomIcon implements OnChanges {
   /**
    * Icon name
    */
   @Input('name')
   public iconName: string = '';
   /**
    * Icon set name
    */
   @Input('set')
   public iconSet: string = '';
   /**
    * Current active css class
    */
   private _class: string;

   constructor(private _elementRef: ElementRef,
               private _renderer: Renderer) {
   }

   /**
    * Called on input parameter value changes.
    */
   public ngOnChanges(changes: {[key: string]: SimpleChange}) {
      this._update();
   }

   /**
    * Update and set element's css class value.
    * @private
    */
   private _update() {
      // remove old css class value
      if (this._class)
         this._renderer.setElementClass(this._elementRef.nativeElement, this._class, false);

      if (!this.iconName || !this.iconSet) {
         // invalid input parameters
         this._class = undefined;
         return;
      }

      // new css class value
      this._class = this.iconSet + '-' + this.iconName;
      this._renderer.setElementClass(this._elementRef.nativeElement, this._class, true);
   }

}
