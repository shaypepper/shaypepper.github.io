var ew = require('../../index.js');

var controller = ew.lib.controller;
var view = ew.views.paper.introduction;

module.exports = function(){
    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(){
        console.log('loading intro');

    };
    return $;
};