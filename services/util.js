/**
 * Created by AliArslan on 23.02.15.
 */

exports.arrayToString = function(array){
    var string ="";
    for(index in array){
        string = string + array[index] + ",";
    }

    return string.substring(0,string.length-1);

}