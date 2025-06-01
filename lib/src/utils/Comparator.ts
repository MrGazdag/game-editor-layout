type Comparator<T> = (a: T, b: T) => number;
namespace Comparator {
    const NATURAL_COLLATOR = new Intl.Collator(undefined, {numeric: true});
    export function naturalCompare(a: string, b: string): number {
        return NATURAL_COLLATOR.compare(a, b);
    }
    export function naturalComparator<T>(key: (t: T)=>string = t=>t+""): Comparator<T> {
        return (a,b)=> naturalCompare(key(a), key(b));
    }
    /**
     * Performs a binary search on the specified ordered array for the specified element.
     * If the object is found within the array, the index of the element is returned.
     *
     * Let x be the position at which the element should be placed in the array.
     * If the object is not found within the array, this method will return -(x + 1).
     * @param array the ordered array to search
     * @param element the element to search for
     * @param compareFunction the function to use for comparing elements
     * @returns the index of the element, or the insertion index
     */
    export function binarySearch<T>(array: Array<T>, element: T, compareFunction: Comparator<T>): number {
        let m = 0;
        let n = array.length - 1;
        while (m <= n) {
            let k = (n + m) >> 1;
            let cmp = compareFunction(element, array[k]);
            if (cmp > 0) {
                m = k + 1;
            } else if(cmp < 0) {
                n = k - 1;
            } else {
                return k;
            }
        }
        return -m - 1;
    }
    /**
     * Performs a binary search on the specified ordered array for the specified element.
     * The element being searched is a property of an element in the array.
     * If the object is found within the array, the index of the element is returned.
     *
     * Let x be the position at which the element should be placed in the array.
     * If the object is not found within the array, this method will return -(x + 1).
     * @param array the ordered array to search
     * @param element the element to search for
     * @param convertFunction the function to convert elements to comparable strings
     * @param compareFunction the function to use for comparing elements
     * @returns the index of the element, or the insertion index
     */
    export function binarySearch2<T,K>(array: Array<T>, element: T, convertFunction: (element: T)=>K, compareFunction: Comparator<K>): number {
        let m = 0;
        let n = array.length - 1;
        while (m <= n) {
            let k = (n + m) >> 1;
            let cmp = compareFunction(convertFunction(element), convertFunction(array[k]));
            if (cmp > 0) {
                m = k + 1;
            } else if(cmp < 0) {
                n = k - 1;
            } else {
                return k;
            }
        }
        return -m - 1;
    }
}
export default Comparator;