import { Directive, ElementRef, Renderer } from '@angular/core';
/**
 * Directive that assigns an appropriate CSS class to button components with a custom-icon as child.
 * This code has been adapted from Ionic's button component class.
 *
 * @see https://github.com/driftyco/ionic/blob/2.0/src/components/button/button.ts
 *
 * @author Gerrit Erpenstein
 */
export var ButtonCustomIcon = (function () {
    function ButtonCustomIcon(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._role = 'button';
    }
    /**
     * Called after the directive's content has been fully
     * initialized.
     */
    ButtonCustomIcon.prototype.ngAfterContentInit = function () {
        this._init = true;
        this._setIconClass();
    };
    /**
     * Called after every check of a directive's content.
     */
    ButtonCustomIcon.prototype.ngAfterContentChecked = function () {
        this._setIconClass();
    };
    /**
     * Iterate component's child nodes, find custom icons and set icon specific CSS class.
     * @private
     */
    ButtonCustomIcon.prototype._setIconClass = function () {
        var element = this._elementRef.nativeElement;
        // figure out if and where the icon lives in the button
        var childNodes = element.childNodes;
        if (childNodes.length > 0) {
            childNodes = childNodes[0].childNodes;
        }
        var childNode;
        var nodes = [];
        for (var i = 0, l = childNodes.length; i < l; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 3) {
                // text node
                if (childNode.textContent.trim() !== '') {
                    nodes.push(TEXT);
                }
            }
            else if (childNode.nodeType === 1) {
                if (childNode.nodeName === 'CUSTOM-ICON') {
                    // icon element node
                    nodes.push(ICON);
                }
                else {
                    // element other than an <custom-icon>
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
            }
            else if (nodes[0] === TEXT && nodes[1] === ICON) {
                this._icon = 'icon-right';
            }
        }
        else if (nodes.length === 1 && nodes[0] === ICON) {
            this._icon = 'icon-only';
        }
        // Finally set CSS class
        this._setClass(this._icon, true);
    };
    /**
     * Set/remove given CSS class for this component's element.
     * @param type CSS class without prefix
     * @param assignCssClass `true` to add class, `false` to remove class
     * @private
     */
    ButtonCustomIcon.prototype._setClass = function (type, assignCssClass) {
        if (type && this._init) {
            this._renderer.setElementClass(this._elementRef.nativeElement, this._role + '-' + type.toLowerCase(), assignCssClass);
        }
    };
    ButtonCustomIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'button:not([ion-item]),[button]'
                },] },
    ];
    /** @nocollapse */
    ButtonCustomIcon.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    return ButtonCustomIcon;
}());
var TEXT = 1;
var ICON = 2;
