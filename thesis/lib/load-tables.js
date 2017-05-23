var ew = require('../index.js');

module.exports = function($){
    if (!$) return;
    $.dom.find('.table-holder').each(function(){
        var dom = $.dom.find(this);
        dom.append( ew.views.tables[dom.attr('data-table')]);
    });
};