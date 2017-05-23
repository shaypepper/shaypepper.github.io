var ew = require('../index.js');

var controller = ew.lib.controller;
var view = ew.views.web;

var $ = module.exports = controller(view());

$.load = function(){
    jQuery('body').append($.dom);
    
};