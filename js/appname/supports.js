
define([], function(){

    var div = document.createElement('div');

    var exports = {
        JSON: !!window.JSON,
        dataset: 'dataset' in div
    };

    return exports;

});
