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