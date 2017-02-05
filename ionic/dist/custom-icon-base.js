/**
 * Base class for custom-icon directives. Mainly responsible for setting/updating the target element's CSS class.
 *
 * @author Gerrit Erpenstein
 */
export var CustomIconBase = (function () {
    function CustomIconBase(config) {
        this.mode = config.get('mode');
    }
    Object.defineProperty(CustomIconBase.prototype, "mode", {
        /**
         * Set platform mode.
         * @param mode md, ios or wp
         * @private
         */
        set: function (mode) {
            if (['md', 'ios', 'wp'].indexOf(mode) === -1) {
                throw 'CustomIcon: Mode ' + this._mode + ' not supported';
            }
            this._mode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomIconBase.prototype, "classUpdater", {
        /**
         * TODO
         * @param classUpdater
         */
        set: function (classUpdater) {
            this._classUpdater = classUpdater;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update and set element's css class values.
     * @private
     */
    CustomIconBase.prototype.update = function (iconName, iconSet) {
        // remove old css class values
        this.removeElementClasses();
        if (!iconName || !iconSet) {
            // invalid input parameters
            this._class = this._classMode = undefined;
            return;
        }
        // new css class values
        this._class = CustomIconBase.CSS_PREFIX + iconSet + '-' + iconName;
        this._classMode = this._class + '-' + this._mode;
        this._classUpdater.addClass(this._class);
        this._classUpdater.addClass(this._classMode);
    };
    /**
     * Remove all CSS class values from this element set by the directive.
     * @private
     */
    CustomIconBase.prototype.removeElementClasses = function () {
        if (this._class)
            this._classUpdater.removeClass(this._class);
        if (this._classMode)
            this._classUpdater.removeClass(this._classMode);
    };
    /**
     * CSS class prefix
     */
    CustomIconBase.CSS_PREFIX = 'custom-icons-';
    return CustomIconBase;
}());
