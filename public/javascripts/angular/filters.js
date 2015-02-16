var __filters = angular.module('global-filters',[]);


__filters.filter('datetimeFormat', function() {
    return function(input,format) {
        format = moment().toMomentFormatString(format);
        var inputFormat =  "YYYY-MM-DD'T'HH:mm:ssZ";
        return input ? moment(input,inputFormat).format(format) : '';
    }
});