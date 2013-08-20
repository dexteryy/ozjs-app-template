
define([
    'dollar',
    'mo/lang',
    'mo/template',
    'mo/mainloop',
    'eventmaster',
    'soviet',
    './tpl/app',
    './view/control',
    './view/picker',
    './view/growl',
    './view/modalview',
    './view/actionview',
    './view/alert',
    './view/confirm'
], function($, _, tpl, mainloop, event, soviet, 
    tpl_app,
    control, picker,
    growl, modalWindow, actionView, alert, confirm){

    var doc = $(document);
        //body = $(document.body);

    var click_events = {

    };

    var picker_events = {
    
    };

    var view = {

        event: event(),

        init: function(opt){

            $(opt.wrapper)[0].innerHTML = tpl.convertTpl(tpl_app.template, {});

            this.delegate = soviet(doc, {
                matchesSelector: true,
                preventDefault: true,
                autoOverride: true
            }).on('click', click_events)
                .on('picker:change', picker_events);

        },

        growl: growl,
        alert: alert,
        confirm: confirm,
        modalWindow: modalWindow

    };

    return view;

});

