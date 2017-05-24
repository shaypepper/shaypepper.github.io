var ew = require('../index.js');
var _ = require('underscore');

var chartOptions, $d, $j;

var triggers = {
    'leaving': "leaving the house without permission",
    'cooking': "cooking poorly",
    'neglect': "neglecting children or housework",
    'dowry': "not having enough dowry money",
    'affair': "suspected of having improper relations with a man",
    'any': "for any trigger except having an affair"
}

var clr = [null,
    '#FE6F5E',
    '#915C83',
    '#008000',
    '#5D8AA8',
    '#6F4E37',
    '#cc8a00',
    // '#FFFAF0'
    'gainsboro'
];

var newChart = function newChart(name, type){
    var self = this;
    self.name = name;
    self.wrapper = new google.visualization.ChartWrapper({
        containerId: name + 'Chart',
        chartType: type,
        options: chartOptions[name].style || {}
    });
    self.url = chartOptions[name].url;
    self.selects = {};
    self.extraChanges = function(){};

    self.dom = $d.find('#'+name);
    self.title = $j('<h4>', { id: name+'Title' });
    self.dropdown = $j('<div>', { id: name+'DD' });
    self.chart = $j('<div>', { id: name+'Chart' });

    self.dom.append(self.title);
    self.dom.append(self.dropdown);
    self.dom.append(self.chart);
    self.dom.addClass('chart');
};

newChart.prototype.makeASelect = function(name){
    var self = this;
    var select = $j('<select>', { 
        id: self.name+name, 
        class: 'btn btn-large'
    });
    select.change(function(){ self.drawMe() });

    self.dropdown.append(select);
    self.selects[name] = {
        dom: select,
        get t() { return select.find(':selected').text() },
        get v() { return select.find(':selected').val()  }
    };
};

newChart.prototype.makeOptionGroup = function(title, select, opts){
    var optgroup = $j('<optgroup>', { label: title.toUpperCase() });

    _.each(opts, function(opt){
        var optDom = $j('<option>', { value: opt[1], selected: opt[2] });
        optDom.text(opt[0]);
        optgroup.append(optDom);
    });

    this.selects[select].dom.append(optgroup);
};

newChart.prototype.createSelects = function(){
    var self = this;
    _.each(chartOptions[this.name].selects || {}, function(opts, selectId){
        self.makeASelect(selectId);
        _.each(opts, function(optGroup, name){
            self.makeOptionGroup(name, selectId, optGroup);
        });
    });
};

newChart.prototype.drawMe = function(){
    this.extraChanges();
    this.wrapper.draw();
};

var makeAllCharts = function(){
    var dvBar = new newChart('dvBar', 'BarChart');
    dvBar.extraChanges = function(){
        var s = dvBar.selects;

        var title = "Percentage of women ";
        title += s.URT.t == 'all' ? "" : ("from " + s.URT.t + " areas");
        title += " who say it is common for men to beat their wives for ";
        title += triggers[s.DV.t.toLowerCase()];

        dvBar.title.text(title);
        dvBar.wrapper.setQuery(s.DV.v + s.URT.v);
        dvBar.wrapper.setDataSourceUrl(dvBar.url + s.SH.v);
    };
    dvBar.createSelects();
    dvBar.drawMe();

    var dvMap = new newChart('dvMap', 'GeoChart');
    dvMap.extraChanges = function(){
        var s = dvMap.selects;

        var title = "Percentage of ";
        title += s.Q2 == 'justified? (men)' ? 'men ' : 'women ';
        title += 'who say men beating their wives for ' + triggers[s.SH.t];
        title += ' is ' + s.Q2.t == 'common?' ? 'common' : 'justified';

        var query = 'select A, ' + s.Q2.v;
        query += ' where ' + s.Q1.v + ' label ' + s.Q2.v + ' \'\' ';
        
        dvMap.title.text(title);
        dvMap.wrapper.setQuery(query);
        dvMap.wrapper.setDataSourceUrl(dvMap.url + s.SH.v);
    };
    dvMap.createSelects();
    dvMap.drawMe();

    var dvScatter = new newChart('dvScatter', 'ScatterChart');
    dvScatter.extraChanges = function(){
        var s = dvScatter.selects;
        var title = '**** SHAY FIX THIS TITLE ****';
        var query = 'select D, ' + s.Q2.v + ' where ' + s.Q1.v + s.BH.v;

        dvScatter.title.text(title);
        dvScatter.wrapper.setQuery(query);
        dvScatter.wrapper.setDataSourceUrl(dvScatter.url + s.SH.v);       
    };
    dvScatter.createSelects();
    dvScatter.drawMe();

    var wkLines = new newChart('wkLines', 'LineChart');
    wkLines.extraChanges = function(){
        var s = wkLines.selects;
        var title = 'Percentage of ever-married women doing ' + s.S2.t;
        var query = 'select A,C, ' + s.Q2.v + ' where ' + s.Q1.v;

        wkLines.title.text(title);
        wkLines.wrapper.setQuery(query);
        wkLines.wrapper.setDataSourceUrl(wkLines.url + s.S1.v + s.S2.v);       
    };
    wkLines.createSelects();
    wkLines.drawMe();

    var wkMap = new newChart('wkMap', 'GeoChart');
    wkMap.extraChanges = function(){
        var s = wkMap.selects;
        var title = 'Percentage of ' + s.Q2.t + ' doing ' + s.Q3.t;
        var query = 'select AC, ' + s.Q3.v;
        query += ' where ' + s.Q1.v;
        query += ' and ' + s.Q2.v;
        query += " label " +  s.Q3.v + " '' ";
        query += " format " +  s.Q3.v + " '##.0%' ";
        query += " options no_format";

        wkMap.title.text(title);
        wkMap.wrapper.setQuery(query);
        wkMap.wrapper.setDataSourceUrl(wkMap.url + s.SH.v);       
    };
    wkMap.createSelects();
    wkMap.drawMe();

    var wkBar = new newChart('wkBar', 'BarChart');
    wkBar.extraChanges = function(){
        var s = wkBar.selects;

        var title = 'Percentage of women doing outside work';
        var query = 'select A,C,D,E,F,G ' + s.URT.v;

        wkBar.title.text(title);
        wkBar.wrapper.setQuery(query);
        wkBar.wrapper.setDataSourceUrl(wkBar.url + s.SH.v);       
    };
    wkBar.createSelects();
    wkBar.drawMe();
};

module.exports = function($){
    if (!$) return;
    chartOptions = ew.lib.chartOptions();
    $j = jQuery;
    $d = $.dom;
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(makeAllCharts);
};