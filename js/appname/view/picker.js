define([
    'mo/lang',
    'dollar',
    'moui/picker'
], function(_, $, picker) {

    var UID = '_myPickerUid',
    
        uid = 0,
        lib = {};

    function exports(elm, opt){
        elm = $(elm);
        var id = elm[0][UID];
        if (id && lib[id]) {
            return lib[id].set(opt);
        }
        id = elm[0][UID] = ++uid;
        opt = _.mix({
            options: '.my-option'
        }, opt || {});
        var p = lib[id] = picker(elm, opt);

        p.event.bind('change', function(p){
            elm.trigger('picker:change', {
                component: p 
            });
        });

        return p;
    }

    return exports;

});

