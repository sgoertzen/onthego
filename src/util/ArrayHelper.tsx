
export class ArrayHelper {
    static equals(array1: any[], array2: any[]): boolean {
        // if the other array is a falsy value, return
        if (!array1 || !array2)
            return false;
    
        // compare lengths - can save a lot of time 
        if (array1.length != array2.length)
            return false;
    
        for (var i = 0, l=array1.length; i < l; i++) {
            // Check if we have nested arrays
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                // recurse into the nested arrays
                if (!ArrayHelper.equals(array1, array2)) {
                    return false
                }      
            }           
            else if (array1[i] != array2[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false
            }           
        }       
        return true
    }
}