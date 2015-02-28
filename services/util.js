/**
 * Created by AliArslan on 23.02.15.
 */

var validator = require('validator');
var underscore = require('underscore');

exports.arrayToString = function(array, quotes){
    var string ="";
    for(index in array){
        if(!quotes || validator.isNumeric(array[index]) || validator.isUUID(array[index])){
            string = string + array[index] + ",";
        }else{
            string = string+"'"+ array[index] + "',";
        }
    }

    return string.substring(0,string.length-1);

}



exports.extractFunctionName = function(string){

    string = string.substr('function '.length);
    string = string.substr(0, string.indexOf('('));
    return string;
}

exports.isNullOrEmpty = function(array){

    if(!array || array.length == 0)
        return true;

    return false;
}

exports.replaceAll =  function(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

exports.validator = validator;
exports.commons =  underscore;