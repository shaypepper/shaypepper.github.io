var ew = require('../../index.js');

var controller = ew.lib.controller;
var view = ew.views.paper.workDvRelationship;

module.exports = function(){
    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(options){
        console.log('loading workDvRelationship');
    };

    return $;
};