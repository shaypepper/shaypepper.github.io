var ew = require('../../index.js');
console.log('domesticViolence');
var controller = ew.lib.controller;
var view = ew.views.paper.domesticViolence;

module.exports = function(){
    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(){
        console.log('loading dv');

    };
    return $;
};