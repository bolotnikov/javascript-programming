/** 
 * Quick Sort algorithm
 * ===================================================================
 *
 * ------Time Complexity------
 * 
 * Best case
 * O(n * log n) = O(log n) decompositions * O(n) comparisons per decomposition
 *
 * ===================================================================
 *
 * Worst case (already sorted data)
 * 
 * O(n^2) = O(n) decompositions * O(n) comparisons per decomposition
 * (possible solution is pick a middle pivot index)
 * 
 * ===================================================================
 * 
 * ------Space Complexity------
 *         O(log n)
 * ===================================================================
 * 
 * The idea is the arrays of 0 or 1 item are always sorted
 * 
 * [5, 2, 1, 8, 4, 7, 6, 3]
 * 
 * 1. Pick 1 element as a pivot point.
 *    For example let's take the first element of the array which is 5.
 * 
 * 2. Move all the numbers that are less than 5 to the left of it.
 *    Move all the numbers that are greater than 5 to the right of it.
 *    [2, 1, 4, 3, 5, 7, 6, 8]
 *    The 5 is sorted now.
 * 
 * 3. Pick a new pivot point and repeat that process for every unsorted item.

 */

const unsortedArray = [5, 8, 1, 2, 4, 7, 6, 3];
/**
 P - pivot index
 * - current iteration index 
  
  P  *
 [5, 8, 1, 2, 4, 7, 6, 3]
  P     *                                  P  
 [5, 8, 1, 2, 4, 7, 6, 3] P++ and swap [5, 1, 8, 2, 4, 7, 6, 3]
     P     *                                  P
 [5, 1, 8, 2, 4, 7, 6, 3] P++ and swap [5, 1, 2, 8, 4, 7, 6, 3]
        P     *                                  P 
 [5, 1, 2, 8, 4, 7, 6, 3] P++ and swap [5, 1, 2, 4, 8, 7, 6, 3]
           P     *
 [5, 1, 2, 4, 8, 7, 6, 3]
           P        *
 [5, 1, 2, 4, 8, 7, 6, 3]
           P           *                             P
 [5, 1, 2, 4, 8, 7, 6, 3] P++ and swap  [5, 1, 2, 4, 3, 7, 6, 8]
 */
/**
 * Find pivot
 */

class QuickSort {
    private static _swap(arr, idx1, idx2): void {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }

    private static _pivot(unsortedArray: number[], startIndex: number = 0, endIndex: number = unsortedArray.length - 1): number {
        // set pivot value from the start of the unsorted array
        const pivotValue = unsortedArray[startIndex];
    
        // store the current pivot index in a variable
        // this will keep track os where pivot should end up
        let pivotIndex = startIndex; // means how many things is greater then pivotValue
        
        for (let i = startIndex + 1; i <= endIndex; i++) {
            let currentValue = unsortedArray[i];
    
            // if current value is less then pivot value then
            if (currentValue < pivotValue) {
    
                // increment the pivot index
                ++pivotIndex; // so there is one more thing less that pivot value
    
                // swap current element with the element at the pivot index
                this._swap(unsortedArray, i, pivotIndex);
            }
        }
    
        // swap the starting element (pivot) with the pivot index
        this._swap(unsortedArray, startIndex, pivotIndex);
    
        // return pivot index
        return pivotIndex;
    }

    public static execute(arr: number[], left: number = 0, right: number = arr.length - 1): number[] {
        if (left < right) {
            let pivotIndex = this._pivot(arr, left, right);

            this.execute(arr, left, pivotIndex - 1);
            this.execute(arr, pivotIndex + 1, right);
        }

        return arr;
    }
}


const sortedArray = QuickSort.execute(unsortedArray);

console.log(sortedArray);