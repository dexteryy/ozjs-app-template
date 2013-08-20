define([
    'mo/lang',
    'dollar',
    //'mo/network',
    'moui/control'
], function(_, $, control) {

    var UID = '_myControlUid',
    
        uid = 0,
        lib = {};

    function exports(elm, opt){
        elm = $(elm);
        var id = elm[0][UID];
        if (id && lib[id]) {
            return lib[id].set(opt);
        }
        id = elm[0][UID] = ++uid;
        var controller = lib[id] = control(elm, opt);
        return controller;
    }

    return exports;

});

