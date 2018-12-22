const styleOptions = require("./styleOptions.js");
const queryOptions = require("./queryOptions.js");
const urls = require("./urls.js");

const triggers = {
        'leaving': "leaving the house without permission",
        'cooking': "cooking poorly",
        'neglect': "neglecting children or housework",
        'dowry': "not having enough dowry money",
        'affair': "suspected of having improper relations with a man",
        'any': "for any trigger except having an affair"
    },
    elById = X => document.getElementById(X),
    valFromDiv = X => elById(X).value,
    makeEl = X => document.createElement(X),
    idT = X => elById(X).options[elById(X).selectedIndex].text.toLowerCase();

function newChart(name, chartType, methods) {
    var self = this;
    self.name = name;
    self.chartType = chartType;
    self.selects = [];
    self.getTitle = methods.getTitle;
    self.getQuery = methods.getQuery;
    self.getUrl   = methods.getUrl;

    self.wrapper = new google.visualization.ChartWrapper({
        containerId: name + 'Chart',
        chartType: chartType,
        options: styleOptions[name]
    });

    self.drawChart = function() {
        self.title.innerHTML = self.getTitle();
        self.wrapper.setQuery( self.getQuery() );
        self.wrapper.setDataSourceUrl( self.getUrl() );
        self.wrapper.draw();
    };

    elById(name).innerHTML = (
        '<h4 class="chart-title" id="' + name + 'Title"></h4>' +
        '<div id="' + name + 'DD"></div>' + 
        '<div id="' + name + 'Chart"></div>'
    );

    self.title = elById(name + 'Title');

    elById(name).classList.add('chart');

    self.makeSelect = function(selectName) {
        var select = makeEl("SELECT");
        select.id = name + selectName;
        select.setAttribute("class", "btn btn-large");

        elById(name + "DD").appendChild(select);
        select.onchange = self.drawChart;
    };

    self.makeOptGroup = function(optGroupName, selectCode, options) {
        var select = elById(name + selectCode);
        var optGroup = makeEl("OPTGROUP");
        optGroup.setAttribute("label", optGroupName.toUpperCase());

        for (i = 0; i < options.length; i++) {
          var option = makeEl("OPTION");
          option.innerHTML = options[i][0];
          option.setAttribute("value", options[i][1]);
          optGroup.appendChild(option);
          option.selected = options[i][2];
        }

        if (select) select.appendChild(optGroup);
    }

    queryOptions[name].forEach(selectSet => {
        self.makeSelect(selectSet.code);
        selectSet.optGroups.forEach(optGroup =>{
            self.makeOptGroup(optGroup.name, selectSet.code, optGroup.options);
        });
    });
}

function drawCharts() {
    // Domestic Violence Bar Chart
    var dvBar = new newChart('dvBar','BarChart', {
        getTitle: () => {
            return "Percentage of women " +
                ((idT('dvBarURT') == 'all') ? "" : "from " + idT('dvBarURT') + " areas") + 
                " who say it is common for men to beat their wives for " + 
                triggers[idT("dvBarDV")];
        },
        getQuery: () => {
            return valFromDiv("dvBarDV") + valFromDiv("dvBarURT");
        },
        getUrl:   () => {
            return urls.dvBar + valFromDiv("dvBarSH");
        }
    });
  
    // Domestic Violence Map
    var dvMap = new newChart('dvMap', 'GeoChart', {
        getTitle: () => { 
            return 'Percentage of ' +
            (idT('dvMapQ2') == 'justified? (men)' ? 'men ' : 'women ') +
            'who say men beating their wives for ' + triggers[idT("dvMapSH")] +
            ' is ' + 
            (idT('dvMapQ2') == 'common?' ? 'common' : 'justified');
        },
        getQuery: () => {
            return 'select A, ' + valFromDiv("dvMapQ2") + 
            " where " + valFromDiv("dvMapQ1") +
            " label " + valFromDiv("dvMapQ2") + " '' "
        },
        getUrl: () => { return urls.dvMap + valFromDiv('dvMapSH') }
    });

    // Domestic Violence Scatter Chart
    var dvScatter = new newChart( 'dvScatter', 'ScatterChart', {
        getTitle: () => {
            return "Comparison of perception and" + 
              ( idT("dvScatterQ2").includes("justified") ? " attitudes" : " reported abuse") + 
              " by state";
        },
        getQuery: () => {
            return 'select D, ' + valFromDiv("dvScatterQ2") + 
                ' where ' + valFromDiv("dvScatterQ1") + valFromDiv("dvScatterBH");
        },
        getUrl:   () => {
            return urls.dvScatter + valFromDiv('dvScatterSH');
        }
    });

    // Work Line Chart
    var wkLines = new newChart('wkLines','LineChart', {
        getTitle: () => {
            return 'Percentage of ever-married women doing ' + idT('wkLinesS2');
        },
        getQuery: () => {
            return 'select A,C, ' + valFromDiv("wkLinesQ2") + ' where ' + valFromDiv("wkLinesQ1");
        },
        getUrl:   () => {
            return urls.wkLines + valFromDiv('wkLinesS1') + valFromDiv('wkLinesS2');
        }
    });

    // Work Geo Chart    
    var wkMap = new newChart('wkMap', 'GeoChart', {
        getTitle: () => {
            return 'Percentage of ' + idT("wkMapQ2") + ' doing ' + idT("wkMapQ3");
        },
        getQuery: () => {
            return 'select AC, ' + valFromDiv("wkMapQ3") + 
                ' where ' + valFromDiv("wkMapQ1") + 
                ' and ' + valFromDiv("wkMapQ2") + 
                " label " +  valFromDiv("wkMapQ3") + " '' " +
                " format " +  valFromDiv("wkMapQ3") + " '##.0%' " +
                " options no_format"; 
        },
        getUrl:   () => {
            return urls.wkMap + valFromDiv('wkMapSH');
        }
    });


    // Work Bar Chart 
    var wkBar = new newChart('wkBar','BarChart', {
        getTitle: () => {
            return "Percentage of women doing outside work"
        },
        getQuery: () => {
            return 'select A,C,D,E,F,G ' + valFromDiv("wkBarURT");
        },
        getUrl:   () => {
            return urls.wkBar + valFromDiv("wkBarSH");
        }
    });

    wkBar.drawChart();    
    wkMap.drawChart();
    wkLines.drawChart();
    dvScatter.drawChart();
    dvMap.drawChart();
    dvBar.drawChart();
}

(function myCharts() {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawCharts);
})();

