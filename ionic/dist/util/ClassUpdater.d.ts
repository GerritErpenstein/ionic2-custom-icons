/**
 * Interface that defines methods to add/remove CSS classes to an element.
 *
 * @author Gerrit Erpenstein
 */
export interface ClassUpdater {
    /**
     * Add CSS class to element.
     * @param clazz
     */
    addClass(clazz: string): void;
    /**
     * Remove CSS class from element.
     * @param clazz
     */
    removeClass(clazz: string): void;
}
