
define([
    'mo/lang',
    './actionview'
], function(_, actionView) {

    function exports(text, cb, opt) {
        var view = actionView('myAlert', _.mix({
            title: '提示',
            content: text || '',
            confirmText: '确认',
            cancelText: '取消',
            multiselect: true
        }, opt)).open();
        view.event.bind('confirmOnThis', cb);
        if (opt && opt.cancelMethod) {
            view.event.bind('cancelOnThis', opt.cancelMethod);
        }
    }

    return exports;

});

