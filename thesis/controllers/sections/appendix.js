var ew = require('../../index.js');
console.log('appendix', ew);
var controller = ew.lib.controller;
var view = ew.views.paper.appendix;

module.exports = function(){

    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(options){
        console.log('loading appendix');
    };

    return $;
};