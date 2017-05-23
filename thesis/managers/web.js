var _ = require('underscore');
var s = require('underscore.string');
var moment = require('moment');

var ew = require('../index.js');

var webController = ew.controllers.web;
var sections = [
    'introduction',
    'labor-force-participation',
    'domestic-violence',
    'work-dv-relationship',
    'appendix'
];

module.exports = function(){
    var $ = ew.lib.manager();

    var app = ew.controllers.web;
    app.load();
    var appDom = app.dom;
    $.load = function() {
        console.log(ew.controllers);
        _.each(sections, function(section){
            var c = ew.controllers.sections[s.camelize(section)]();
            c.load();
            appDom.find('#'+section).append(c.dom);
        });
    };

    return $;
};