/**
 * ClassUpdater implementation for ElementRef type.
 *
 * @author Gerrit Erpenstein
 */
export var ElementRefClassUpdater = (function () {
    function ElementRefClassUpdater(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    ElementRefClassUpdater.prototype.addClass = function (clazz) {
        this._renderer.setElementClass(this._elementRef.nativeElement, clazz, true);
    };
    ElementRefClassUpdater.prototype.removeClass = function (clazz) {
        this._renderer.setElementClass(this._elementRef.nativeElement, clazz, false);
    };
    return ElementRefClassUpdater;
}());
