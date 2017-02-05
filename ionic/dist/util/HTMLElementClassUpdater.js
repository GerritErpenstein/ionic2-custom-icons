/**
 * ClassUpdater implementation for HTMLElement type.
 *
 * @author Gerrit Erpenstein
 */
export var HTMLElementClassUpdater = (function () {
    function HTMLElementClassUpdater(_htmlElement) {
        this._htmlElement = _htmlElement;
    }
    HTMLElementClassUpdater.prototype.addClass = function (clazz) {
        this._htmlElement.classList.add(clazz);
    };
    HTMLElementClassUpdater.prototype.removeClass = function (clazz) {
        this._htmlElement.classList.remove(clazz);
    };
    return HTMLElementClassUpdater;
}());
