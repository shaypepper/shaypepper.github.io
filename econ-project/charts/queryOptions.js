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