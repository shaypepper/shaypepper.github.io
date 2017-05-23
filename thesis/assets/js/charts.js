/*
TABLE OF CONTENTS:
HOUSEKEEPING
Call Google Charts
A few shortcuts
MASTERFUNCTION
1. Chart making function
2. Domestic Violence Bar Chart
3. Domestic Violence Map
4. Domestic Violence Scatter Plot
5. Work Line Graph
6. Work Map
7. Work Bar Chart       
*/

function myCharts() {
/******   HOUSEKEEPING   *******/
  // Call Google Charts API
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(howGreat);

  var id = X => document.getElementById(X); // Find div in HTML
  var idV = X => id(X).value; // Find value of div in HTML
  var make = X => { return document.createElement(X); } // Create an element in HTML

  // Get selected option from dropdown and turn into lowercase lettering
  var idT = X => id(X).options[id(X).selectedIndex].text.toLowerCase();

  

  // Descriptions of some triggers
  var triggers = {
    'leaving': "leaving the house without permission",
    'cooking': "cooking poorly",
    'neglect': "neglecting children or housework",
    'dowry': "not having enough dowry money",
    'affair': "suspected of having improper relations with a man",
    'any': "for any trigger except having an affair"
  }

  var clr = {
    1: '#FE6F5E',
    2: '#915C83',
    3: '#008000',
    4: '#5D8AA8',
    5: '#6F4E37',
    6: '#cc8a00',
    // 7: '#FFFAF0'
    7: 'gainsboro'
  }
    /******   MASTER FUNCTION   ***************************************/
  function howGreat() {

    // Function to create a new chart 
    var newChart = function newChart(name, type, options) {
    
      // Strange but necessary renaming "this" to ME
      var ME = this
      ME.name = name;
      
      // Create Chart Wrapper identifying type of chart
      ME.wrapper = new google.visualization.ChartWrapper({
        containerId: name + 'Chart',
        chartType: type,
        options: options
      });
      
      // Create function to draw chart
      ME.drawMe = function() {
        ME.extraChanges(); 
        ME.wrapper.draw();
      }
      
      // Give div a title and a div for a chart
      id(name).innerHTML = '<h4 class="chart-title" id="' + name + 'Title"></h4>' +
        '<div id="' + name + 'DD"></div>' + '<div id="' + name + 'Chart"></div>';
      $('#' + name).addClass('chart');
      
      ME.aSelect = function(NAME) {
      
        // Make a dropdown menu
        var X = make("SELECT");
        
        // Create ID for menu
        X.id = name + NAME;
        X.setAttribute("class", "btn btn-large");
        
        // Add dropdown menu to div
        $("#" + name + "DD").append(X);
        
        // Function to redraw chart when options change
        X.onchange = function() {
          ME.drawMe();
        }
        
      };
      // Make option groups 
      ME.optGroup = function(TITLE, SELECT, OPTS) {
        var X = make("OPTGROUP");
        X.setAttribute("label", TITLE.toUpperCase());
        $("#" + name + SELECT).append(X);
        for (Y = 0; Y < OPTS.length; Y++) {
          var Z = make("OPTION");
          Z.innerHTML = OPTS[Y][0];
          Z.setAttribute("value", OPTS[Y][1]);
          X.appendChild(Z);
          Z.selected = OPTS[Y][2];
        }
      }
    }
  
/* 1. Domestic Violence Bar Chart *********************************/
    var dvBar = new newChart('dvBar','BarChart',{
      tooltip: {
        trigger: 'none'
      },
      titlePosition: 'in',
      chartArea: {width: '100%', height: '90%'},
      colors: [clr[1],clr[2],clr[3],clr[4],clr[5],clr[6]],
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
      animation: {duration: 600, easing:'out'} 
    });
    dvBar.extraChanges = function() {
    
      // Title Change
      id("dvBarTitle").innerHTML = "Percentage of women " 
        + ((idT('dvBarURT') == 'all') ? "" : "from " + idT('dvBarURT') + " areas") + 
        " who say it is common for men to beat their wives for " + triggers[idT("dvBarDV")];
      
      // Query Change
      dvBar.wrapper.setQuery(idV("dvBarDV") + idV("dvBarURT"));
      
      // Datasource
      dvBar.wrapper.setDataSourceUrl('https://docs.google.com/spreadsheets/d/' + 
        '1xyN6bdKubuLHdCub1kRUyJe8EGc3MlAAV5eE0xuM2Ls' +
        '/gviz/tq?headers=1&sheet=' + idV("dvBarSH")
      )
    }
    // Urban/Rural/All
    dvBar.aSelect("URT");
    dvBar.optGroup("Area","URT",[
      ["All",   "where B = 0 ", true],
      ["Urban", "where B = 2 ", false],
      ["Rural", "where B = 1 ", false]
    ]);
    // Domestic Violence Trigger
    dvBar.aSelect("DV")
    dvBar.optGroup("Trigger","DV",[
      ["Leaving","select A,C ", false],
      ["Dowry",  "select A,D ", false],
      ["Neglect","select A,E ", false],
      ["Cooking","select A,F ", false],
      ["Affair", "select A,H ", false],
      ["Any", "select A,G ", true]
    ]);
    // Sorting Category (sheet from spreadsheet to use)
    dvBar.aSelect("SH")
    dvBar.optGroup("X-Axis","SH",[
      ["By Region","reg", true],
      ["By Religion",  "rel", false],
      ["By Caste","cst", false]
    ]);

  
/* 2. Domestic Violence Map ***************************************/
    var dvMap = new newChart('dvMap','GeoChart', {
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
    })
    dvMap.extraChanges = function() { 
      // Title Change
      document.getElementById("dvMapTitle").innerHTML = 'Percentage of ' +
        (idT('dvMapQ2') == 'justified? (men)' ? 'men ' : 'women ') +
        'who say men beating their wives for ' + triggers[idT("dvMapSH")] +
        ' is ' + 
        (idT('dvMapQ2') == 'common?' ? 'common' : 'justified')
        ;
      dvMap.wrapper.setQuery('select A, ' + idV("dvMapQ2") + 
        ' where ' + idV("dvMapQ1") +
        " label " +  idV("dvMapQ2") + " '' " 
        );
      dvMap.wrapper.setDataSourceUrl('https://docs.google.com/spreadsheets/d/' + 
        '1ba_eRFInSd3O4u3QUvKRWkBWDtwN7FwWZe7CzVzWatw' +
        '/gviz/tq?headers=1&sheet=' + idV('dvMapSH')
      );
    }
    dvMap.aSelect("Q1");
    dvMap.optGroup('Areas',  'Q1', [
      ['All', ' C = "Total" ', true],
      ['Rural', ' C = "Rural" ', false],
      ['Urban', ' C = "Urban" ', false]
    ]);
    dvMap.aSelect("SH");
    dvMap.optGroup('Trigger',  'SH', [
      ['Leaving', 'DV1', false],
      ['Dowry', 'DV2', false],
      ['Neglect', 'DV3', false],
      ['Cooking', 'DV4', false],
      ['Affair', 'DV5', false],
      ['Any', 'DVcomp', true]
    ]);
    dvMap.aSelect("Q2");
    dvMap.optGroup('Perceptions',  'Q2', [
      ['Common?', ' D*100 ', true]
    ]);
    dvMap.optGroup('Attitudes',  'Q2', [
      ['Justified? (women)', ' E*100 ', false],
      ['Justified? (men)', ' F*100 ', false]
    ]);
    dvMap.optGroup('Actual Abuse',  'Q2', [
      ['Less Severe', ' G*100 ', false],
      ['Severe', ' H*100 ', false],
      ['Any non-sexual', ' I*100 ', false],
      ['Sexual', ' J*100 ', false],
      ['Any', ' K*100 ', false]
    ]);

    var dvScatter = new newChart( 'dvScatter', 'ScatterChart',{
      titlePosition: 'in',
      chartArea: {width: '90%', height: '90%'},
      colors: [clr[1],clr[2],clr[3],clr[4],clr[5], clr[6]],
      hAxis: {
        textStyle: {
          color: clr[5], 
          bold: 'true', 
          font: 'Lato'
        },
        title:'Percent of women who say justified', 
        titleTextStyle:{color: clr[5]}, 
        textPosition: 'in',
        // viewWindow: {max: 1, min: 0},
        format: 'percent'
      },
      vAxis: {
        format: 'percent',
        textStyle: {
          color: clr[5], 
          bold: 'true'
        },
        title: 'Percentage of women who say common ', 
        titleTextStyle: {color: clr[5]}, 
        // viewWindow: {max: 1, min: 0},
        textPosition: 'in'},
        legend: 'none',
        backgroundColor: 'transparent', 
        datalessRegionColor: clr[7],
        animation: { easing: 'in',  duration: 600},
        trendlines: { 0: {} }, 
        datalessRegionColor: clr[7]
      });
    dvScatter.extraChanges = function() {
      id('dvScatterTitle').innerHTML = 'Percentage of ';
      dvScatter.wrapper.setQuery('select D, ' + idV("dvScatterQ2") + 
        ' where ' + idV("dvScatterQ1") + idV("dvScatterBH"));
      dvScatter.wrapper.setDataSourceUrl('https://docs.google.com/spreadsheets/d/' + 
        '1ba_eRFInSd3O4u3QUvKRWkBWDtwN7FwWZe7CzVzWatw' +
        '/gviz/tq?headers=1&sheet=' + idV('dvScatterSH')); 
    }
    dvScatter.aSelect("Q1");
    dvScatter.optGroup('Areas', 'Q1', [
      ['All', ' C = "Total" ', true],
      ['Rural', ' C = "Rural" ', false],
      ['Urban', ' C = "Urban" ', false]
    ]);
    dvScatter.aSelect("SH");
    dvScatter.optGroup('Trigger',  'SH', [
      ['Leaving', 'DV1', false],
      ['Dowry', 'DV2', false],
      ['Neglect', 'DV3', false],
      ['Cooking', 'DV4', false],
      ['Affair', 'DV5', false],
      ['Any (except affair)', 'DVcomp', true]
    ]);
    dvScatter.aSelect("Q2");
    dvScatter.optGroup('Attitudes', 'true', 'Q2', [
      ['Justified? (women)', ' E ', false],
      ['Justified? (men)', ' F ', false]
    ]);
    dvScatter.optGroup('Actual Abuse',  'Q2', [
      ['Less Severe', ' G ', false],
      ['Severe', ' H ', false],
      ['Any non-sexual', ' I ', false],
      ['Sexual', ' J ', false],
      ['Any', ' K ', true]
    ]);
    dvScatter.aSelect("BH");
    dvScatter.optGroup('Bihar?', 'BH', [
      ['With Bihar', '', false],
      ['Without Bihar', " and B != 'IN-BR' ", true]
    ]);

    var wkLines = new newChart('wkLines','LineChart',{
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
    })
    wkLines.extraChanges = function() {
      id("wkLinesTitle").innerHTML = 'Percentage of ever-married women doing ' + idT('wkLinesS2');
      wkLines.wrapper.setQuery('select A,C, ' + idV("wkLinesQ2") + ' where ' + idV("wkLinesQ1"));
      wkLines.wrapper.setDataSourceUrl('https://docs.google.com/spreadsheets/d/' + 
      '1cJtaseIXPpX-O-WfWClLxXOpyWFT9nKjVoTJtRY7AOA' +
      '/gviz/tq?headers=1&sheet=' + idV('wkLinesS1') + idV('wkLinesS2'));
    };
    wkLines.aSelect("Q1");
    wkLines.optGroup('Areas', 'Q1', [
      ['All', ' B = 0 ', true],
      ['Rural', ' B = 1 ', false],
      ['Urban', ' B = 2 ', false]
    ]);
    wkLines.aSelect('S2');
    wkLines.optGroup("Type of Work", 'S2', [
      ['Any Work', "_0", false],
      ['Farm Work', "_1", false, ],
      ['Animal Work', "_2", false],
      ['Agricultural Wage Work', "_3", true],
      ['Other Wage Work', "_4", false],
      ['Salary Work', "_5", false],
      ['Household Business Work', "_6", false],
      ['Any Outside Work', "_8", false],
      ['Any Wage Work', "_7", false]
    ]);
    wkLines.aSelect('S1');
    wkLines.optGroup("X-Axis",  'S1', [
      ['Affluence score*',"aff", true],
      ['Vlg domestic violence score*',"vdv", false],
      ['Education levels',"edu",false],
      ['Age Group',"age",false]
    ]);
    wkLines.aSelect('Q2');
    wkLines.optGroup("Lines",'Q2',[
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
      ]);
    
    var wkMap = new newChart('wkMap','GeoChart',dvMap.wrapper.getOptions())
    wkMap.extraChanges = function() {
      id("wkMapTitle").innerHTML = 'Percentage of ' + idT("wkMapQ2") + ' doing ' + idT("wkMapQ3");
      wkMap.wrapper.setQuery('select AC, ' + idV("wkMapQ3") + 
        ' where ' + idV("wkMapQ1") + 
        ' and ' + idV("wkMapQ2") + 
        " label " +  idV("wkMapQ3") + " '' " +
        " format " +  idV("wkMapQ3") + " '##.0%' " +
        " options no_format" 
      );
      wkMap.wrapper.setDataSourceUrl('https://docs.google.com/spreadsheets/d/' + 
      '1a455iKYHLA-mgKE4xCm3Oo9Brebv6i8bFdTrMhlL9GI' +
      '/gviz/tq?headers=1&sheet=' + idV('wkMapSH'));
    };
    wkMap.aSelect("Q1");
    wkMap.optGroup('Areas',  'Q1', [
      ['All', ' B = 0 ', true],
      ['Rural', ' B = 1 ', false],
      ['Urban', ' B = 2 ', false]
    ]);
    wkMap.aSelect('Q2');
    wkMap.optGroup("Gender and DV Perception",  'Q2', [
      ['Men and Women', ' C = 0 and D = 0 and E = 0', false],
      ['Men', ' C = 1 and D = 0 and E = 0', false],
      ['Women', ' C = 2 and D = 0 and E = 0', false],
      ['All Ever-married Women', ' C = 2 and D = 2 and E = 0', true],
      ['EM Women Who Say DV is Common', ' C = 2 and D = 2 and E = 2', false],
      ["EM Women Who Don't Say DV is Common", 'C = 2 and D = 2 and E = 1', false]
    ]);
    wkMap.aSelect('Q3');
    wkMap.optGroup("Type of Work", 'Q3', [
      ['Any Work', " G*100 ", false],
      ['Farm Work', " H*100 ", false, ],
      ['Animal Work', " I*100 ", false],
      ['Agricultural Wage Work', " J*100 ", true],
      ['Other Wage Work', " K*100 ", false],
      ['Salary Work', " L*100 ", false],
      ['Household Business Work', " M*100 ", false]
    ]);
    wkMap.aSelect('SH');
    wkMap.optGroup("No Additional Variables", 'SH', [['All', 'all_q', true]]);
    wkMap.optGroup("Caste", 'false', 'SH', [
      ['Brahmin', "hh_caste_1", false],
      ['OBC', "hh_caste_2",false],
      ['SC', "hh_caste_3",false],
      ['ST', "hh_caste_4",false],
      ['Other', "hh_caste_5",false]
    ]);
    wkMap.optGroup("Children Under 5",'SH',[
      ['Yes','nunder5_0',false],['No','nunder5_0',false]
    ]);
    wkMap.optGroup("Religion",'false','SH',[
      ['Hindu', 'hh_religion_1',false],
      ['Muslim', 'hh_religion_2',false],
      ['Christian', 'hh_religion_3',false],
      ['Other', 'hh_religion_4',false],    
    ]);
    wkMap.optGroup("Affluence Quintile",'SH',[
      ['0-20% (poorest)', 'hh_aff_0',false],
      ['20-40%', 'hh_aff_1',false],
      ['40-60%', 'hh_aff_2',false],
      ['60-80%', 'hh_aff_3',false],
      ['80-100% (richest)', 'hh_aff_4',false],  
    ]); 
    wkMap.optGroup("Purdah (Veiling)",    'SH',[
      ['Yes, practices','purdah_0',false],  
      ['No','purdah_1',false]
    ]);                                 
    wkMap.optGroup("DV trigger: Leaving", 'SH',[
      ["Doesn't Say Common",'iDV1Leaving_0',false],
      ["Says Common",'iDV1Leaving_1',false]
    ]);
    wkMap.optGroup("DV trigger: Dowry",   'SH',[
      ["Doesn't Say Common",'iDV2Dowry_0',false],  
      ["Says Common",'iDV2Dowry_1',false]
    ]);
    wkMap.optGroup("DV trigger: Neglect", 'SH',[
      ["Doesn't Say Common",'iDV3Neglect_0',false],
      ["Says Common",'iDV3Neglect_1',false] 
    ]);      
    wkMap.optGroup("DV trigger: Cooking", 'SH',[
      ["Doesn't Say Common",'iDV4Cooking_0',false],
      ["Says Common",'iDV4Cooking_1',false]
    ]);
    wkMap.optGroup("DV trigger: Affair",  'SH',[
      ["Doesn't Say Common",'iDV5Affair_0',false],
      ["Says Common",'iDV5Affair_1',false]
    ]);
    wkMap.optGroup("DV trigger: Any, 1-4",'SH',[
      ["Doesn't Say Common",'iDVComp_0',false],
      ["Says Common",'iDVComp_1',false]
    ]);

    var wkBar = new newChart('wkBar','BarChart',{
      titlePosition: 'in',
      chartArea: {width: '100%', height: '90%'},
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
    });
    wkBar.aSelect("URT")
    wkBar.optGroup("Area","URT",[
      ["All",   "where B = 0 ", true],
      ["Urban", "where B = 2 ", false],
      ["Rural", "where B = 1 ", false]
    ]);
    wkBar.aSelect("SH")
    wkBar.optGroup("X-Axis","SH",[
      ["By Region","reg", true],
      ["By Religion",  "rel", false],
      ["By Caste","cst", false],
      ["By Affluence Level","aff", false],
      ["By Village DV Level","vdv", false],
      ["By Age Group","age", false],
    ]);
    wkBar.extraChanges = function() {
      id("wkBarTitle").innerHTML = "Percentage of women doing outside work</h3>"
      wkBar.wrapper.setQuery('select A,C,D,E,F,G ' + idV("wkBarURT"));
      wkBar.wrapper.setDataSourceUrl('https://docs.google.com/spreadsheets/d/' + 
      '1tyFrqSROrTxDkf9rWIEaE2yezm0YzBHPjYqeYBRCQYA' +
      '/gviz/tq?headers=1&sheet=' + idV('wkBarSH'));
    }    


  wkBar.drawMe();    
  wkMap.drawMe();
  wkLines.drawMe();
  dvScatter.drawMe();
  dvMap.drawMe();
  dvBar.drawMe();
  }
}
myCharts()
