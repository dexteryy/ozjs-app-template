
require.config({
    baseUrl: 'js/component/',
    distUrl: 'static/appname/js/component/',
    aliases: {
        'appname': '../appname/',
    }
});

define('jquery', ['dollar'], function($){
    return $;
});
 
// unnecessary in the modern browser
define('mo/lang/es5', [], function(){});

require([
    'appname/app'
], function(){

});


