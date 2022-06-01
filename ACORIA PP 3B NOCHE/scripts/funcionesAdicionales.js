
/**
 * Uses sort method to order by key.
 * 
 * @param {Array} objects array of objects to sort
 * @param {String} key key to sort by
 * @param {Boolean} ascending true for ascending order []
 */
function sortObjects(objects, key, ascending = true){

    if (typeof key == "string" && typeof ascending == "boolean"){
        objects.sort((a,b)=>{
            let result;
            if ( a[key] < b[key]){
                result = -1;
            } else {
                result = 1;
            }
            return ascending === true ? result : result * -1;
        })
    }
}

/**
 * Capitalizes each word in a string
 * i.e. "tHIs is A STRING" -> "This Is A String"
 * 
 * @param {String} str 
 * @returns 
 */
function capitalize(str) {

    let splitStr = str.toLowerCase().split(' ');

    for (let i = 0; i < splitStr.length; i++) {
        
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     

    }

    return splitStr.join(' '); 
}



export {sortObjects, capitalize};