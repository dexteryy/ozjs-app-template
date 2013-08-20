
define([
    'mo/lang',
    './actionview'
], function(_, actionView) {

    function exports(text, opt) {
        actionView('myAlert', _.mix({
            title: '提示',
            content: text || '',
            cancelText: '关闭',
            multiselect: false
        }, opt)).open();
    }

    return exports;

});

