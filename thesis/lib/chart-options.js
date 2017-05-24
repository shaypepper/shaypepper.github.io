module.exports = function(){
    var $ = {};

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

    $.dvBar = {
        style: {
            tooltip: {
                trigger: 'none'
            },
            titlePosition: 'in',
            chartArea: {
                width: '100%', 
                height: '90%'
            },
            colors: clr.slice(1,6),
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
        },
        selects: {
            'URT': {
                'Area': [
                  ["All",   "where B = 0 ", true],
                  ["Urban", "where B = 2 ", false],
                  ["Rural", "where B = 1 ", false]
                ]
            },
            'DV': {
                'Trigger': [
                  ["Leaving","select A,C ", false],
                  ["Dowry",  "select A,D ", false],
                  ["Neglect","select A,E ", false],
                  ["Cooking","select A,F ", false],
                  ["Affair", "select A,H ", false],
                  ["Any", "select A,G ", true]
                ]
            },
            'SH': {
                'X-Axis': [
                  ["By Region","reg", true],
                  ["By Religion",  "rel", false],
                  ["By Caste","cst", false]
                ]
            }
        }, 
        url: 'https://docs.google.com/spreadsheets/d/' + 
            '1xyN6bdKubuLHdCub1kRUyJe8EGc3MlAAV5eE0xuM2Ls' +
            '/gviz/tq?headers=1&sheet='
    };

    $.dvScatter = {
        url: 'https://docs.google.com/spreadsheets/d/' + 
            '1ba_eRFInSd3O4u3QUvKRWkBWDtwN7FwWZe7CzVzWatw' +
            '/gviz/tq?headers=1&sheet=',
        style: {
            titlePosition: 'in',
            chartArea: {
                width: '90%', 
                height: '90%'
            },
            colors: clr.slice(1,6),
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
                titleTextStyle: {
                    color: clr[5]
                }, 
                // viewWindow: {max: 1, min: 0},
                textPosition: 'in'
            },
            legend: 'none',
            backgroundColor: 'transparent', 
            datalessRegionColor: clr[7],
            animation: { 
                easing: 'in',  
                duration: 600
            },
            trendlines: { 0: {} }, 
            datalessRegionColor: clr[7]
        },
        selects: {
            'Q1': {
                'Areas': [
                    ['All', ' C = "Total" ', true],
                    ['Rural', ' C = "Rural" ', false],
                    ['Urban', ' C = "Urban" ', false]
                ]
            },
            'Q2': {
                'Attitudes': [
                    ['Justified? (women)', ' E ', false],
                    ['Justified? (men)', ' F ', false]
                ],
                'Actual Abuse': [
                    ['Less Severe', ' G ', false],
                    ['Severe', ' H ', false],
                    ['Any non-sexual', ' I ', false],
                    ['Sexual', ' J ', false],
                    ['Any', ' K ', true]
                ]
            },
            'SH': {
                'Trigger': [
                    ['Leaving', 'DV1', false],
                    ['Dowry', 'DV2', false],
                    ['Neglect', 'DV3', false],
                    ['Cooking', 'DV4', false],
                    ['Affair', 'DV5', false],
                    ['Any (except affair)', 'DVcomp', true]
                ]
            },
            'BH': {
                'Actual Abuse': [
                    ['With Bihar', '', false],
                    ['Without Bihar', " and B != 'IN-BR' ", true]
                ]
            },
        }
    };

    $.dvMap = {
        selects: { 
            'Q1': {
                'Areas': [
                    ['All', ' C = "Total" ', true],
                    ['Rural', ' C = "Rural" ', false],
                    ['Urban', ' C = "Urban" ', false]
                ]
            }, 
            'SH': {
                'Trigger': [
                    ['Leaving', 'DV1', false],
                    ['Dowry', 'DV2', false],
                    ['Neglect', 'DV3', false],
                    ['Cooking', 'DV4', false],
                    ['Affair', 'DV5', false],
                    ['Any', 'DVcomp', true]
                ]
            }, 
            'Q2': {
                'Perceptions': [
                    ['Common?', ' D*100 ', true]
                ], 
                'Attitudes': [
                    ['Justified? (women)', ' E*100 ', false],
                    ['Justified? (men)', ' F*100 ', false]
                ],
                'Actual Abuse': [
                    ['Less Severe', ' G*100 ', false],
                    ['Severe', ' H*100 ', false],
                    ['Any non-sexual', ' I*100 ', false],
                    ['Sexual', ' J*100 ', false],
                    ['Any', ' K*100 ', false]
                ]
            } 
        },
        url: 'https://docs.google.com/spreadsheets/d/' + 
            '1ba_eRFInSd3O4u3QUvKRWkBWDtwN7FwWZe7CzVzWatw' +
            '/gviz/tq?headers=1&sheet=',
        style: {
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
                textStyle: {
                    color: clr[5], 
                    bold: 'false'
                }
            },
            backgroundColor: clr[7],
            datalessRegionColor: clr[7]
        }
    };

    $.wkLines = {
        url: 'https://docs.google.com/spreadsheets/d/' + 
          '1cJtaseIXPpX-O-WfWClLxXOpyWFT9nKjVoTJtRY7AOA' +
          '/gviz/tq?headers=1&sheet=',
        selects: {
            Q1: {
                'Areas': [
                    ['All', ' B = 0 ', true],
                    ['Rural', ' B = 1 ', false],
                    ['Urban', ' B = 2 ', false]
                ]
            },
            S2: {
                'Type of Work': [
                    ['Any Work', "_0", false],
                    ['Farm Work', "_1", false],
                    ['Animal Work', "_2", false],
                    ['Agricultural Wage Work', "_3", true],
                    ['Other Wage Work', "_4", false],
                    ['Salary Work', "_5", false],
                    ['Household Business Work', "_6", false],
                    ['Any Outside Work', "_8", false],
                    ['Any Wage Work', "_7", false]
                ]
            },
            S1: {
                'X-Axis': [
                    ['Affluence score*',"aff", true],
                    ['Vlg domestic violence score*',"vdv", false],
                    ['Education levels',"edu",false],
                    ['Age Group',"age",false]
                ]
            },
            Q2: {
                'Line': [
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
        },
        style: {
            titlePosition: 'in',
            chartArea: {width: '100%', height: '100%'},
            curveType: 'function',
            colors: clr.slice(1,6),
            hAxis: { 
                textStyle: {
                    color: clr[5], 
                    bold: 'true', 
                    font: 'Lato'
                },
                title: 'Affluence score', 
                titleTextStyle:{
                    color: clr[5]
                }, 
                textPosition: 'in',
                format: 'short'
            },
            height: '400',
            vAxis: {
                format: 'percent',
                textStyle: {
                    color: clr[5], 
                    bold: 'true'
                },
                title: 'Percentage of women working ', 
                titleTextStyle:{
                    color: clr[5]
                }, 
                textPosition: 'in'
            },
            axisTitlesPosition: 'in',
            legend: {
                position: 'in'
            },
            backgroundColor: 'transparent', 
            animation: {
                duration: 600, 
                easing:'out'
            }
        }
    };

    $.wkMap = {
        selects: {
            "Q1": {
                'Areas': [
                    ['All', ' B = 0 ', true],
                    ['Rural', ' B = 1 ', false],
                    ['Urban', ' B = 2 ', false]
                ]
            },
            'Q2': {
                "Gender and DV Perception": [
                    ['Men and Women', ' C = 0 and D = 0 and E = 0', false],
                    ['Men', ' C = 1 and D = 0 and E = 0', false],
                    ['Women', ' C = 2 and D = 0 and E = 0', false],
                    ['All Ever-married Women', ' C = 2 and D = 2 and E = 0', true],
                    ['EM Women Who Say DV is Common', ' C = 2 and D = 2 and E = 2', false],
                    ["EM Women Who Don't Say DV is Common", 'C = 2 and D = 2 and E = 1', false]
                ]
            },
            'Q3': {
                "Type of Work": [
                    ['Any Work', " G*100 ", false],
                    ['Farm Work', " H*100 ", false, ],
                    ['Animal Work', " I*100 ", false],
                    ['Agricultural Wage Work', " J*100 ", true],
                    ['Other Wage Work', " K*100 ", false],
                    ['Salary Work', " L*100 ", false],
                    ['Household Business Work', " M*100 ", false]
                ]
            },
            'SH': {
                "No Additional Variables": [['All', 'all_q', true]],
                "Caste": [
                    ['Brahmin', "hh_caste_1", false],
                    ['OBC', "hh_caste_2",false],
                    ['SC', "hh_caste_3",false],
                    ['ST', "hh_caste_4",false],
                    ['Other', "hh_caste_5",false]
                ],
                "Children Under 5": [
                    ['Yes','nunder5_0',false],
                    ['No','nunder5_0',false]
                ],
                "Religion": [
                    ['Hindu', 'hh_religion_1',false],
                    ['Muslim', 'hh_religion_2',false],
                    ['Christian', 'hh_religion_3',false],
                    ['Other', 'hh_religion_4',false],    
                ],
                "Affluence Quintile": [
                    ['0-20% (poorest)', 'hh_aff_0',false],
                    ['20-40%', 'hh_aff_1',false],
                    ['40-60%', 'hh_aff_2',false],
                    ['60-80%', 'hh_aff_3',false],
                    ['80-100% (richest)', 'hh_aff_4',false],  
                ], 
                "Purdah (Veiling)": [
                    ['Yes, practices','purdah_0',false],  
                    ['No','purdah_1',false]
                ],                                 
                "DV trigger: Leaving": [
                    ["Doesn't Say Common",'iDV1Leaving_0',false],
                    ["Says Common",'iDV1Leaving_1',false]
                ],
                "DV trigger: Dowry": [
                    ["Doesn't Say Common",'iDV2Dowry_0',false],  
                    ["Says Common",'iDV2Dowry_1',false]
                ],
                "DV trigger: Neglect": [
                    ["Doesn't Say Common",'iDV3Neglect_0',false],
                    ["Says Common",'iDV3Neglect_1',false] 
                ],      
                "DV trigger: Cooking": [
                    ["Doesn't Say Common",'iDV4Cooking_0',false],
                    ["Says Common",'iDV4Cooking_1',false]
                ],
                "DV trigger: Affair": [
                    ["Doesn't Say Common",'iDV5Affair_0',false],
                    ["Says Common",'iDV5Affair_1',false]
                ],
                "DV trigger: Any, 1-4": [
                    ["Doesn't Say Common",'iDVComp_0',false],
                    ["Says Common",'iDVComp_1',false]
                ]
            }
        },
        style: $.dvMap.style,
        url: 'https://docs.google.com/spreadsheets/d/' + 
          '1a455iKYHLA-mgKE4xCm3Oo9Brebv6i8bFdTrMhlL9GI' +
          '/gviz/tq?headers=1&sheet='
    };

    $.wkBar = {
        url: 'https://docs.google.com/spreadsheets/d/' + 
          '1tyFrqSROrTxDkf9rWIEaE2yezm0YzBHPjYqeYBRCQYA' +
          '/gviz/tq?headers=1&sheet=',
        selects: {
            'URT': {
                'Area': [
                    ["All",   "where B = 0 ", true],
                    ["Urban", "where B = 2 ", false],
                    ["Rural", "where B = 1 ", false]
                ]
            },
            'SH': {
                'X-Axis': [
                    ["By Region","reg", true],
                    ["By Religion",  "rel", false],
                    ["By Caste","cst", false],
                    ["By Affluence Level","aff", false],
                    ["By Village DV Level","vdv", false],
                    ["By Age Group","age", false]
                ]
            },
        },
        style: {
            titlePosition: 'in',
            chartArea: {
                width: '100%', 
                height: '90%'
            },
            colors: clr.slice(1,6),
            hAxis: {        
                textStyle: {
                    color: clr[5], 
                    bold: 'true', 
                    font: 'Lato'
                },
                title: 'Affluence score', 
                titleTextStyle: {color: clr[5]}, 
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
            legend: { 
                position: 'top', 
                maxLines: 3
            },
            backgroundColor: 'transparent', 
            animation: {
                duration: 600, 
                easing:'out'
            },
            isStacked: true 
        }
    };
    return $;
};






