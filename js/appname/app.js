
define([
    'mo/lang',
    './view',
    './supports'
], function(_, view, supports){

    var actions = view.event;
    var _DEFAULTS = {

    };

    actions.bind('setting:edited', function(){

    });
    
    var app = {

        init: function(opt){

            _.config(this, opt, _DEFAULTS);

            view.init(opt);

            if (!supports.JSON 
                    || !supports.dataset) {
                app.showMaskLoading('抱歉，暂时只支持Chrome、Firefox或其他类似浏览器的较新版本，你可以把现在的网址复制到那些浏览器里重新打开');
            }

        }
    
    };

    return app;

});


