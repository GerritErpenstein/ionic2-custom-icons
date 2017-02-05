import { Config } from 'ionic-angular';
import { ClassUpdater } from './util/ClassUpdater';
/**
 * Base class for custom-icon directives. Mainly responsible for setting/updating the target element's CSS class.
 *
 * @author Gerrit Erpenstein
 */
export declare abstract class CustomIconBase {
    /**
     * CSS class prefix
     */
    private static readonly CSS_PREFIX;
    /**
     * Current active css class
     */
    private _class;
    /**
     * Current active css class with mode suffix
     */
    private _classMode;
    /**
     * Platform mode: md, ios or wp
     */
    private _mode;
    /**
     * CSS class updater instance
     */
    private _classUpdater;
    constructor(config: Config);
    /**
     * Set platform mode.
     * @param mode md, ios or wp
     * @private
     */
    protected mode: string;
    /**
     * TODO
     * @param classUpdater
     */
    protected classUpdater: ClassUpdater;
    /**
     * Update and set element's css class values.
     * @private
     */
    protected update(iconName: string, iconSet: string): void;
    /**
     * Remove all CSS class values from this element set by the directive.
     * @private
     */
    protected removeElementClasses(): void;
}
