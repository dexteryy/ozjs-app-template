
define([
    'dollar',
    'moui/modalview'
], function($, modalView) {

    var exports = modalView({
        className: 'my-modalview',
        closeDelay: 400
    });

    exports.event.bind('confirm', function(modal){
        modal.event.fire('confirmOnThis', arguments);
    }).bind('close', function(modal){
        modal.event.unbind('confirmOnThis');
    });

    return exports;

});

