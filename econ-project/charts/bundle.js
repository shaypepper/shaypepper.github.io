(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{"./queryOptions.js":2,"./styleOptions.js":3,"./urls.js":4}],2:[function(require,module,exports){
var opts = module.exports = {};

opts.dvBar = [
    {
        code: "URT",
        optGroups: [
            {
                name: "Area",
                options: [
                    ["All",   "where B = 0 ", true],
                    ["Urban", "where B = 2 ", false],
                    ["Rural", "where B = 1 ", false]
                ]
            }
        ]
        
    },
    {
        code: "DV",
        optGroups: [
            {
                name: "Trigger",
                options: [
                    ["Leaving","select A,C ", false],
                    ["Dowry",  "select A,D ", false],
                    ["Neglect","select A,E ", false],
                    ["Cooking","select A,F ", false],
                    ["Affair", "select A,H ", false],
                    ["Any", "select A,G ", true]
                ]
            }
        ]
    },
    {
        code: "SH",
        optGroups: [
            {
                name: "X-Axis",
                options: [
                    ["By Region","reg", true],
                    ["By Religion",  "rel", false],
                    ["By Caste","cst", false]
                ]
            }
        ]
    }
];


opts.dvMap = [
    {
        code: "Q1",
        optGroups: [
            {
                name: "Areas",
                options: [
                    ['All', ' C = "Total" ', true],
                    ['Rural', ' C = "Rural" ', false],
                    ['Urban', ' C = "Urban" ', false]
                ]
            }
        ]
    },
    {
        code: "SH",
        optGroups: [
            {
                name: "Trigger",
                options: [
                    ['Leaving', 'DV1', false],
                    ['Dowry', 'DV2', false],
                    ['Neglect', 'DV3', false],
                    ['Cooking', 'DV4', false],
                    ['Affair', 'DV5', false],
                    ['Any', 'DVcomp', true]
                ]
            }
        ]
    },
    {
        code: "Q2",
        optGroups: [
            {
                name: "Perceptions",
                options: [
                    ['Common?', ' D*100 ', true]
                ]
            },
            {
                name: "Attitudes",
                options: [
                    ['Justified? (women)', ' E*100 ', false],
                    ['Justified? (men)', ' F*100 ', false]
                ]
            },
            {
                name: "Actual Abuse",
                options: [
                    ['Less Severe', ' G*100 ', false],
                    ['Severe', ' H*100 ', false],
                    ['Any non-sexual', ' I*100 ', false],
                    ['Sexual', ' J*100 ', false],
                    ['Any', ' K*100 ', false]
                ]
            }
        ]
    }
];

opts.dvScatter = [
    {
        code: "Q1",
        optGroups: [
            {
                name: "Areas",
                options: [
                    ['All', ' C = "Total" ', true],
                    ['Rural', ' C = "Rural" ', false],
                    ['Urban', ' C = "Urban" ', false]
                ]
            }
        ]
    },
    {
        code: "SH",
        optGroups: [
            {
                name: "Trigger",
                options: [
                    ['Leaving', 'DV1', false],
                    ['Dowry', 'DV2', false],
                    ['Neglect', 'DV3', false],
                    ['Cooking', 'DV4', false],
                    ['Affair', 'DV5', false],
                    ['Any (except affair)', 'DVcomp', true]
                ]
            }
        ]
    },
    {
        code: "Q2",
        optGroups: [
            {
                name: "Attitudes",
                options: [
                    ['Justified? (women)', ' E ', false],
                    ['Justified? (men)', ' F ', false]
                ]
            },
            {
                name: "Actual Abuse",
                options: [
                    ['Less Severe', ' G ', false],
                    ['Severe', ' H ', false],
                    ['Any non-sexual', ' I ', false],
                    ['Sexual', ' J ', false],
                    ['Any', ' K ', true]
                ]
            }
        ]
    },
    {
        code: "BH",
        optGroups: [
            {
                name: "Bihar?",
                options: [
                    ['With Bihar', '', false],
                    ['Without Bihar', " and B != 'IN-BR' ", true]
                ]
            }
        ]
    }
];

opts.wkLines = [
    {
        code: "Q1",
        optGroups: [
            {
                name: "Areas",
                options: [
                    ['All', ' B = 0 ', true],
                    ['Rural', ' B = 1 ', false],
                    ['Urban', ' B = 2 ', false]
                ]
            }
        ]
    },
    {
        code: "S2",
        optGroups: [
            {
                name: "Type of work",
                options: [
                    ['Any Work', "_0", false],
                    ['Farm Work', "_1", false, ],
                    ['Animal Work', "_2", false],
                    ['Agricultural Wage Work', "_3", false],
                    ['Other Wage Work', "_4", false],
                    ['Salary Work', "_5", false],
                    ['Household Business Work', "_6", false],
                    ['Any Outside Work', "_8", true],
                    ['Any Wage Work', "_7", false]
                ]
            },

        ]
    },
    {
        code: "S1",
        optGroups: [
            {
                name: "X-Axis",
                options: [
                    ['Affluence score*',"aff", false],
                    ['Vlg domestic violence score*',"vdv", false],
                    ['Education levels',"edu",false],
                    ['Age Group',"age", true]
                ]
            }
        ]
    },
    {
        code: "Q2",
        optGroups: [
            {
                name: "Lines",
                options: [
                    ['Caste',' D,E,F,G,H ',false],
                    ['Children at home?', ' I,J ', false],
                    ['Beating for leaving common?*', ' K,L ', false],
                    ['Beating for dowry common?*', ' M,N ', false],
                    ['Beating for neglect common?*', ' O,P ', false],
                    ['Beating for cooking common?*', ' Q,R ', false],
                    ['Beating for affair common?*', ' S,T ', false],
                    ['Beating for any common (except affair)?*', ' U,V ', true],
                    ['Veiling Practice (Purdah)', ' W,X ', false],
                    ['Region', ' Y,Z,AA,AB,AC,AD ', false],
                    ['Religion', ' AE,AF,AG,AH ', false]
                ]
            }
        ]
    }
];

opts.wkBar = [
    {
        code: "URT",
        optGroups: [
            {
                name: "Area",
                options: [
                    ["All",   "where B = 0 ", true],
                    ["Urban", "where B = 2 ", false],
                    ["Rural", "where B = 1 ", false]
                ]
            }
        ]
    },
    {
        code: "SH",
        optGroups: [
            {
                name: "X-Axis",
                options: [
                    ["By Region","reg", true],
                    ["By Religion",  "rel", false],
                    ["By Caste","cst", false],
                    ["By Affluence Level","aff", false],
                    ["By Village DV Level","vdv", false],
                    ["By Age Group","age", false]
                ]
            }
        ]
    }
];

opts.wkMap = [
    {
        code: "Q1",
        optGroups: [
            {
                name: "Areas",
                options: [      
                    ['All', ' B = 0 ', true],
                    ['Rural', ' B = 1 ', false],
                    ['Urban', ' B = 2 ', false]
                ]
            }
        ]
    },
    {
        code: "Q2",
        optGroups: [
            {
                name: "Gender and DV Perception",
                options: [
                    ['Men and Women', ' C = 0 and D = 0 and E = 0', false],
                    ['Men', ' C = 1 and D = 0 and E = 0', false],
                    ['Women', ' C = 2 and D = 0 and E = 0', false],
                    ['All Ever-married Women', ' C = 2 and D = 2 and E = 0', true],
                    ['EM Women Who Say DV is Common', ' C = 2 and D = 2 and E = 2', false],
                    ["EM Women Who Don't Say DV is Common", 'C = 2 and D = 2 and E = 1', false]
                ]
            }
        ]
    },
    {
        code: "Q3",
        optGroups: [
            {
                name: "Type of Work",
                options: [
                    ['Any Work', " G*100 ", false],
                    ['Farm Work', " H*100 ", false, ],
                    ['Animal Work', " I*100 ", false],
                    ['Agricultural Wage Work', " J*100 ", true],
                    ['Other Wage Work', " K*100 ", false],
                    ['Salary Work', " L*100 ", false],
                    ['Household Business Work', " M*100 ", false]
                ]
            }
        ]
    },
    {
        code: "SH",
        optGroups: [
            {
                name: "No additional variables",
                options: [['All', 'all_q', true]]
            },
            {
                name: "Caste",
                options: [
                    ['Brahmin', "hh_caste_1", false],
                    ['OBC', "hh_caste_2",false],
                    ['SC', "hh_caste_3",false],
                    ['ST', "hh_caste_4",false],
                    ['Other', "hh_caste_5",false]
                ]
            },
            {
                name: "Children under 5",
                options: [
                    ['Yes','nunder5_0',false],
                    ['No','nunder5_0',false]
                ]
            },
            {
                name: "Religion",
                options: [
                    ['Hindu', 'hh_religion_1',false],
                    ['Muslim', 'hh_religion_2',false],
                    ['Christian', 'hh_religion_3',false],
                    ['Other', 'hh_religion_4',false] 
                ]
            },
            {
                name: "Affluence Quintile",
                options: [
                    ['0-20% (poorest)', 'hh_aff_0',false],
                    ['20-40%', 'hh_aff_1',false],
                    ['40-60%', 'hh_aff_2',false],
                    ['60-80%', 'hh_aff_3',false],
                    ['80-100% (richest)', 'hh_aff_4',false]
                ]
            },
            {
                name: "Purdah (veiling)",
                options: [
                    ['Yes, practices','purdah_0',false],  
                    ['No','purdah_1',false]
                ]
            },
            {
                name: "DV trigger: Leaving",
                options: [
                    ["Doesn't Say Common",'iDV1Leaving_0',false],
                    ["Says Common",'iDV1Leaving_1',false]
                ]
            },
            {
                name: "DV trigger: Dowry",
                options: [
                    ["Doesn't Say Common",'iDV2Dowry_0',false],
                    ["Says Common",'iDV2Dowry_1',false]
                ]
            },
            {
                name: "DV trigger: Neglect",
                options: [
                    ["Doesn't Say Common",'iDV3Neglect_0',false],
                    ["Says Common",'iDV3Neglect_1',false]
                ]
            },
            {
                name: "DV trigger: Cooking",
                options: [
                    ["Doesn't Say Common",'iDV4Cooking_0',false],
                    ["Says Common",'iDV4Cooking_1',false]
                ]
            },
            {
                name: "DV trigger: Affair",
                options: [
                    ["Doesn't Say Common",'iDV5Affair_0',false],
                    ["Says Common",'iDV5Affair_1',false]
                ]
            },
            {
                name: "DV trigger: Any, 1-4",
                options: [
                    ["Doesn't Say Common",'iDVComp_0',false],
                    ["Says Common",'iDVComp_1',false]
                ]
            },


        ]
    }
];
},{}],3:[function(require,module,exports){
var opts = module.exports = {};

const clr = ['', '#FE6F5E', '#915C83', '#008000', '#5D8AA8', '#6F4E37', '#cc8a00', '#FFFAF0'];

opts.dvBar = {
    tooltip: {
        trigger: 'none'
    },
    titlePosition: 'in',
    chartArea: {width: '100%', height: '90%'},
    colors: clr.slice(1,7),
    hAxis: {        
    textStyle: {
      color: clr[5], 
      bold: 'true', 
      font: 'Lato'
    },
    title: 'Affluence score', 
    titleTextStyle: {
      color: clr[5]
    }, 
    format: 'percent'
    },
    height: '400',
    vAxis: {
        textStyle: {
            color: clr[7], 
            bold: 'false'
        },
        title: 'Percentage of women working ', 
        titleTextStyle: {
            color: clr[7]
        }, 
        textPosition: 'in'
    },
    axisTitlesPosition: 'none',
    legend: 'none',
    backgroundColor: 'transparent', 
    animation: {
        duration: 600, 
        easing:'out'
    } 
}

opts.wkMap = opts.dvMap = {
      displayMode: 'regions',
      resolution: 'provinces',
      domain: 'IN',
      region: 'IN',
      colorAxis: {
        minValue: 0, 
        maxValue: 100, 
        colors: [clr[7], clr[1]]
      },
      legend: {
        textStyle: {color: clr[5], bold: 'false'}
      },
      backgroundColor: clr[7],
      datalessRegionColor: clr[7]
    }


opts.dvScatter = {
      titlePosition: 'in',
      chartArea: {width: '90%'},
      colors: [clr[1],clr[2],clr[3],clr[4],clr[5], clr[6]],
      hAxis: {
        textStyle: {
          color: clr[5], 
          bold: 'true', 
          font: 'Lato'
        },
        title:'NFHS - justified or reported', 
        titleTextStyle:{color: clr[5]}, 
//        textPosition: 'in',
        // viewWindow: {max: 1, min: 0},
        format: 'percent'
      },
      vAxis: {
        format: 'percent',
        textStyle: {
          color: clr[5], 
          bold: 'true'
        },
        title: 'IHDS perception', 
        titleTextStyle: {color: clr[5]}, 
        // viewWindow: {max: 1, min: 0},
        textPosition: 'in'},
        legend: 'none',
        backgroundColor: 'transparent', 
        animation: { easing: 'in',  duration: 600},
        trendlines: { 0: {} }, 
        datalessRegionColor: clr[7]
};


opts.wkLines = {
      titlePosition: 'in',
      chartArea: {width: '100%', height: '100%'},
      curveType: 'function',
      colors: [clr[1],clr[2],clr[3],clr[4],clr[5], clr[6]],
      hAxis: { 
        textStyle: {color: clr[5], bold: 'true', font: 'Lato'},
        title:          'Affluence score', 
        titleTextStyle:{color: clr[5]}, 
        textPosition: 'in',
        format: 'short'
      },
      height: '400',
      vAxis: {
        format: 'percent',
        textStyle: {color: clr[5], bold: 'true'},
        title: 'Percentage of women working ', 
        titleTextStyle:{color: clr[5]}, 
        textPosition: 'in'
      },
      axisTitlesPosition: 'in',
      legend: {position: 'in'},
      backgroundColor: 'transparent', 
      animation: {duration: 600, easing:'out'} 
    }

opts.wkBar = {
    titlePosition: 'in',
    chartArea: {
        width: '100%', 
        height: '90%'
    },
    colors: [clr[1],clr[2],clr[3],clr[4],clr[5], clr[6]],
    hAxis: {        
        textStyle: {color: clr[5], bold: 'true', font: 'Lato'},
        title: 'Affluence score', 
        titleTextStyle: {color: clr[5]}, 
        format: 'percent'
    },
    height: '400',
    vAxis: {        
        textStyle: {color: clr[7], bold: 'false'},
        title: 'Percentage of women working ', 
        titleTextStyle: {color: clr[7]}, 
        textPosition: 'in'
    },
    axisTitlesPosition: 'none',
    legend: { position: 'top', maxLines: 3},
    backgroundColor: 'transparent', 
    animation: {duration: 600, easing:'out'},
    isStacked: true 
}
},{}],4:[function(require,module,exports){
var opts = module.exports = {};

opts.dvBar = 'https://docs.google.com/spreadsheets/d/' + 
        '1xyN6bdKubuLHdCub1kRUyJe8EGc3MlAAV5eE0xuM2Ls' +
        '/gviz/tq?headers=1&sheet=';

opts.dvMap = 'https://docs.google.com/spreadsheets/d/' + 
            '1ba_eRFInSd3O4u3QUvKRWkBWDtwN7FwWZe7CzVzWatw' +
            '/gviz/tq?headers=1&sheet=';

opts.dvScatter = 'https://docs.google.com/spreadsheets/d/' + 
         '1ba_eRFInSd3O4u3QUvKRWkBWDtwN7FwWZe7CzVzWatw' +
         '/gviz/tq?headers=1&sheet=';

opts.wkLines = 'https://docs.google.com/spreadsheets/d/' + 
       '1cJtaseIXPpX-O-WfWClLxXOpyWFT9nKjVoTJtRY7AOA' +
       '/gviz/tq?headers=1&sheet=';

opts.wkMap = 'https://docs.google.com/spreadsheets/d/' + 
       '1a455iKYHLA-mgKE4xCm3Oo9Brebv6i8bFdTrMhlL9GI' +
       '/gviz/tq?headers=1&sheet=';

// My Drive > Shay's Project > Shay Culpepper's Thesis Files > wkBar
opts.wkBar = 'https://docs.google.com/spreadsheets/d/' + 
       '1tyFrqSROrTxDkf9rWIEaE2yezm0YzBHPjYqeYBRCQYA' +
       '/gviz/tq?headers=1&sheet=';
},{}]},{},[1]);
