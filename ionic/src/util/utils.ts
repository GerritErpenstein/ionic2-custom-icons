/**
 * Check if the given value is boolean that is true or a string that with the value 'true'.
 */
export function isTrueValue(val: any): boolean {
    return typeof val === 'string' ? val.toLowerCase().trim() === 'true' : !!val;
};