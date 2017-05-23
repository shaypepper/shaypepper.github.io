(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
var ew = require('../../index.js');
console.log('appendix', ew);
var controller = ew.lib.controller;
var view = ew.views.paper.appendix;

module.exports = function(){

    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(options){
        console.log('loading appendix');
    };

    return $;
};
},{"../../index.js":9}],3:[function(require,module,exports){
var ew = require('../../index.js');
console.log('domesticViolence');
var controller = ew.lib.controller;
var view = ew.views.paper.domesticViolence;

module.exports = function(){
    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(){
        console.log('loading dv');

    };
    return $;
};
},{"../../index.js":9}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],5:[function(require,module,exports){
var ew = require('../../index.js');

var controller = ew.lib.controller;
var view = ew.views.paper.introduction;

module.exports = function(){
    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(){
        console.log('loading intro');

    };
    return $;
};
},{"../../index.js":9}],6:[function(require,module,exports){
var ew = require('../../index.js');

var controller = ew.lib.controller;
var view = ew.views.paper.laborForceParticipation;

module.exports = function(){
    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(options){
        console.log('loading lfp');
    };

    return $;
};
},{"../../index.js":9}],7:[function(require,module,exports){
var ew = require('../../index.js');

var controller = ew.lib.controller;
var view = ew.views.paper.workDvRelationship;

module.exports = function(){
    var $ = controller(view());

    ew.lib.loadTables($);

    $.load = function(options){
        console.log('loading workDvRelationship');
    };

    return $;
};
},{"../../index.js":9}],8:[function(require,module,exports){
var ew = require('../index.js');

var controller = ew.lib.controller;
var view = ew.views.web;

var $ = module.exports = controller(view());

$.load = function(){
    jQuery('body').append($.dom);
    
};
},{"../index.js":9}],9:[function(require,module,exports){
var _ = require('underscore');
var s = require('underscore.string');

var $ = module.exports = {
    lib: {},
    views: {},
    plugins: {},
    controllers: {},
    services: {},
    managers: {}
};

$.load = function(_$) {
    if (_$) {
        _.extend($, _$);
    }

    console.log('');
    console.log('LOADING');

    var process = function(moduleName, list) {
        var module = $[moduleName];

        _.each(list, function(item) {
            //console.log('!!!item.name before', item.name);
            item.name = item.name.split(moduleName+'/')[1];

            //console.log('!!!item.name', item.name);
            if (item.name.indexOf('index') !== -1) {
                return;
            }
            var splits = item.name.split('/');
            if (splits.length > 1) {
                var ref = module;
                _.each(splits, function(split, index) {
                    split = s.camelize(split);
                    if (index === splits.length - 1) {
                        ref[split] = item.module;
                    } else {
                        ref = ref[split] || (ref[split] = {});
                    }
                });
            } else {
                module[s.camelize(item.name)] = item.module;
            }
        });
        console.log('loaded', moduleName, module);
    };

    process('lib', [{name:'./lib/controller',module:require('./lib/controller.js')},{name:'./lib/load-tables',module:require('./lib/load-tables.js')},{name:'./lib/manager',module:require('./lib/manager.js')}]);
    [{name:'index',module:require('./lib/index.js')}];

    process('views', [{name:'./views/paper/appendix',module:require('./views/paper/appendix.ejs')},{name:'./views/paper/domestic-violence',module:require('./views/paper/domestic-violence.ejs')},{name:'./views/paper/introduction',module:require('./views/paper/introduction.ejs')},{name:'./views/paper/labor-force-participation',module:require('./views/paper/labor-force-participation.ejs')},{name:'./views/paper/work-dv-relationship',module:require('./views/paper/work-dv-relationship.ejs')},{name:'./views/tables/dv-attitudes-men',module:require('./views/tables/dv-attitudes-men.ejs')},{name:'./views/tables/dv-attitudes-women',module:require('./views/tables/dv-attitudes-women.ejs')},{name:'./views/tables/dv-perception',module:require('./views/tables/dv-perception.ejs')},{name:'./views/tables/dv-reported',module:require('./views/tables/dv-reported.ejs')},{name:'./views/tables/wk-participation',module:require('./views/tables/wk-participation.ejs')},{name:'./views/web',module:require('./views/web.ejs')}]);
    [{name:'index',module:require('./views/index.js')}];

    process('plugins', []);
    [{name:'index',module:require('./plugins/index.js')}];

    process('controllers', [{name:'./controllers/sections/appendix',module:require('./controllers/sections/appendix.js')},{name:'./controllers/sections/domestic-violence',module:require('./controllers/sections/domestic-violence.js')},{name:'./controllers/sections/introduction',module:require('./controllers/sections/introduction.js')},{name:'./controllers/sections/labor-force-participation',module:require('./controllers/sections/labor-force-participation.js')},{name:'./controllers/sections/work-dv-relationship',module:require('./controllers/sections/work-dv-relationship.js')},{name:'./controllers/web',module:require('./controllers/web.js')}]);
    [{name:'index',module:require('./controllers/index.js')},{name:'sections/index',module:require('./controllers/sections/index.js')}];

    process('services', []);
    [{name:'index',module:require('./services/index.js')}];

    process('managers', [{name:'./managers/web',module:require('./managers/web.js')}]);
    [{name:'index',module:require('./managers/index.js')}];

    process('orchestrators', []);
    [];

    return $;
};
},{"./controllers/index.js":1,"./controllers/sections/appendix.js":2,"./controllers/sections/domestic-violence.js":3,"./controllers/sections/index.js":4,"./controllers/sections/introduction.js":5,"./controllers/sections/labor-force-participation.js":6,"./controllers/sections/work-dv-relationship.js":7,"./controllers/web.js":8,"./lib/controller.js":10,"./lib/index.js":11,"./lib/load-tables.js":12,"./lib/manager.js":13,"./managers/index.js":15,"./managers/web.js":16,"./plugins/index.js":89,"./services/index.js":90,"./views/index.js":91,"./views/paper/appendix.ejs":92,"./views/paper/domestic-violence.ejs":93,"./views/paper/introduction.ejs":94,"./views/paper/labor-force-participation.ejs":95,"./views/paper/work-dv-relationship.ejs":96,"./views/tables/dv-attitudes-men.ejs":97,"./views/tables/dv-attitudes-women.ejs":98,"./views/tables/dv-perception.ejs":99,"./views/tables/dv-reported.ejs":100,"./views/tables/wk-participation.ejs":101,"./views/web.ejs":102,"underscore":88,"underscore.string":42}],10:[function(require,module,exports){
var ew = require('../index.js');

module.exports = function(elOrHtml) {
    var manager = ew.lib.manager;

    var controller = manager();
    controller.dom = jQuery(elOrHtml||'<div></div>');
    return controller;
};
},{"../index.js":9}],11:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],12:[function(require,module,exports){
var ew = require('../index.js');

module.exports = function($){
    if (!$) return;
    $.dom.find('.table-holder').each(function(){
        var dom = $.dom.find(this);
        dom.append( ew.views.tables[dom.attr('data-table')]);
    });
};
},{"../index.js":9}],13:[function(require,module,exports){
var EventEmitter = require('events');

module.exports = function() {
    var manager = new EventEmitter();
    manager.trigger = manager.emit;
    return manager;
};
},{"events":103}],14:[function(require,module,exports){
var _ = require('underscore');

_.extend(window, require('./').load());

//Inject app styles
// require('./styles/web.css');

//Bootstrap app
var ew = require('.');

console.log(ew);

_.extend(window, ew);

window.addEventListener('load', function() {
    console.log(ew.managers);
    var webManager = ew.managers.web();
    webManager.load();
});
},{".":9,"./":9,"underscore":88}],15:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],16:[function(require,module,exports){
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
},{"../index.js":9,"moment":17,"underscore":88,"underscore.string":42}],17:[function(require,module,exports){
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys$1(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

},{}],18:[function(require,module,exports){
var trim = require('./trim');
var decap = require('./decapitalize');

module.exports = function camelize(str, decapitalize) {
  str = trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (decapitalize === true) {
    return decap(str);
  } else {
    return str;
  }
};

},{"./decapitalize":27,"./trim":80}],19:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function capitalize(str, lowercaseRest) {
  str = makeString(str);
  var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();

  return str.charAt(0).toUpperCase() + remainingChars;
};

},{"./helper/makeString":37}],20:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function chars(str) {
  return makeString(str).split('');
};

},{"./helper/makeString":37}],21:[function(require,module,exports){
module.exports = function chop(str, step) {
  if (str == null) return [];
  str = String(str);
  step = ~~step;
  return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

},{}],22:[function(require,module,exports){
var capitalize = require('./capitalize');
var camelize = require('./camelize');
var makeString = require('./helper/makeString');

module.exports = function classify(str) {
  str = makeString(str);
  return capitalize(camelize(str.replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
};

},{"./camelize":18,"./capitalize":19,"./helper/makeString":37}],23:[function(require,module,exports){
var trim = require('./trim');

module.exports = function clean(str) {
  return trim(str).replace(/\s\s+/g, ' ');
};

},{"./trim":80}],24:[function(require,module,exports){

var makeString = require('./helper/makeString');

var from  = "ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž",
    to    = "aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz";

from += from.toUpperCase();
to += to.toUpperCase();

to = to.split("");

// for tokens requireing multitoken output
from += "ß";
to.push('ss');


module.exports = function cleanDiacritics(str) {
    return makeString(str).replace(/.{1}/g, function(c){
      var index = from.indexOf(c);
      return index === -1 ? c : to[index];
  });
};

},{"./helper/makeString":37}],25:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function(str, substr) {
  str = makeString(str);
  substr = makeString(substr);

  if (str.length === 0 || substr.length === 0) return 0;
  
  return str.split(substr).length - 1;
};

},{"./helper/makeString":37}],26:[function(require,module,exports){
var trim = require('./trim');

module.exports = function dasherize(str) {
  return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};

},{"./trim":80}],27:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function decapitalize(str) {
  str = makeString(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};

},{"./helper/makeString":37}],28:[function(require,module,exports){
var makeString = require('./helper/makeString');

function getIndent(str) {
  var matches = str.match(/^[\s\\t]*/gm);
  var indent = matches[0].length;
  
  for (var i = 1; i < matches.length; i++) {
    indent = Math.min(matches[i].length, indent);
  }

  return indent;
}

module.exports = function dedent(str, pattern) {
  str = makeString(str);
  var indent = getIndent(str);
  var reg;

  if (indent === 0) return str;

  if (typeof pattern === 'string') {
    reg = new RegExp('^' + pattern, 'gm');
  } else {
    reg = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  }

  return str.replace(reg, '');
};

},{"./helper/makeString":37}],29:[function(require,module,exports){
var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

module.exports = function endsWith(str, ends, position) {
  str = makeString(str);
  ends = '' + ends;
  if (typeof position == 'undefined') {
    position = str.length - ends.length;
  } else {
    position = Math.min(toPositive(position), str.length) - ends.length;
  }
  return position >= 0 && str.indexOf(ends, position) === position;
};

},{"./helper/makeString":37,"./helper/toPositive":39}],30:[function(require,module,exports){
var makeString = require('./helper/makeString');
var escapeChars = require('./helper/escapeChars');

var regexString = "[";
for(var key in escapeChars) {
  regexString += key;
}
regexString += "]";

var regex = new RegExp( regexString, 'g');

module.exports = function escapeHTML(str) {

  return makeString(str).replace(regex, function(m) {
    return '&' + escapeChars[m] + ';';
  });
};

},{"./helper/escapeChars":34,"./helper/makeString":37}],31:[function(require,module,exports){
module.exports = function() {
  var result = {};

  for (var prop in this) {
    if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse|join|map)$/)) continue;
    result[prop] = this[prop];
  }

  return result;
};

},{}],32:[function(require,module,exports){
var makeString = require('./makeString');

module.exports = function adjacent(str, direction) {
  str = makeString(str);
  if (str.length === 0) {
    return '';
  }
  return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + direction);
};

},{"./makeString":37}],33:[function(require,module,exports){
var escapeRegExp = require('./escapeRegExp');

module.exports = function defaultToWhiteSpace(characters) {
  if (characters == null)
    return '\\s';
  else if (characters.source)
    return characters.source;
  else
    return '[' + escapeRegExp(characters) + ']';
};

},{"./escapeRegExp":35}],34:[function(require,module,exports){
/* We're explicitly defining the list of entities we want to escape.
nbsp is an HTML entity, but we don't want to escape all space characters in a string, hence its omission in this map.

*/
var escapeChars = {
    '¢' : 'cent',
    '£' : 'pound',
    '¥' : 'yen',
    '€': 'euro',
    '©' :'copy',
    '®' : 'reg',
    '<' : 'lt',
    '>' : 'gt',
    '"' : 'quot',
    '&' : 'amp',
    "'" : '#39'
};

module.exports = escapeChars;

},{}],35:[function(require,module,exports){
var makeString = require('./makeString');

module.exports = function escapeRegExp(str) {
  return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

},{"./makeString":37}],36:[function(require,module,exports){
/*
We're explicitly defining the list of entities that might see in escape HTML strings
*/
var htmlEntities = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: "'"
};

module.exports = htmlEntities;

},{}],37:[function(require,module,exports){
/**
 * Ensure some object is a coerced to a string
 **/
module.exports = function makeString(object) {
  if (object == null) return '';
  return '' + object;
};

},{}],38:[function(require,module,exports){
module.exports = function strRepeat(str, qty){
  if (qty < 1) return '';
  var result = '';
  while (qty > 0) {
    if (qty & 1) result += str;
    qty >>= 1, str += str;
  }
  return result;
};

},{}],39:[function(require,module,exports){
module.exports = function toPositive(number) {
  return number < 0 ? 0 : (+number || 0);
};

},{}],40:[function(require,module,exports){
var capitalize = require('./capitalize');
var underscored = require('./underscored');
var trim = require('./trim');

module.exports = function humanize(str) {
  return capitalize(trim(underscored(str).replace(/_id$/, '').replace(/_/g, ' ')));
};

},{"./capitalize":19,"./trim":80,"./underscored":82}],41:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function include(str, needle) {
  if (needle === '') return true;
  return makeString(str).indexOf(needle) !== -1;
};

},{"./helper/makeString":37}],42:[function(require,module,exports){
//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '3.2.3'

'use strict';

function s(value) {
  /* jshint validthis: true */
  if (!(this instanceof s)) return new s(value);
  this._wrapped = value;
}

s.VERSION = '3.2.3';

s.isBlank          = require('./isBlank');
s.stripTags        = require('./stripTags');
s.capitalize       = require('./capitalize');
s.decapitalize     = require('./decapitalize');
s.chop             = require('./chop');
s.trim             = require('./trim');
s.clean            = require('./clean');
s.cleanDiacritics  = require('./cleanDiacritics');
s.count            = require('./count');
s.chars            = require('./chars');
s.swapCase         = require('./swapCase');
s.escapeHTML       = require('./escapeHTML');
s.unescapeHTML     = require('./unescapeHTML');
s.splice           = require('./splice');
s.insert           = require('./insert');
s.replaceAll       = require('./replaceAll');
s.include          = require('./include');
s.join             = require('./join');
s.lines            = require('./lines');
s.dedent           = require('./dedent');
s.reverse          = require('./reverse');
s.startsWith       = require('./startsWith');
s.endsWith         = require('./endsWith');
s.pred             = require('./pred');
s.succ             = require('./succ');
s.titleize         = require('./titleize');
s.camelize         = require('./camelize');
s.underscored      = require('./underscored');
s.dasherize        = require('./dasherize');
s.classify         = require('./classify');
s.humanize         = require('./humanize');
s.ltrim            = require('./ltrim');
s.rtrim            = require('./rtrim');
s.truncate         = require('./truncate');
s.prune            = require('./prune');
s.words            = require('./words');
s.pad              = require('./pad');
s.lpad             = require('./lpad');
s.rpad             = require('./rpad');
s.lrpad            = require('./lrpad');
s.sprintf          = require('./sprintf');
s.vsprintf         = require('./vsprintf');
s.toNumber         = require('./toNumber');
s.numberFormat     = require('./numberFormat');
s.strRight         = require('./strRight');
s.strRightBack     = require('./strRightBack');
s.strLeft          = require('./strLeft');
s.strLeftBack      = require('./strLeftBack');
s.toSentence       = require('./toSentence');
s.toSentenceSerial = require('./toSentenceSerial');
s.slugify          = require('./slugify');
s.surround         = require('./surround');
s.quote            = require('./quote');
s.unquote          = require('./unquote');
s.repeat           = require('./repeat');
s.naturalCmp       = require('./naturalCmp');
s.levenshtein      = require('./levenshtein');
s.toBoolean        = require('./toBoolean');
s.exports          = require('./exports');
s.escapeRegExp     = require('./helper/escapeRegExp');
s.wrap             = require('./wrap');
s.map              = require('./map');

// Aliases
s.strip     = s.trim;
s.lstrip    = s.ltrim;
s.rstrip    = s.rtrim;
s.center    = s.lrpad;
s.rjust     = s.lpad;
s.ljust     = s.rpad;
s.contains  = s.include;
s.q         = s.quote;
s.toBool    = s.toBoolean;
s.camelcase = s.camelize;
s.mapChars  = s.map;


// Implement chaining
s.prototype = {
  value: function value() {
    return this._wrapped;
  }
};

function fn2method(key, fn) {
  if (typeof fn !== "function") return;
  s.prototype[key] = function() {
    var args = [this._wrapped].concat(Array.prototype.slice.call(arguments));
    var res = fn.apply(null, args);
    // if the result is non-string stop the chain and return the value
    return typeof res === 'string' ? new s(res) : res;
  };
}

// Copy functions to instance methods for chaining
for (var key in s) fn2method(key, s[key]);

fn2method("tap", function tap(string, fn) {
  return fn(string);
});

function prototype2method(methodName) {
  fn2method(methodName, function(context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return String.prototype[methodName].apply(context, args);
  });
}

var prototypeMethods = [
    "toUpperCase",
    "toLowerCase",
    "split",
    "replace",
    "slice",
    "substring",
    "substr",
    "concat"
];

for (var method in prototypeMethods) prototype2method(prototypeMethods[method]);


module.exports = s;

},{"./camelize":18,"./capitalize":19,"./chars":20,"./chop":21,"./classify":22,"./clean":23,"./cleanDiacritics":24,"./count":25,"./dasherize":26,"./decapitalize":27,"./dedent":28,"./endsWith":29,"./escapeHTML":30,"./exports":31,"./helper/escapeRegExp":35,"./humanize":40,"./include":41,"./insert":43,"./isBlank":44,"./join":45,"./levenshtein":46,"./lines":47,"./lpad":48,"./lrpad":49,"./ltrim":50,"./map":51,"./naturalCmp":52,"./numberFormat":53,"./pad":54,"./pred":55,"./prune":56,"./quote":57,"./repeat":58,"./replaceAll":59,"./reverse":60,"./rpad":61,"./rtrim":62,"./slugify":63,"./splice":64,"./sprintf":65,"./startsWith":66,"./strLeft":67,"./strLeftBack":68,"./strRight":69,"./strRightBack":70,"./stripTags":71,"./succ":72,"./surround":73,"./swapCase":74,"./titleize":75,"./toBoolean":76,"./toNumber":77,"./toSentence":78,"./toSentenceSerial":79,"./trim":80,"./truncate":81,"./underscored":82,"./unescapeHTML":83,"./unquote":84,"./vsprintf":85,"./words":86,"./wrap":87}],43:[function(require,module,exports){
var splice = require('./splice');

module.exports = function insert(str, i, substr) {
  return splice(str, i, 0, substr);
};

},{"./splice":64}],44:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function isBlank(str) {
  return (/^\s*$/).test(makeString(str));
};

},{"./helper/makeString":37}],45:[function(require,module,exports){
var makeString = require('./helper/makeString');
var slice = [].slice;

module.exports = function join() {
  var args = slice.call(arguments),
    separator = args.shift();

  return args.join(makeString(separator));
};

},{"./helper/makeString":37}],46:[function(require,module,exports){
var makeString = require('./helper/makeString');

/**
 * Based on the implementation here: https://github.com/hiddentao/fast-levenshtein
 */
module.exports = function levenshtein(str1, str2) {
  'use strict';
  str1 = makeString(str1);
  str2 = makeString(str2);

  // Short cut cases  
  if (str1 === str2) return 0;
  if (!str1 || !str2) return Math.max(str1.length, str2.length);

  // two rows
  var prevRow = new Array(str2.length + 1);

  // initialise previous row
  for (var i = 0; i < prevRow.length; ++i) {
    prevRow[i] = i;
  }

  // calculate current row distance from previous row
  for (i = 0; i < str1.length; ++i) {
    var nextCol = i + 1;

    for (var j = 0; j < str2.length; ++j) {
      var curCol = nextCol;

      // substution
      nextCol = prevRow[j] + ( (str1.charAt(i) === str2.charAt(j)) ? 0 : 1 );
      // insertion
      var tmp = curCol + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }
      // deletion
      tmp = prevRow[j + 1] + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    }

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  }

  return nextCol;
};

},{"./helper/makeString":37}],47:[function(require,module,exports){
module.exports = function lines(str) {
  if (str == null) return [];
  return String(str).split(/\r\n?|\n/);
};

},{}],48:[function(require,module,exports){
var pad = require('./pad');

module.exports = function lpad(str, length, padStr) {
  return pad(str, length, padStr);
};

},{"./pad":54}],49:[function(require,module,exports){
var pad = require('./pad');

module.exports = function lrpad(str, length, padStr) {
  return pad(str, length, padStr, 'both');
};

},{"./pad":54}],50:[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimLeft = String.prototype.trimLeft;

module.exports = function ltrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+'), '');
};

},{"./helper/defaultToWhiteSpace":33,"./helper/makeString":37}],51:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function(str, callback) {
  str = makeString(str);

  if (str.length === 0 || typeof callback !== 'function') return str;

  return str.replace(/./g, callback);
};

},{"./helper/makeString":37}],52:[function(require,module,exports){
module.exports = function naturalCmp(str1, str2) {
  if (str1 == str2) return 0;
  if (!str1) return -1;
  if (!str2) return 1;

  var cmpRegex = /(\.\d+|\d+|\D+)/g,
    tokens1 = String(str1).match(cmpRegex),
    tokens2 = String(str2).match(cmpRegex),
    count = Math.min(tokens1.length, tokens2.length);

  for (var i = 0; i < count; i++) {
    var a = tokens1[i],
      b = tokens2[i];

    if (a !== b) {
      var num1 = +a;
      var num2 = +b;
      if (num1 === num1 && num2 === num2) {
        return num1 > num2 ? 1 : -1;
      }
      return a < b ? -1 : 1;
    }
  }

  if (tokens1.length != tokens2.length)
    return tokens1.length - tokens2.length;

  return str1 < str2 ? -1 : 1;
};

},{}],53:[function(require,module,exports){
module.exports = function numberFormat(number, dec, dsep, tsep) {
  if (isNaN(number) || number == null) return '';

  number = number.toFixed(~~dec);
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
};

},{}],54:[function(require,module,exports){
var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

module.exports = function pad(str, length, padStr, type) {
  str = makeString(str);
  length = ~~length;

  var padlen = 0;

  if (!padStr)
    padStr = ' ';
  else if (padStr.length > 1)
    padStr = padStr.charAt(0);

  switch (type) {
    case 'right':
      padlen = length - str.length;
      return str + strRepeat(padStr, padlen);
    case 'both':
      padlen = length - str.length;
      return strRepeat(padStr, Math.ceil(padlen / 2)) + str + strRepeat(padStr, Math.floor(padlen / 2));
    default: // 'left'
      padlen = length - str.length;
      return strRepeat(padStr, padlen) + str;
  }
};

},{"./helper/makeString":37,"./helper/strRepeat":38}],55:[function(require,module,exports){
var adjacent = require('./helper/adjacent');

module.exports = function succ(str) {
  return adjacent(str, -1);
};

},{"./helper/adjacent":32}],56:[function(require,module,exports){
/**
 * _s.prune: a more elegant version of truncate
 * prune extra chars, never leaving a half-chopped word.
 * @author github.com/rwz
 */
var makeString = require('./helper/makeString');
var rtrim = require('./rtrim');

module.exports = function prune(str, length, pruneStr) {
  str = makeString(str);
  length = ~~length;
  pruneStr = pruneStr != null ? String(pruneStr) : '...';

  if (str.length <= length) return str;

  var tmpl = function(c) {
    return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
  },
    template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

  if (template.slice(template.length - 2).match(/\w\w/))
    template = template.replace(/\s*\S+$/, '');
  else
    template = rtrim(template.slice(0, template.length - 1));

  return (template + pruneStr).length > str.length ? str : str.slice(0, template.length) + pruneStr;
};

},{"./helper/makeString":37,"./rtrim":62}],57:[function(require,module,exports){
var surround = require('./surround');

module.exports = function quote(str, quoteChar) {
  return surround(str, quoteChar || '"');
};

},{"./surround":73}],58:[function(require,module,exports){
var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

module.exports = function repeat(str, qty, separator) {
  str = makeString(str);

  qty = ~~qty;

  // using faster implementation if separator is not needed;
  if (separator == null) return strRepeat(str, qty);

  // this one is about 300x slower in Google Chrome
  /*eslint no-empty: 0*/
  for (var repeat = []; qty > 0; repeat[--qty] = str) {}
  return repeat.join(separator);
};

},{"./helper/makeString":37,"./helper/strRepeat":38}],59:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function replaceAll(str, find, replace, ignorecase) {
  var flags = (ignorecase === true)?'gi':'g';
  var reg = new RegExp(find, flags);

  return makeString(str).replace(reg, replace);
};

},{"./helper/makeString":37}],60:[function(require,module,exports){
var chars = require('./chars');

module.exports = function reverse(str) {
  return chars(str).reverse().join('');
};

},{"./chars":20}],61:[function(require,module,exports){
var pad = require('./pad');

module.exports = function rpad(str, length, padStr) {
  return pad(str, length, padStr, 'right');
};

},{"./pad":54}],62:[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrimRight = String.prototype.trimRight;

module.exports = function rtrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp(characters + '+$'), '');
};

},{"./helper/defaultToWhiteSpace":33,"./helper/makeString":37}],63:[function(require,module,exports){
var trim = require('./trim');
var dasherize = require('./dasherize');
var cleanDiacritics = require("./cleanDiacritics");

module.exports = function slugify(str) {
  return trim(dasherize(cleanDiacritics(str).replace(/[^\w\s-]/g, '-').toLowerCase()), '-');
};

},{"./cleanDiacritics":24,"./dasherize":26,"./trim":80}],64:[function(require,module,exports){
var chars = require('./chars');

module.exports = function splice(str, i, howmany, substr) {
  var arr = chars(str);
  arr.splice(~~i, ~~howmany, substr);
  return arr.join('');
};

},{"./chars":20}],65:[function(require,module,exports){
// sprintf() for JavaScript 0.7-beta1
// http://www.diveintojavascript.com/projects/javascript-sprintf
//
// Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
// All rights reserved.
var strRepeat = require('./helper/strRepeat');
var toString = Object.prototype.toString;
var sprintf = (function() {
  function get_type(variable) {
    return toString.call(variable).slice(8, -1).toLowerCase();
  }

  var str_repeat = strRepeat;

  var str_format = function() {
    if (!str_format.cache.hasOwnProperty(arguments[0])) {
      str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
    }
    return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
  };

  str_format.format = function(parse_tree, argv) {
    var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
    for (i = 0; i < tree_length; i++) {
      node_type = get_type(parse_tree[i]);
      if (node_type === 'string') {
        output.push(parse_tree[i]);
      }
      else if (node_type === 'array') {
        match = parse_tree[i]; // convenience purposes only
        if (match[2]) { // keyword argument
          arg = argv[cursor];
          for (k = 0; k < match[2].length; k++) {
            if (!arg.hasOwnProperty(match[2][k])) {
              throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
            }
            arg = arg[match[2][k]];
          }
        } else if (match[1]) { // positional argument (explicit)
          arg = argv[match[1]];
        }
        else { // positional argument (implicit)
          arg = argv[cursor++];
        }

        if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
          throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
        }
        switch (match[8]) {
          case 'b': arg = arg.toString(2); break;
          case 'c': arg = String.fromCharCode(arg); break;
          case 'd': arg = parseInt(arg, 10); break;
          case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
          case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
          case 'o': arg = arg.toString(8); break;
          case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
          case 'u': arg = Math.abs(arg); break;
          case 'x': arg = arg.toString(16); break;
          case 'X': arg = arg.toString(16).toUpperCase(); break;
        }
        arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
        pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
        pad_length = match[6] - String(arg).length;
        pad = match[6] ? str_repeat(pad_character, pad_length) : '';
        output.push(match[5] ? arg + pad : pad + arg);
      }
    }
    return output.join('');
  };

  str_format.cache = {};

  str_format.parse = function(fmt) {
    var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
    while (_fmt) {
      if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
        parse_tree.push(match[0]);
      }
      else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
        parse_tree.push('%');
      }
      else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
        if (match[2]) {
          arg_names |= 1;
          var field_list = [], replacement_field = match[2], field_match = [];
          if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
            field_list.push(field_match[1]);
            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
              if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
              }
              else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
              }
              else {
                throw new Error('[_.sprintf] huh?');
              }
            }
          }
          else {
            throw new Error('[_.sprintf] huh?');
          }
          match[2] = field_list;
        }
        else {
          arg_names |= 2;
        }
        if (arg_names === 3) {
          throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
        }
        parse_tree.push(match);
      }
      else {
        throw new Error('[_.sprintf] huh?');
      }
      _fmt = _fmt.substring(match[0].length);
    }
    return parse_tree;
  };

  return str_format;
})();

module.exports = sprintf;

},{"./helper/strRepeat":38}],66:[function(require,module,exports){
var makeString = require('./helper/makeString');
var toPositive = require('./helper/toPositive');

module.exports = function startsWith(str, starts, position) {
  str = makeString(str);
  starts = '' + starts;
  position = position == null ? 0 : Math.min(toPositive(position), str.length);
  return str.lastIndexOf(starts, position) === position;
};

},{"./helper/makeString":37,"./helper/toPositive":39}],67:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strLeft(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};

},{"./helper/makeString":37}],68:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strLeftBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = str.lastIndexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};

},{"./helper/makeString":37}],69:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strRight(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};

},{"./helper/makeString":37}],70:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function strRightBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.lastIndexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};

},{"./helper/makeString":37}],71:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function stripTags(str) {
  return makeString(str).replace(/<\/?[^>]+>/g, '');
};

},{"./helper/makeString":37}],72:[function(require,module,exports){
var adjacent = require('./helper/adjacent');

module.exports = function succ(str) {
  return adjacent(str, 1);
};

},{"./helper/adjacent":32}],73:[function(require,module,exports){
module.exports = function surround(str, wrapper) {
  return [wrapper, str, wrapper].join('');
};

},{}],74:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function swapCase(str) {
  return makeString(str).replace(/\S/g, function(c) {
    return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
  });
};

},{"./helper/makeString":37}],75:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function titleize(str) {
  return makeString(str).toLowerCase().replace(/(?:^|\s|-)\S/g, function(c) {
    return c.toUpperCase();
  });
};

},{"./helper/makeString":37}],76:[function(require,module,exports){
var trim = require('./trim');

function boolMatch(s, matchers) {
  var i, matcher, down = s.toLowerCase();
  matchers = [].concat(matchers);
  for (i = 0; i < matchers.length; i += 1) {
    matcher = matchers[i];
    if (!matcher) continue;
    if (matcher.test && matcher.test(s)) return true;
    if (matcher.toLowerCase() === down) return true;
  }
}

module.exports = function toBoolean(str, trueValues, falseValues) {
  if (typeof str === "number") str = "" + str;
  if (typeof str !== "string") return !!str;
  str = trim(str);
  if (boolMatch(str, trueValues || ["true", "1"])) return true;
  if (boolMatch(str, falseValues || ["false", "0"])) return false;
};

},{"./trim":80}],77:[function(require,module,exports){
module.exports = function toNumber(num, precision) {
  if (num == null) return 0;
  var factor = Math.pow(10, isFinite(precision) ? precision : 0);
  return Math.round(num * factor) / factor;
};

},{}],78:[function(require,module,exports){
var rtrim = require('./rtrim');

module.exports = function toSentence(array, separator, lastSeparator, serial) {
  separator = separator || ', ';
  lastSeparator = lastSeparator || ' and ';
  var a = array.slice(),
    lastMember = a.pop();

  if (array.length > 2 && serial) lastSeparator = rtrim(separator) + lastSeparator;

  return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
};

},{"./rtrim":62}],79:[function(require,module,exports){
var toSentence = require('./toSentence');

module.exports = function toSentenceSerial(array, sep, lastSep) {
  return toSentence(array, sep, lastSep, true);
};

},{"./toSentence":78}],80:[function(require,module,exports){
var makeString = require('./helper/makeString');
var defaultToWhiteSpace = require('./helper/defaultToWhiteSpace');
var nativeTrim = String.prototype.trim;

module.exports = function trim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
};

},{"./helper/defaultToWhiteSpace":33,"./helper/makeString":37}],81:[function(require,module,exports){
var makeString = require('./helper/makeString');

module.exports = function truncate(str, length, truncateStr) {
  str = makeString(str);
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};

},{"./helper/makeString":37}],82:[function(require,module,exports){
var trim = require('./trim');

module.exports = function underscored(str) {
  return trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};

},{"./trim":80}],83:[function(require,module,exports){
var makeString = require('./helper/makeString');
var htmlEntities = require('./helper/htmlEntities');

module.exports = function unescapeHTML(str) {
  return makeString(str).replace(/\&([^;]+);/g, function(entity, entityCode) {
    var match;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
      return String.fromCharCode(parseInt(match[1], 16));
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#(\d+)$/)) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
};

},{"./helper/htmlEntities":36,"./helper/makeString":37}],84:[function(require,module,exports){
module.exports = function unquote(str, quoteChar) {
  quoteChar = quoteChar || '"';
  if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
    return str.slice(1, str.length - 1);
  else return str;
};

},{}],85:[function(require,module,exports){
var sprintf = require('./sprintf');

module.exports = function vsprintf(fmt, argv) {
  argv.unshift(fmt);
  return sprintf.apply(null, argv);
};

},{"./sprintf":65}],86:[function(require,module,exports){
var isBlank = require('./isBlank');
var trim = require('./trim');

module.exports = function words(str, delimiter) {
  if (isBlank(str)) return [];
  return trim(str, delimiter).split(delimiter || /\s+/);
};

},{"./isBlank":44,"./trim":80}],87:[function(require,module,exports){
// Wrap
// wraps a string by a certain width

var makeString = require('./helper/makeString');

module.exports = function wrap(str, options){
	str = makeString(str);

	options = options || {};

	var width = options.width || 75;
	var seperator = options.seperator || '\n';
	var cut = options.cut || false;
	var preserveSpaces = options.preserveSpaces || false;
	var trailingSpaces = options.trailingSpaces || false;

  var result;

	if(width <= 0){
		return str;
	}

	else if(!cut){

		var words = str.split(" ");
		var current_column = 0;
		result = "";

		while(words.length > 0){
			
			// if adding a space and the next word would cause this line to be longer than width...
			if(1 + words[0].length + current_column > width){
				//start a new line if this line is not already empty
				if(current_column > 0){
					// add a space at the end of the line is preserveSpaces is true
					if (preserveSpaces){
						result += ' ';
						current_column++;
					}
					// fill the rest of the line with spaces if trailingSpaces option is true
					else if(trailingSpaces){
						while(current_column < width){
							result += ' ';
							current_column++;
						}						
					}
					//start new line
					result += seperator;
					current_column = 0;
				}
			}

			// if not at the begining of the line, add a space in front of the word
			if(current_column > 0){
				result += " ";
				current_column++;
			}

			// tack on the next word, update current column, a pop words array
			result += words[0];
			current_column += words[0].length;
			words.shift();

		}

		// fill the rest of the line with spaces if trailingSpaces option is true
		if(trailingSpaces){
			while(current_column < width){
				result += ' ';
				current_column++;
			}						
		}

		return result;

	}

	else {

		var index = 0;
		result = "";

		// walk through each character and add seperators where appropriate
		while(index < str.length){
			if(index % width == 0 && index > 0){
				result += seperator;
			}
			result += str.charAt(index);
			index++;
		}

		// fill the rest of the line with spaces if trailingSpaces option is true
		if(trailingSpaces){
			while(index % width > 0){
				result += ' ';
				index++;
			}						
		}
		
		return result;
	}
};

},{"./helper/makeString":37}],88:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],89:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],90:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],91:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],92:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n    <!-- Appendix for Shay's Thesis -->\n    <h2>Appendix</h2>        \n\n    <!-- Footnotes will populate automatically from the script in footnotes.js --> \n    <section id=\"footnotes\">\n        <h3>References</h3>\n        <ol id=\"Footnotes\"></ol>\n    </section>\n\n    <!--  -->\n    <section id=\"code\"> \n        <h3>Source Code</h3>\n        <!-- <?php include 'sourcecode.php'; ?> -->\n    </section>\n\n</div>\n"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n    <!-- Appendix for Shay's Thesis -->\n    <h2>Appendix</h2>        \n\n    <!-- Footnotes will populate automatically from the script in footnotes.js --> \n    <section id=\"footnotes\">\n        <h3>References</h3>\n        <ol id=\"Footnotes\"></ol>\n    </section>\n\n    <!--  -->\n    <section id=\"code\"> \n        <h3>Source Code</h3>\n        <!-- <?php include 'sourcecode.php'; ?> -->\n    </section>\n\n</div>\n")
    ; __line = 18
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],93:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n    <h2>Domestic Violence</h2>\n\n    <section id=\"perceived-dv\"> \n        <h3>Perceived Domestic Violence</h3>\n        <div id=\"dvBar\"></div>\n        <div class=\"table-holder\" data-table=\"dvPerception\"></div>\n    </section><!-- #perceived-dv -->\n\n    <section id=\"reported-dv\">\n        <h3>Reported Domestic Violence</h3>\n        <div class=\"table-holder\" data-table=\"dvReported\"></div>\n    </section><!-- #reported-dv -->\n      \n    <section id=\"dv-attitudes\">\n        <h3>Attitudes about Domestic Violence</h3>\n        <div class=\"table-holder\" data-table=\"dvAttitudesWomen\"></div>\n        <div class=\"table-holder\" data-table=\"dvAttitudesMen\"></div>\n    </section><!-- #dv-attitudes -->  \n\n    <section id=\"dv-comparison\">\n        <h3>Comparison of Reports, Attitudes, and Perception</h3>\n        <div id=\"dvMap\"></div>\n        <div id=\"dvScatter\"></div>\n    </section><!-- #dv-comparison -->\n</div>\n"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n    <h2>Domestic Violence</h2>\n\n    <section id=\"perceived-dv\"> \n        <h3>Perceived Domestic Violence</h3>\n        <div id=\"dvBar\"></div>\n        <div class=\"table-holder\" data-table=\"dvPerception\"></div>\n    </section><!-- #perceived-dv -->\n\n    <section id=\"reported-dv\">\n        <h3>Reported Domestic Violence</h3>\n        <div class=\"table-holder\" data-table=\"dvReported\"></div>\n    </section><!-- #reported-dv -->\n      \n    <section id=\"dv-attitudes\">\n        <h3>Attitudes about Domestic Violence</h3>\n        <div class=\"table-holder\" data-table=\"dvAttitudesWomen\"></div>\n        <div class=\"table-holder\" data-table=\"dvAttitudesMen\"></div>\n    </section><!-- #dv-attitudes -->  \n\n    <section id=\"dv-comparison\">\n        <h3>Comparison of Reports, Attitudes, and Perception</h3>\n        <div id=\"dvMap\"></div>\n        <div id=\"dvScatter\"></div>\n    </section><!-- #dv-comparison -->\n</div>\n")
    ; __line = 27
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],94:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n    <h2>Introduction</h2>\n    <p>It is hard to remain objective when discussing intimate partner violence (IPV). \n    It is a complicated<a class=\"footnote\">AhmedGhosh2004</a>, heart-breaking, and often deeply personal subject. \n    Intimate partner violence raises questions of public health, human rights, sociology, psychology, and for this paper, economic well-being.\n    Every society must grapple with how to prevent and stop it, and how to properly support not only direct victims but the communities that are indirectly affected.\n    In order to do this properly, we must understand the implications of these actions. </p>\n\n    <p>India has IPV rates among the world's worst. \n    In 2011, TrustLaw, a service of the Thomas Reuters Foundation, \n    found India to be the worst of all G20 nations for women citing high rates of early marriage \n    and long-held views of IPV justification. </p>\n\n    <p> Simultaneously, as an emerging economy, India is becoming more industrialized every year. \n    This means that work is moving outside the home and away from agricultural work. \n    As women find growing opportunities, women will selectively them. \n    We seek to understand why women choose to work outside the home and\n    specifically how perception of IPV might contribute to the decision. \n    This paper examines labor-force participation of ever-married women in India \n    based on whether they perceive IPV to be common in their community. </p>\n</div>\n"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n    <h2>Introduction</h2>\n    <p>It is hard to remain objective when discussing intimate partner violence (IPV). \n    It is a complicated<a class=\"footnote\">AhmedGhosh2004</a>, heart-breaking, and often deeply personal subject. \n    Intimate partner violence raises questions of public health, human rights, sociology, psychology, and for this paper, economic well-being.\n    Every society must grapple with how to prevent and stop it, and how to properly support not only direct victims but the communities that are indirectly affected.\n    In order to do this properly, we must understand the implications of these actions. </p>\n\n    <p>India has IPV rates among the world's worst. \n    In 2011, TrustLaw, a service of the Thomas Reuters Foundation, \n    found India to be the worst of all G20 nations for women citing high rates of early marriage \n    and long-held views of IPV justification. </p>\n\n    <p> Simultaneously, as an emerging economy, India is becoming more industrialized every year. \n    This means that work is moving outside the home and away from agricultural work. \n    As women find growing opportunities, women will selectively them. \n    We seek to understand why women choose to work outside the home and\n    specifically how perception of IPV might contribute to the decision. \n    This paper examines labor-force participation of ever-married women in India \n    based on whether they perceive IPV to be common in their community. </p>\n</div>\n")
    ; __line = 22
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],95:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n    <h2>Labor-force participation</h2>\n    <p>\n      Lalalalalalalal\n    </p>\n    <section id=\"agricultural-work\">\n        <h3>Agricultural Work</h3>\n        <p>\n            <div id=\"wkBar\"></div>\n        </p>\n        <p>\n          ...lalalalala...\n        </p>   \n    </section><!--end of #agricultural-work-->\n    <section id=\"salary-work\">\n        <h3>Salary Work</h3>\n        <div id=\"wkMap\"></div>\n        <p>\n\n        </p>\n    </section><!--salary-work-->\n</div>\n"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n    <h2>Labor-force participation</h2>\n    <p>\n      Lalalalalalalal\n    </p>\n    <section id=\"agricultural-work\">\n        <h3>Agricultural Work</h3>\n        <p>\n            <div id=\"wkBar\"></div>\n        </p>\n        <p>\n          ...lalalalala...\n        </p>   \n    </section><!--end of #agricultural-work-->\n    <section id=\"salary-work\">\n        <h3>Salary Work</h3>\n        <div id=\"wkMap\"></div>\n        <p>\n\n        </p>\n    </section><!--salary-work-->\n</div>\n")
    ; __line = 23
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],96:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n    <h2>Domestic Violence and Work</h2>\n\n    <section id=\"previous-models\">\n        <h3>Previous Models</h3>\n        <h4>Bargaining Framework</h4>\n        <h4></h4>\n        <h4>Exposure Theory</h4>\n    </section>\n\n    <section id=\"empowerment-risk\">\n        <h3>Women's Economic Empowerment as Risk</h3>\n        <p>\n        </p>\n    </section>\n\n    <section id=\"findings\">\n        <div id=\"wkLines\"></div>\n        <div class=\"chart\">\n        <!-- <?php ?> -->\n        </div>\n      \n    </section>\n\n</div>\n"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n    <h2>Domestic Violence and Work</h2>\n\n    <section id=\"previous-models\">\n        <h3>Previous Models</h3>\n        <h4>Bargaining Framework</h4>\n        <h4></h4>\n        <h4>Exposure Theory</h4>\n    </section>\n\n    <section id=\"empowerment-risk\">\n        <h3>Women's Economic Empowerment as Risk</h3>\n        <p>\n        </p>\n    </section>\n\n    <section id=\"findings\">\n        <div id=\"wkLines\"></div>\n        <div class=\"chart\">\n        <!-- <?php ?> -->\n        </div>\n      \n    </section>\n\n</div>\n")
    ; __line = 26
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],97:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "\n<button type=\"button\" class=\"btn btn-block\" data-toggle=\"modal\" data-target=\"#dvAttitudesMen\">\n Table: Domestic Violence Attitudes (men)\n</button>\n<div class=\"modal fade\" id=\"dvAttitudesMen\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dvAttitudesMenLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"dvAttitudesMenLabel\">Domestic Violence Attitudes (men)</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she goes out without telling him\">Leaving</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she argues with him\">Arguing</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she neglects the children\">Neglect</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she burns the food\">Burning Food</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she refuses to have sex with him\">Refusing sex</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Any</span></td>\n</tr>\n <tr><td colspan=\"8\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.181</td><td>.2</td><td>.186</td><td>.093</td><td>.047</td><td>.302</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.087</td><td>.131</td><td>.154</td><td>.042</td><td>.034</td><td>.224</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.193</td><td>.238</td><td>.203</td><td>.099</td><td>.071</td><td>.35</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.24</td><td>.279</td><td>.317</td><td>.148</td><td>.094</td><td>.458</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.303</td><td>.279</td><td>.423</td><td>.13</td><td>.077</td><td>.53</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.335</td><td>.323</td><td>.274</td><td>.176</td><td>.096</td><td>.502</td>\n </tr>\n \n <tr><td colspan=\"8\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.333</td><td>.464</td><td>.291</td><td>.179</td><td>.153</td><td>.522</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.304</td><td>.33</td><td>.339</td><td>.167</td><td>.095</td><td>.5</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.247</td><td>.278</td><td>.283</td><td>.122</td><td>.073</td><td>.437</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.233</td><td>.246</td><td>.285</td><td>.125</td><td>.072</td><td>.416</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.215</td><td>.246</td><td>.272</td><td>.114</td><td>.067</td><td>.395</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.225</td><td>.23</td><td>.264</td><td>.108</td><td>.071</td><td>.388</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.212</td><td>.227</td><td>.251</td><td>.109</td><td>.071</td><td>.379</td>\n </tr>\n \n <tr><td colspan=\"8\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.232</td><td>.252</td><td>.278</td><td>.122</td><td>.071</td><td>.411</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.249</td><td>.26</td><td>.278</td><td>.108</td><td>.082</td><td>.421</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.189</td><td>.202</td><td>.313</td><td>.094</td><td>.074</td><td>.388</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.157</td><td>.173</td><td>.174</td><td>.089</td><td>.061</td><td>.287</td>\n </tr>\n \n <tr><td colspan=\"8\">CASTE</td></tr>\n <tr><td></td><td>SC</td>\n   <td>.25</td><td>.286</td><td>.296</td><td>.144</td><td>.089</td><td>.444</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.281</td><td>.314</td><td>.324</td><td>.148</td><td>.113</td><td>.488</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.268</td><td>.275</td><td>.314</td><td>.133</td><td>.065</td><td>.452</td>\n </tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.111</td><td>.126</td><td>.134</td><td>.056</td><td>.017</td><td>.228</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.158</td><td>.178</td><td>.2</td><td>.076</td><td>.059</td><td>.31</td>\n </tr>\n \n <tr><td colspan=\"8\">URBANITY</td></tr>\n <tr><td></td><td>Urban</td>\n   <td>.158</td><td>.173</td><td>.208</td><td>.072</td><td>.043</td><td>.308</td>\n </tr>\n <tr><td></td><td>Rural</td>\n   <td>.266</td><td>.286</td><td>.308</td><td>.141</td><td>.086</td><td>.456</td>\n </tr>\n \n <tr><td colspan=\"8\">EDUCATION</td></tr>\n <tr><td></td><td>None</td>\n   <td>.332</td><td>.339</td><td>.35</td><td>.17</td><td>.105</td><td>.526</td>\n </tr>\n <tr><td></td><td>Primary</td>\n   <td>.283</td><td>.297</td><td>.336</td><td>.139</td><td>.091</td><td>.483</td>\n </tr>\n <tr><td></td><td>Secondary</td>\n   <td>.193</td><td>.218</td><td>.247</td><td>.101</td><td>.058</td><td>.366</td>\n </tr>\n <tr><td></td><td>Higher</td>\n   <td>.068</td><td>.092</td><td>.116</td><td>.038</td><td>.022</td><td>.18</td>\n </tr>\n \n <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.32</td><td>.335</td><td>.328</td><td>.18</td><td>.106</td><td>.508</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.298</td><td>.322</td><td>.334</td><td>.153</td><td>.092</td><td>.495</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.266</td><td>.269</td><td>.33</td><td>.124</td><td>.079</td><td>.464</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.187</td><td>.213</td><td>.254</td><td>.092</td><td>.06</td><td>.373</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.101</td><td>.126</td><td>.145</td><td>.054</td><td>.03</td><td>.223</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("\n<button type=\"button\" class=\"btn btn-block\" data-toggle=\"modal\" data-target=\"#dvAttitudesMen\">\n Table: Domestic Violence Attitudes (men)\n</button>\n<div class=\"modal fade\" id=\"dvAttitudesMen\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dvAttitudesMenLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"dvAttitudesMenLabel\">Domestic Violence Attitudes (men)</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she goes out without telling him\">Leaving</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she argues with him\">Arguing</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she neglects the children\">Neglect</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she burns the food\">Burning Food</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she refuses to have sex with him\">Refusing sex</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Any</span></td>\n</tr>\n <tr><td colspan=\"8\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.181</td><td>.2</td><td>.186</td><td>.093</td><td>.047</td><td>.302</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.087</td><td>.131</td><td>.154</td><td>.042</td><td>.034</td><td>.224</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.193</td><td>.238</td><td>.203</td><td>.099</td><td>.071</td><td>.35</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.24</td><td>.279</td><td>.317</td><td>.148</td><td>.094</td><td>.458</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.303</td><td>.279</td><td>.423</td><td>.13</td><td>.077</td><td>.53</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.335</td><td>.323</td><td>.274</td><td>.176</td><td>.096</td><td>.502</td>\n </tr>\n \n <tr><td colspan=\"8\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.333</td><td>.464</td><td>.291</td><td>.179</td><td>.153</td><td>.522</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.304</td><td>.33</td><td>.339</td><td>.167</td><td>.095</td><td>.5</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.247</td><td>.278</td><td>.283</td><td>.122</td><td>.073</td><td>.437</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.233</td><td>.246</td><td>.285</td><td>.125</td><td>.072</td><td>.416</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.215</td><td>.246</td><td>.272</td><td>.114</td><td>.067</td><td>.395</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.225</td><td>.23</td><td>.264</td><td>.108</td><td>.071</td><td>.388</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.212</td><td>.227</td><td>.251</td><td>.109</td><td>.071</td><td>.379</td>\n </tr>\n \n <tr><td colspan=\"8\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.232</td><td>.252</td><td>.278</td><td>.122</td><td>.071</td><td>.411</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.249</td><td>.26</td><td>.278</td><td>.108</td><td>.082</td><td>.421</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.189</td><td>.202</td><td>.313</td><td>.094</td><td>.074</td><td>.388</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.157</td><td>.173</td><td>.174</td><td>.089</td><td>.061</td><td>.287</td>\n </tr>\n \n <tr><td colspan=\"8\">CASTE</td></tr>\n <tr><td></td><td>SC</td>\n   <td>.25</td><td>.286</td><td>.296</td><td>.144</td><td>.089</td><td>.444</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.281</td><td>.314</td><td>.324</td><td>.148</td><td>.113</td><td>.488</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.268</td><td>.275</td><td>.314</td><td>.133</td><td>.065</td><td>.452</td>\n </tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.111</td><td>.126</td><td>.134</td><td>.056</td><td>.017</td><td>.228</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.158</td><td>.178</td><td>.2</td><td>.076</td><td>.059</td><td>.31</td>\n </tr>\n \n <tr><td colspan=\"8\">URBANITY</td></tr>\n <tr><td></td><td>Urban</td>\n   <td>.158</td><td>.173</td><td>.208</td><td>.072</td><td>.043</td><td>.308</td>\n </tr>\n <tr><td></td><td>Rural</td>\n   <td>.266</td><td>.286</td><td>.308</td><td>.141</td><td>.086</td><td>.456</td>\n </tr>\n \n <tr><td colspan=\"8\">EDUCATION</td></tr>\n <tr><td></td><td>None</td>\n   <td>.332</td><td>.339</td><td>.35</td><td>.17</td><td>.105</td><td>.526</td>\n </tr>\n <tr><td></td><td>Primary</td>\n   <td>.283</td><td>.297</td><td>.336</td><td>.139</td><td>.091</td><td>.483</td>\n </tr>\n <tr><td></td><td>Secondary</td>\n   <td>.193</td><td>.218</td><td>.247</td><td>.101</td><td>.058</td><td>.366</td>\n </tr>\n <tr><td></td><td>Higher</td>\n   <td>.068</td><td>.092</td><td>.116</td><td>.038</td><td>.022</td><td>.18</td>\n </tr>\n \n <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.32</td><td>.335</td><td>.328</td><td>.18</td><td>.106</td><td>.508</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.298</td><td>.322</td><td>.334</td><td>.153</td><td>.092</td><td>.495</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.266</td><td>.269</td><td>.33</td><td>.124</td><td>.079</td><td>.464</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.187</td><td>.213</td><td>.254</td><td>.092</td><td>.06</td><td>.373</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.101</td><td>.126</td><td>.145</td><td>.054</td><td>.03</td><td>.223</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>")
    ; __line = 134
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],98:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n<button type=\"button\" class=\"btn btn-block\"data-toggle=\"modal\" data-target=\"#dvAttitudesWomen\">\n Table: Domestic Violence Attitudes (women)\n</button>\n<div class=\"modal fade\" id=\"dvAttitudesWomen\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dvAttitudesWomenLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"dvAttitudesWomenLabel\">Domestic Violence Attitudes (women)</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she goes out without telling him\">Leaving</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she argues with him\">Arguing</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she neglects the children\">Neglect</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she burns the food\">Burning Food</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she refuses to have sex with him\">Refusing sex</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Any</span></td>\n</tr>\n <tr><td colspan=\"8\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.252</td><td>.253</td><td>.275</td><td>.172</td><td>.097</td><td>.393</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.229</td><td>.241</td><td>.327</td><td>.127</td><td>.094</td><td>.385</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.261</td><td>.305</td><td>.297</td><td>.173</td><td>.129</td><td>.452</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.252</td><td>.304</td><td>.362</td><td>.226</td><td>.165</td><td>.485</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.497</td><td>.425</td><td>.578</td><td>.305</td><td>.244</td><td>.669</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.219</td><td>.265</td><td>.238</td><td>.184</td><td>.125</td><td>.418</td>\n </tr>\n \n <tr><td colspan=\"8\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.321</td><td>.352</td><td>.399</td><td>.238</td><td>.163</td><td>.526</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.317</td><td>.315</td><td>.389</td><td>.213</td><td>.15</td><td>.5</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.323</td><td>.316</td><td>.389</td><td>.221</td><td>.16</td><td>.503</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.329</td><td>.317</td><td>.387</td><td>.221</td><td>.161</td><td>.508</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.344</td><td>.34</td><td>.401</td><td>.232</td><td>.171</td><td>.516</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.338</td><td>.332</td><td>.4</td><td>.238</td><td>.177</td><td>.524</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.356</td><td>.349</td><td>.402</td><td>.248</td><td>.189</td><td>.517</td>\n </tr>\n \n <tr><td colspan=\"8\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.335</td><td>.33</td><td>.399</td><td>.231</td><td>.166</td><td>.515</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.302</td><td>.307</td><td>.35</td><td>.193</td><td>.148</td><td>.474</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.404</td><td>.36</td><td>.494</td><td>.232</td><td>.176</td><td>.599</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.247</td><td>.26</td><td>.333</td><td>.208</td><td>.168</td><td>.461</td>\n </tr>\n \n <tr><td colspan=\"8\">CASTE</td></tr>\n <tr><td></td><td>SC</td>\n   <td>.366</td><td>.353</td><td>.42</td><td>.25</td><td>.18</td><td>.547</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.341</td><td>.363</td><td>.405</td><td>.253</td><td>.198</td><td>.532</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.361</td><td>.346</td><td>.425</td><td>.244</td><td>.173</td><td>.54</td>\n </tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.191</td><td>.171</td><td>.215</td><td>.119</td><td>.057</td><td>.312</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.258</td><td>.273</td><td>.329</td><td>.178</td><td>.133</td><td>.443</td>\n </tr>\n \n <tr><td colspan=\"8\">URBANITY</td></tr>\n <tr><td></td><td>Urban</td>\n   <td>.253</td><td>.243</td><td>.336</td><td>.154</td><td>.105</td><td>.425</td>\n </tr>\n <tr><td></td><td>Rural</td>\n   <td>.37</td><td>.369</td><td>.423</td><td>.263</td><td>.194</td><td>.554</td>\n </tr>\n \n <tr><td colspan=\"8\">EDUCATION</td></tr>\n <tr><td></td><td>None</td>\n   <td>.397</td><td>.39</td><td>.427</td><td>.281</td><td>.211</td><td>.571</td>\n </tr>\n <tr><td></td><td>Primary</td>\n   <td>.364</td><td>.355</td><td>.444</td><td>.243</td><td>.176</td><td>.56</td>\n </tr>\n <tr><td></td><td>Secondary</td>\n   <td>.265</td><td>.264</td><td>.367</td><td>.172</td><td>.117</td><td>.458</td>\n </tr>\n <tr><td></td><td>Higher</td>\n   <td>.089</td><td>.101</td><td>.153</td><td>.056</td><td>.035</td><td>.205</td>\n </tr>\n \n <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.369</td><td>.384</td><td>.407</td><td>.267</td><td>.197</td><td>.568</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.395</td><td>.394</td><td>.437</td><td>.284</td><td>.209</td><td>.571</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.398</td><td>.375</td><td>.456</td><td>.269</td><td>.198</td><td>.577</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.327</td><td>.31</td><td>.41</td><td>.208</td><td>.149</td><td>.516</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.173</td><td>.183</td><td>.261</td><td>.113</td><td>.077</td><td>.333</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>\n</div>"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n<button type=\"button\" class=\"btn btn-block\"data-toggle=\"modal\" data-target=\"#dvAttitudesWomen\">\n Table: Domestic Violence Attitudes (women)\n</button>\n<div class=\"modal fade\" id=\"dvAttitudesWomen\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dvAttitudesWomenLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"dvAttitudesWomenLabel\">Domestic Violence Attitudes (women)</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she goes out without telling him\">Leaving</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she argues with him\">Arguing</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she neglects the children\">Neglect</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she burns the food\">Burning Food</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"wife beating justified if she refuses to have sex with him\">Refusing sex</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Any</span></td>\n</tr>\n <tr><td colspan=\"8\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.252</td><td>.253</td><td>.275</td><td>.172</td><td>.097</td><td>.393</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.229</td><td>.241</td><td>.327</td><td>.127</td><td>.094</td><td>.385</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.261</td><td>.305</td><td>.297</td><td>.173</td><td>.129</td><td>.452</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.252</td><td>.304</td><td>.362</td><td>.226</td><td>.165</td><td>.485</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.497</td><td>.425</td><td>.578</td><td>.305</td><td>.244</td><td>.669</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.219</td><td>.265</td><td>.238</td><td>.184</td><td>.125</td><td>.418</td>\n </tr>\n \n <tr><td colspan=\"8\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.321</td><td>.352</td><td>.399</td><td>.238</td><td>.163</td><td>.526</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.317</td><td>.315</td><td>.389</td><td>.213</td><td>.15</td><td>.5</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.323</td><td>.316</td><td>.389</td><td>.221</td><td>.16</td><td>.503</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.329</td><td>.317</td><td>.387</td><td>.221</td><td>.161</td><td>.508</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.344</td><td>.34</td><td>.401</td><td>.232</td><td>.171</td><td>.516</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.338</td><td>.332</td><td>.4</td><td>.238</td><td>.177</td><td>.524</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.356</td><td>.349</td><td>.402</td><td>.248</td><td>.189</td><td>.517</td>\n </tr>\n \n <tr><td colspan=\"8\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.335</td><td>.33</td><td>.399</td><td>.231</td><td>.166</td><td>.515</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.302</td><td>.307</td><td>.35</td><td>.193</td><td>.148</td><td>.474</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.404</td><td>.36</td><td>.494</td><td>.232</td><td>.176</td><td>.599</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.247</td><td>.26</td><td>.333</td><td>.208</td><td>.168</td><td>.461</td>\n </tr>\n \n <tr><td colspan=\"8\">CASTE</td></tr>\n <tr><td></td><td>SC</td>\n   <td>.366</td><td>.353</td><td>.42</td><td>.25</td><td>.18</td><td>.547</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.341</td><td>.363</td><td>.405</td><td>.253</td><td>.198</td><td>.532</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.361</td><td>.346</td><td>.425</td><td>.244</td><td>.173</td><td>.54</td>\n </tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.191</td><td>.171</td><td>.215</td><td>.119</td><td>.057</td><td>.312</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.258</td><td>.273</td><td>.329</td><td>.178</td><td>.133</td><td>.443</td>\n </tr>\n \n <tr><td colspan=\"8\">URBANITY</td></tr>\n <tr><td></td><td>Urban</td>\n   <td>.253</td><td>.243</td><td>.336</td><td>.154</td><td>.105</td><td>.425</td>\n </tr>\n <tr><td></td><td>Rural</td>\n   <td>.37</td><td>.369</td><td>.423</td><td>.263</td><td>.194</td><td>.554</td>\n </tr>\n \n <tr><td colspan=\"8\">EDUCATION</td></tr>\n <tr><td></td><td>None</td>\n   <td>.397</td><td>.39</td><td>.427</td><td>.281</td><td>.211</td><td>.571</td>\n </tr>\n <tr><td></td><td>Primary</td>\n   <td>.364</td><td>.355</td><td>.444</td><td>.243</td><td>.176</td><td>.56</td>\n </tr>\n <tr><td></td><td>Secondary</td>\n   <td>.265</td><td>.264</td><td>.367</td><td>.172</td><td>.117</td><td>.458</td>\n </tr>\n <tr><td></td><td>Higher</td>\n   <td>.089</td><td>.101</td><td>.153</td><td>.056</td><td>.035</td><td>.205</td>\n </tr>\n \n <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.369</td><td>.384</td><td>.407</td><td>.267</td><td>.197</td><td>.568</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.395</td><td>.394</td><td>.437</td><td>.284</td><td>.209</td><td>.571</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.398</td><td>.375</td><td>.456</td><td>.269</td><td>.198</td><td>.577</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.327</td><td>.31</td><td>.41</td><td>.208</td><td>.149</td><td>.516</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.173</td><td>.183</td><td>.261</td><td>.113</td><td>.077</td><td>.333</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>\n</div>")
    ; __line = 135
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],99:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n    <button \n        type=\"button\" \n        class=\"btn btn-block\"\n        data-toggle=\"modal\" \n        data-target=\"#dvPerception\">\n        Table: Perception of Domestic Violence (women)\n    </button>\n    <div id=\"dvPerception\"\n        class=\"modal fade\"\n        tabindex=\"-1\" \n        role=\"dialog\" \n        aria-labelledby=\"dvPerceptionLabel\">\n        <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button \n                        type=\"button\"\n                        class=\"close\" \n                        data-dismiss=\"modal\" \n                        aria-label=\"Close\">\n                        <span aria-hidden=\"true\">x</span>\n                    </button>\n                    <h4 class=\"modal-title\" id=\"dvPerceptionLabel\">Perception of Domestic Violence (women)</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <table class=\"table table-responsive table-condensed\">\n                        <tr>\n                            <td></td>\n                            <td></td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv1: Leaving, no permit \">Leaving\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv2: Too Little Dowry \">Dowry\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv3: Neglecting the House \">Neglect\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv4: Bad Cooking \">Cooking\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv5: Male Relations \">Affair\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"Women who said yes to any of the other triggers, except affair.\">Any\n                                </span>\n                            </td>\n                        </tr>\n                        <tr><td colspan=\"8\">AGE</td></tr>\n                        <tr>\n                            <td></td>\n                            <td>15-19</td>\n                            <td>.48</td>\n                            <td>.33</td>\n                            <td>.398</td>\n                            <td>.354</td>\n                            <td>.849</td>\n                            <td>.574</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>20-24</td>\n                            <td>.421</td>\n                            <td>.307</td>\n                            <td>.351</td>\n                            <td>.293</td>\n                            <td>.848</td>\n                            <td>.537</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>25-29</td>\n                            <td>.406</td>\n                            <td>.301</td>\n                            <td>.354</td>\n                            <td>.291</td>\n                            <td>.831</td>\n                            <td>.524</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>30-34</td>\n                            <td>.378</td>\n                            <td>.286</td>\n                            <td>.336</td>\n                            <td>.285</td>\n                            <td>.826</td>\n                            <td>.491</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>35-39</td>\n                            <td>.385</td>\n                            <td>.295</td>\n                            <td>.366</td>\n                            <td>.307</td>\n                            <td>.821</td>\n                            <td>.516</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>40-44</td>\n                            <td>.354</td>\n                            <td>.261</td>\n                            <td>.323</td>\n                            <td>.28</td>\n                            <td>.801</td>\n                            <td>.469</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>45-49</td>\n                            <td>.347</td>\n                            <td>.258</td>\n                            <td>.317</td>\n                            <td>.268</td>\n                            <td>.812</td>\n                            <td>.462</td>\n                        </tr>\n                        <tr><td colspan=\"8\">REGION</td></tr>\n                        <tr><td></td><td>Northern</td>\n                            <td>.346</td><td>.205</td><td>.205</td><td>.172</td><td>.956</td><td>.432</td>\n                        </tr>\n                        <tr><td></td><td>Northeastern</td>\n                            <td>.077</td><td>.09</td><td>.124</td><td>.067</td><td>.191</td><td>.17</td>\n                        </tr>\n                        <tr><td></td><td>Eastern</td>\n                            <td>.454</td><td>.396</td><td>.425</td><td>.388</td><td>.755</td><td>.557</td>\n                        </tr>\n                        <tr><td></td><td>Western</td>\n                            <td>.541</td><td>.321</td><td>.463</td><td>.382</td><td>.915</td><td>.661</td>\n                        </tr>\n                        <tr><td></td><td>Southern</td>\n                            <td>.267</td><td>.288</td><td>.339</td><td>.271</td><td>.792</td><td>.45</td>\n                        </tr>\n                        <tr><td></td><td>Central</td>\n                            <td>.388</td><td>.179</td><td>.282</td><td>.235</td><td>.767</td><td>.43</td>\n                        </tr>\n     \n                        <tr><td colspan=\"8\">RELIGION</td></tr>\n                        <tr><td></td><td>Hindu</td>\n                            <td>.391</td><td>.292</td><td>.346</td><td>.292</td><td>.828</td><td>.508</td>\n                        </tr>\n                        <tr><td></td><td>Muslim</td>\n                            <td>.421</td><td>.298</td><td>.36</td><td>.308</td><td>.799</td><td>.528</td>\n                        </tr>\n                        <tr><td></td><td>Christian</td>\n                            <td>.141</td><td>.203</td><td>.276</td><td>.211</td><td>.675</td><td>.368</td>\n                        </tr>\n                        <tr><td></td><td>Other</td>\n                            <td>.353</td><td>.224</td><td>.344</td><td>.278</td><td>.924</td><td>.456</td>\n                        </tr>\n     \n                        <tr><td colspan=\"8\">CASTE</td></tr>\n                        <tr><td></td><td>Brahmin</td>\n                            <td>.289</td><td>.228</td><td>.224</td><td>.191</td><td>.793</td><td>.382</td>\n                        </tr>\n                        <tr><td></td><td>OBC</td>\n                            <td>.404</td><td>.309</td><td>.368</td><td>.315</td><td>.856</td><td>.532</td>\n                        </tr>\n                        <tr><td></td><td>SC</td>\n                            <td>.426</td><td>.321</td><td>.368</td><td>.309</td><td>.833</td><td>.543</td>\n                        </tr>\n                        <tr><td></td><td>ST</td>\n                            <td>.399</td><td>.229</td><td>.351</td><td>.302</td><td>.771</td><td>.514</td>\n                        </tr>\n                        <tr><td></td><td>Other</td>\n                            <td>.34</td><td>.255</td><td>.311</td><td>.251</td><td>.786</td><td>.448</td>\n                        </tr>\n     \n                        <tr><td colspan=\"8\">URBANITY</td></tr>\n                        <tr><td></td><td>Rural</td>\n                            <td>.426</td><td>.312</td><td>.371</td><td>.319</td><td>.839</td><td>.543</td>\n                        </tr>\n                        <tr><td></td><td>Urban</td>\n                            <td>.289</td><td>.227</td><td>.282</td><td>.221</td><td>.787</td><td>.409</td>\n                        </tr>\n     \n                         <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n                         <tr><td></td><td>Poorest</td>\n                           <td>.45</td><td>.341</td><td>.388</td><td>.355</td><td>.858</td><td>.56</td>\n                         </tr>\n                         <tr><td></td><td>Poorer</td>\n                           <td>.432</td><td>.32</td><td>.385</td><td>.323</td><td>.821</td><td>.552</td>\n                         </tr>\n                         <tr><td></td><td>Middle</td>\n                           <td>.396</td><td>.285</td><td>.347</td><td>.29</td><td>.836</td><td>.518</td>\n                         </tr>\n                         <tr><td></td><td>Richer</td>\n                           <td>.347</td><td>.262</td><td>.331</td><td>.262</td><td>.824</td><td>.481</td>\n                         </tr>\n                         <tr><td></td><td>Richest</td>\n                           <td>.276</td><td>.209</td><td>.251</td><td>.198</td><td>.771</td><td>.376</td>\n                         </tr>\n                         \n                         <tr><td colspan=\"8\">EDUCATION</td></tr>\n                         <tr><td></td><td>xi2: No school</td>\n                           <td>.445</td><td>.326</td><td>.382</td><td>.332</td><td>.87</td><td>.562</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Primary</td>\n                           <td>.386</td><td>.276</td><td>.336</td><td>.278</td><td>.824</td><td>.493</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Upper Primary</td>\n                           <td>.339</td><td>.266</td><td>.324</td><td>.263</td><td>.782</td><td>.463</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Secondary</td>\n                           <td>.261</td><td>.197</td><td>.256</td><td>.202</td><td>.735</td><td>.384</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Higher</td>\n                           <td>.182</td><td>.156</td><td>.206</td><td>.152</td><td>.69</td><td>.304</td>\n                         </tr>\n     \n    </table>\n                </div><!-- end of .modal-body -->\n            </div><!-- end of modal content -->\n        </div><!-- end of modal-dialog -->\n    </div><!-- end of #dvPerception -->\n</div>"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n    <button \n        type=\"button\" \n        class=\"btn btn-block\"\n        data-toggle=\"modal\" \n        data-target=\"#dvPerception\">\n        Table: Perception of Domestic Violence (women)\n    </button>\n    <div id=\"dvPerception\"\n        class=\"modal fade\"\n        tabindex=\"-1\" \n        role=\"dialog\" \n        aria-labelledby=\"dvPerceptionLabel\">\n        <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button \n                        type=\"button\"\n                        class=\"close\" \n                        data-dismiss=\"modal\" \n                        aria-label=\"Close\">\n                        <span aria-hidden=\"true\">x</span>\n                    </button>\n                    <h4 class=\"modal-title\" id=\"dvPerceptionLabel\">Perception of Domestic Violence (women)</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <table class=\"table table-responsive table-condensed\">\n                        <tr>\n                            <td></td>\n                            <td></td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv1: Leaving, no permit \">Leaving\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv2: Too Little Dowry \">Dowry\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv3: Neglecting the House \">Neglect\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv4: Bad Cooking \">Cooking\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"xidv5: Male Relations \">Affair\n                                </span>\n                            </td>\n                            <td>\n                                <span \n                                    data-toggle=\"tooltip\" \n                                    data-placement=\"top\" \n                                    title=\"Women who said yes to any of the other triggers, except affair.\">Any\n                                </span>\n                            </td>\n                        </tr>\n                        <tr><td colspan=\"8\">AGE</td></tr>\n                        <tr>\n                            <td></td>\n                            <td>15-19</td>\n                            <td>.48</td>\n                            <td>.33</td>\n                            <td>.398</td>\n                            <td>.354</td>\n                            <td>.849</td>\n                            <td>.574</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>20-24</td>\n                            <td>.421</td>\n                            <td>.307</td>\n                            <td>.351</td>\n                            <td>.293</td>\n                            <td>.848</td>\n                            <td>.537</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>25-29</td>\n                            <td>.406</td>\n                            <td>.301</td>\n                            <td>.354</td>\n                            <td>.291</td>\n                            <td>.831</td>\n                            <td>.524</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>30-34</td>\n                            <td>.378</td>\n                            <td>.286</td>\n                            <td>.336</td>\n                            <td>.285</td>\n                            <td>.826</td>\n                            <td>.491</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>35-39</td>\n                            <td>.385</td>\n                            <td>.295</td>\n                            <td>.366</td>\n                            <td>.307</td>\n                            <td>.821</td>\n                            <td>.516</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>40-44</td>\n                            <td>.354</td>\n                            <td>.261</td>\n                            <td>.323</td>\n                            <td>.28</td>\n                            <td>.801</td>\n                            <td>.469</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>45-49</td>\n                            <td>.347</td>\n                            <td>.258</td>\n                            <td>.317</td>\n                            <td>.268</td>\n                            <td>.812</td>\n                            <td>.462</td>\n                        </tr>\n                        <tr><td colspan=\"8\">REGION</td></tr>\n                        <tr><td></td><td>Northern</td>\n                            <td>.346</td><td>.205</td><td>.205</td><td>.172</td><td>.956</td><td>.432</td>\n                        </tr>\n                        <tr><td></td><td>Northeastern</td>\n                            <td>.077</td><td>.09</td><td>.124</td><td>.067</td><td>.191</td><td>.17</td>\n                        </tr>\n                        <tr><td></td><td>Eastern</td>\n                            <td>.454</td><td>.396</td><td>.425</td><td>.388</td><td>.755</td><td>.557</td>\n                        </tr>\n                        <tr><td></td><td>Western</td>\n                            <td>.541</td><td>.321</td><td>.463</td><td>.382</td><td>.915</td><td>.661</td>\n                        </tr>\n                        <tr><td></td><td>Southern</td>\n                            <td>.267</td><td>.288</td><td>.339</td><td>.271</td><td>.792</td><td>.45</td>\n                        </tr>\n                        <tr><td></td><td>Central</td>\n                            <td>.388</td><td>.179</td><td>.282</td><td>.235</td><td>.767</td><td>.43</td>\n                        </tr>\n     \n                        <tr><td colspan=\"8\">RELIGION</td></tr>\n                        <tr><td></td><td>Hindu</td>\n                            <td>.391</td><td>.292</td><td>.346</td><td>.292</td><td>.828</td><td>.508</td>\n                        </tr>\n                        <tr><td></td><td>Muslim</td>\n                            <td>.421</td><td>.298</td><td>.36</td><td>.308</td><td>.799</td><td>.528</td>\n                        </tr>\n                        <tr><td></td><td>Christian</td>\n                            <td>.141</td><td>.203</td><td>.276</td><td>.211</td><td>.675</td><td>.368</td>\n                        </tr>\n                        <tr><td></td><td>Other</td>\n                            <td>.353</td><td>.224</td><td>.344</td><td>.278</td><td>.924</td><td>.456</td>\n                        </tr>\n     \n                        <tr><td colspan=\"8\">CASTE</td></tr>\n                        <tr><td></td><td>Brahmin</td>\n                            <td>.289</td><td>.228</td><td>.224</td><td>.191</td><td>.793</td><td>.382</td>\n                        </tr>\n                        <tr><td></td><td>OBC</td>\n                            <td>.404</td><td>.309</td><td>.368</td><td>.315</td><td>.856</td><td>.532</td>\n                        </tr>\n                        <tr><td></td><td>SC</td>\n                            <td>.426</td><td>.321</td><td>.368</td><td>.309</td><td>.833</td><td>.543</td>\n                        </tr>\n                        <tr><td></td><td>ST</td>\n                            <td>.399</td><td>.229</td><td>.351</td><td>.302</td><td>.771</td><td>.514</td>\n                        </tr>\n                        <tr><td></td><td>Other</td>\n                            <td>.34</td><td>.255</td><td>.311</td><td>.251</td><td>.786</td><td>.448</td>\n                        </tr>\n     \n                        <tr><td colspan=\"8\">URBANITY</td></tr>\n                        <tr><td></td><td>Rural</td>\n                            <td>.426</td><td>.312</td><td>.371</td><td>.319</td><td>.839</td><td>.543</td>\n                        </tr>\n                        <tr><td></td><td>Urban</td>\n                            <td>.289</td><td>.227</td><td>.282</td><td>.221</td><td>.787</td><td>.409</td>\n                        </tr>\n     \n                         <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n                         <tr><td></td><td>Poorest</td>\n                           <td>.45</td><td>.341</td><td>.388</td><td>.355</td><td>.858</td><td>.56</td>\n                         </tr>\n                         <tr><td></td><td>Poorer</td>\n                           <td>.432</td><td>.32</td><td>.385</td><td>.323</td><td>.821</td><td>.552</td>\n                         </tr>\n                         <tr><td></td><td>Middle</td>\n                           <td>.396</td><td>.285</td><td>.347</td><td>.29</td><td>.836</td><td>.518</td>\n                         </tr>\n                         <tr><td></td><td>Richer</td>\n                           <td>.347</td><td>.262</td><td>.331</td><td>.262</td><td>.824</td><td>.481</td>\n                         </tr>\n                         <tr><td></td><td>Richest</td>\n                           <td>.276</td><td>.209</td><td>.251</td><td>.198</td><td>.771</td><td>.376</td>\n                         </tr>\n                         \n                         <tr><td colspan=\"8\">EDUCATION</td></tr>\n                         <tr><td></td><td>xi2: No school</td>\n                           <td>.445</td><td>.326</td><td>.382</td><td>.332</td><td>.87</td><td>.562</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Primary</td>\n                           <td>.386</td><td>.276</td><td>.336</td><td>.278</td><td>.824</td><td>.493</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Upper Primary</td>\n                           <td>.339</td><td>.266</td><td>.324</td><td>.263</td><td>.782</td><td>.463</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Secondary</td>\n                           <td>.261</td><td>.197</td><td>.256</td><td>.202</td><td>.735</td><td>.384</td>\n                         </tr>\n                         <tr><td></td><td>xi2: Higher</td>\n                           <td>.182</td><td>.156</td><td>.206</td><td>.152</td><td>.69</td><td>.304</td>\n                         </tr>\n     \n    </table>\n                </div><!-- end of .modal-body -->\n            </div><!-- end of modal content -->\n        </div><!-- end of modal-dialog -->\n    </div><!-- end of #dvPerception -->\n</div>")
    ; __line = 243
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],100:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n<button type=\"button\" class=\"btn btn-block\"data-toggle=\"modal\" data-target=\"#dvReported\">\n Table: Reported Domestic Violence\n</button>\n<div class=\"modal fade\" id=\"dvReported\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dvReportedLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"dvReportedLabel\">Reported Domestic Violence</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"ever any emotional violence\">Emotional</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"experienced any less severe violence (d105a-d)\">Less Severe</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"experienced any severe violence (d105e-g)\">Severe</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"experienced any sexual violence (d105h-i)\">Sexual</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Any Abuse</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Non-Sexual</span></td>\n</tr>\n <tr><td colspan=\"8\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.139</td><td>.386</td><td>.136</td><td>.082</td><td>.397</td><td>.387</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.137</td><td>.332</td><td>.075</td><td>.15</td><td>.371</td><td>.334</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.162</td><td>.393</td><td>.139</td><td>.183</td><td>.439</td><td>.394</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.178</td><td>.314</td><td>.082</td><td>.055</td><td>.33</td><td>.318</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.109</td><td>.304</td><td>.111</td><td>.03</td><td>.31</td><td>.308</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.202</td><td>.45</td><td>.095</td><td>.113</td><td>.461</td><td>.45</td>\n </tr>\n \n <tr><td colspan=\"8\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.108</td><td>.234</td><td>.066</td><td>.083</td><td>.257</td><td>.234</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.128</td><td>.323</td><td>.098</td><td>.079</td><td>.345</td><td>.326</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.144</td><td>.353</td><td>.117</td><td>.078</td><td>.369</td><td>.354</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.159</td><td>.37</td><td>.122</td><td>.079</td><td>.384</td><td>.371</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.144</td><td>.374</td><td>.127</td><td>.074</td><td>.388</td><td>.376</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.151</td><td>.352</td><td>.12</td><td>.07</td><td>.367</td><td>.357</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.153</td><td>.356</td><td>.125</td><td>.068</td><td>.361</td><td>.358</td>\n </tr>\n \n <tr><td colspan=\"8\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.142</td><td>.343</td><td>.113</td><td>.073</td><td>.358</td><td>.345</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.15</td><td>.394</td><td>.131</td><td>.111</td><td>.416</td><td>.394</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.141</td><td>.322</td><td>.127</td><td>.06</td><td>.333</td><td>.327</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.17</td><td>.314</td><td>.079</td><td>.048</td><td>.328</td><td>.322</td>\n </tr>\n \n <tr><td colspan=\"8\">CASTE</td></tr>\n <tr><td></td><td>SC</td>\n   <td>.179</td><td>.45</td><td>.169</td><td>.106</td><td>.469</td><td>.454</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.188</td><td>.392</td><td>.127</td><td>.092</td><td>.408</td><td>.394</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.133</td><td>.342</td><td>.111</td><td>.063</td><td>.355</td><td>.345</td>\n </tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.118</td><td>.287</td><td>.062</td><td>.073</td><td>.298</td><td>.287</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.125</td><td>.272</td><td>.079</td><td>.065</td><td>.288</td><td>.272</td>\n </tr>\n \n <tr><td colspan=\"8\">URBANITY</td></tr>\n <tr><td></td><td>Urban</td>\n   <td>.111</td><td>.288</td><td>.087</td><td>.052</td><td>.298</td><td>.289</td>\n </tr>\n <tr><td></td><td>Rural</td>\n   <td>.16</td><td>.377</td><td>.128</td><td>.089</td><td>.396</td><td>.38</td>\n </tr>\n \n <tr><td colspan=\"8\">EDUCATION</td></tr>\n <tr><td></td><td>None</td>\n   <td>.179</td><td>.443</td><td>.157</td><td>.103</td><td>.459</td><td>.445</td>\n </tr>\n <tr><td></td><td>Primary</td>\n   <td>.144</td><td>.365</td><td>.121</td><td>.07</td><td>.383</td><td>.37</td>\n </tr>\n <tr><td></td><td>Secondary</td>\n   <td>.109</td><td>.249</td><td>.067</td><td>.053</td><td>.265</td><td>.25</td>\n </tr>\n <tr><td></td><td>Higher</td>\n   <td>.048</td><td>.089</td><td>.016</td><td>.015</td><td>.096</td><td>.09</td>\n </tr>\n \n <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.193</td><td>.469</td><td>.163</td><td>.122</td><td>.491</td><td>.471</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.185</td><td>.431</td><td>.152</td><td>.099</td><td>.45</td><td>.434</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.16</td><td>.381</td><td>.137</td><td>.075</td><td>.397</td><td>.384</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.115</td><td>.313</td><td>.092</td><td>.063</td><td>.327</td><td>.316</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.074</td><td>.164</td><td>.034</td><td>.032</td><td>.174</td><td>.165</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>\n</div>"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n<button type=\"button\" class=\"btn btn-block\"data-toggle=\"modal\" data-target=\"#dvReported\">\n Table: Reported Domestic Violence\n</button>\n<div class=\"modal fade\" id=\"dvReported\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dvReportedLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"dvReportedLabel\">Reported Domestic Violence</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"ever any emotional violence\">Emotional</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"experienced any less severe violence (d105a-d)\">Less Severe</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"experienced any severe violence (d105e-g)\">Severe</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"experienced any sexual violence (d105h-i)\">Sexual</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Any Abuse</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"\">Non-Sexual</span></td>\n</tr>\n <tr><td colspan=\"8\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.139</td><td>.386</td><td>.136</td><td>.082</td><td>.397</td><td>.387</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.137</td><td>.332</td><td>.075</td><td>.15</td><td>.371</td><td>.334</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.162</td><td>.393</td><td>.139</td><td>.183</td><td>.439</td><td>.394</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.178</td><td>.314</td><td>.082</td><td>.055</td><td>.33</td><td>.318</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.109</td><td>.304</td><td>.111</td><td>.03</td><td>.31</td><td>.308</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.202</td><td>.45</td><td>.095</td><td>.113</td><td>.461</td><td>.45</td>\n </tr>\n \n <tr><td colspan=\"8\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.108</td><td>.234</td><td>.066</td><td>.083</td><td>.257</td><td>.234</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.128</td><td>.323</td><td>.098</td><td>.079</td><td>.345</td><td>.326</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.144</td><td>.353</td><td>.117</td><td>.078</td><td>.369</td><td>.354</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.159</td><td>.37</td><td>.122</td><td>.079</td><td>.384</td><td>.371</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.144</td><td>.374</td><td>.127</td><td>.074</td><td>.388</td><td>.376</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.151</td><td>.352</td><td>.12</td><td>.07</td><td>.367</td><td>.357</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.153</td><td>.356</td><td>.125</td><td>.068</td><td>.361</td><td>.358</td>\n </tr>\n \n <tr><td colspan=\"8\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.142</td><td>.343</td><td>.113</td><td>.073</td><td>.358</td><td>.345</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.15</td><td>.394</td><td>.131</td><td>.111</td><td>.416</td><td>.394</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.141</td><td>.322</td><td>.127</td><td>.06</td><td>.333</td><td>.327</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.17</td><td>.314</td><td>.079</td><td>.048</td><td>.328</td><td>.322</td>\n </tr>\n \n <tr><td colspan=\"8\">CASTE</td></tr>\n <tr><td></td><td>SC</td>\n   <td>.179</td><td>.45</td><td>.169</td><td>.106</td><td>.469</td><td>.454</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.188</td><td>.392</td><td>.127</td><td>.092</td><td>.408</td><td>.394</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.133</td><td>.342</td><td>.111</td><td>.063</td><td>.355</td><td>.345</td>\n </tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.118</td><td>.287</td><td>.062</td><td>.073</td><td>.298</td><td>.287</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.125</td><td>.272</td><td>.079</td><td>.065</td><td>.288</td><td>.272</td>\n </tr>\n \n <tr><td colspan=\"8\">URBANITY</td></tr>\n <tr><td></td><td>Urban</td>\n   <td>.111</td><td>.288</td><td>.087</td><td>.052</td><td>.298</td><td>.289</td>\n </tr>\n <tr><td></td><td>Rural</td>\n   <td>.16</td><td>.377</td><td>.128</td><td>.089</td><td>.396</td><td>.38</td>\n </tr>\n \n <tr><td colspan=\"8\">EDUCATION</td></tr>\n <tr><td></td><td>None</td>\n   <td>.179</td><td>.443</td><td>.157</td><td>.103</td><td>.459</td><td>.445</td>\n </tr>\n <tr><td></td><td>Primary</td>\n   <td>.144</td><td>.365</td><td>.121</td><td>.07</td><td>.383</td><td>.37</td>\n </tr>\n <tr><td></td><td>Secondary</td>\n   <td>.109</td><td>.249</td><td>.067</td><td>.053</td><td>.265</td><td>.25</td>\n </tr>\n <tr><td></td><td>Higher</td>\n   <td>.048</td><td>.089</td><td>.016</td><td>.015</td><td>.096</td><td>.09</td>\n </tr>\n \n <tr><td colspan=\"8\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.193</td><td>.469</td><td>.163</td><td>.122</td><td>.491</td><td>.471</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.185</td><td>.431</td><td>.152</td><td>.099</td><td>.45</td><td>.434</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.16</td><td>.381</td><td>.137</td><td>.075</td><td>.397</td><td>.384</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.115</td><td>.313</td><td>.092</td><td>.063</td><td>.327</td><td>.316</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.074</td><td>.164</td><td>.034</td><td>.032</td><td>.174</td><td>.165</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>\n</div>")
    ; __line = 135
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],101:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n<button type=\"button\" class=\"btn btn-block\"data-toggle=\"modal\" data-target=\"#wkParticipation\">\n Table: Work Participation (women)\n</button>\n<div class=\"modal fade\" id=\"wkParticipation\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"wkParticipationLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"wkParticipationLabel\">Work Participation (women)</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH 4-7 Any work\">Any</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH9  4.28 Family farm work\">Farm</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH9  5.5 Animal care\">Animal</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH11 6.3 Ag wage labour\">Agricultural Wage</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH11 6.3 Nonag wage labour\">Non-Agricultural Wage</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH11 6.,7 Salaried position\">Salary</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH12 7.7 Family business work\">HH Business</span></td>\n</tr>\n <tr><td colspan=\"9\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.378</td><td>.13</td><td>.203</td><td>.114</td><td>.044</td><td>.004</td><td>.016</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.384</td><td>.148</td><td>.201</td><td>.109</td><td>.041</td><td>.019</td><td>.019</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.478</td><td>.174</td><td>.254</td><td>.14</td><td>.05</td><td>.037</td><td>.03</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.585</td><td>.22</td><td>.32</td><td>.171</td><td>.057</td><td>.06</td><td>.04</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.615</td><td>.227</td><td>.348</td><td>.201</td><td>.062</td><td>.054</td><td>.04</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.59</td><td>.225</td><td>.349</td><td>.169</td><td>.054</td><td>.047</td><td>.041</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.586</td><td>.235</td><td>.349</td><td>.166</td><td>.048</td><td>.053</td><td>.042</td>\n </tr>\n \n <tr><td colspan=\"9\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.513</td><td>.194</td><td>.429</td><td>.044</td><td>.021</td><td>.031</td><td>.025</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.415</td><td>.242</td><td>.283</td><td>.006</td><td>.026</td><td>.03</td><td>.023</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.5</td><td>.163</td><td>.333</td><td>.105</td><td>.048</td><td>.033</td><td>.028</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.548</td><td>.265</td><td>.273</td><td>.183</td><td>.041</td><td>.047</td><td>.037</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.541</td><td>.13</td><td>.167</td><td>.241</td><td>.073</td><td>.07</td><td>.048</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.717</td><td>.391</td><td>.348</td><td>.377</td><td>.128</td><td>.03</td><td>.036</td>\n </tr>\n \n <tr><td colspan=\"9\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.556</td><td>.218</td><td>.305</td><td>.179</td><td>.053</td><td>.045</td><td>.034</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.412</td><td>.099</td><td>.269</td><td>.04</td><td>.046</td><td>.031</td><td>.039</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.449</td><td>.107</td><td>.186</td><td>.124</td><td>.026</td><td>.09</td><td>.031</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.57</td><td>.226</td><td>.356</td><td>.137</td><td>.08</td><td>.042</td><td>.042</td>\n </tr>\n \n <tr><td colspan=\"9\">CASTE</td></tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.331</td><td>.128</td><td>.215</td><td>.009</td><td>.015</td><td>.049</td><td>.03</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.55</td><td>.224</td><td>.309</td><td>.149</td><td>.048</td><td>.042</td><td>.042</td>\n </tr>\n <tr><td></td><td>SC</td>\n   <td>.592</td><td>.15</td><td>.312</td><td>.246</td><td>.082</td><td>.043</td><td>.023</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.77</td><td>.419</td><td>.403</td><td>.372</td><td>.11</td><td>.043</td><td>.028</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.435</td><td>.161</td><td>.259</td><td>.064</td><td>.023</td><td>.049</td><td>.036</td>\n </tr>\n \n <tr><td colspan=\"9\">URBANITY</td></tr>\n <tr><td></td><td>Rural</td>\n   <td>.659</td><td>.277</td><td>.399</td><td>.215</td><td>.058</td><td>.029</td><td>.031</td>\n </tr>\n <tr><td></td><td>Urban</td>\n   <td>.226</td><td>.011</td><td>.047</td><td>.018</td><td>.039</td><td>.085</td><td>.045</td>\n </tr>\n \n <tr><td colspan=\"9\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.733</td><td>.24</td><td>.398</td><td>.339</td><td>.105</td><td>.034</td><td>.024</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.669</td><td>.266</td><td>.393</td><td>.24</td><td>.077</td><td>.03</td><td>.03</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.544</td><td>.236</td><td>.311</td><td>.122</td><td>.038</td><td>.044</td><td>.044</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.384</td><td>.149</td><td>.217</td><td>.039</td><td>.022</td><td>.044</td><td>.043</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.266</td><td>.08</td><td>.125</td><td>.005</td><td>.004</td><td>.08</td><td>.033</td>\n </tr>\n \n <tr><td colspan=\"9\">EDUCATION</td></tr>\n <tr><td></td><td>xi2: No school</td>\n   <td>.68</td><td>.258</td><td>.395</td><td>.257</td><td>.08</td><td>.031</td><td>.028</td>\n </tr>\n <tr><td></td><td>xi2: Primary</td>\n   <td>.539</td><td>.221</td><td>.307</td><td>.133</td><td>.045</td><td>.045</td><td>.038</td>\n </tr>\n <tr><td></td><td>xi2: Upper Primary</td>\n   <td>.372</td><td>.141</td><td>.201</td><td>.053</td><td>.024</td><td>.038</td><td>.044</td>\n </tr>\n <tr><td></td><td>xi2: Secondary</td>\n   <td>.288</td><td>.084</td><td>.129</td><td>.022</td><td>.008</td><td>.093</td><td>.035</td>\n </tr>\n <tr><td></td><td>xi2: Higher</td>\n   <td>.272</td><td>.024</td><td>.042</td><td>.004</td><td>.003</td><td>.187</td><td>.037</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>\n</div>"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div>\n<button type=\"button\" class=\"btn btn-block\"data-toggle=\"modal\" data-target=\"#wkParticipation\">\n Table: Work Participation (women)\n</button>\n<div class=\"modal fade\" id=\"wkParticipation\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"wkParticipationLabel\">\n <div class=\"modal-dialog\" role=\"document\">\n   <div class=\"modal-content\">\n     <div class=\"modal-header\">\n       <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">x</span></button>\n       <h4 class=\"modal-title\" id=\"wkParticipationLabel\">Work Participation (women)</h4>\n     </div>\n     <div class=\"modal-body\">\n<table class=\"table table-responsive table-condensed\">\n<tr><td></td><td></td>\n<td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH 4-7 Any work\">Any</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH9  4.28 Family farm work\">Farm</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH9  5.5 Animal care\">Animal</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH11 6.3 Ag wage labour\">Agricultural Wage</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH11 6.3 Nonag wage labour\">Non-Agricultural Wage</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH11 6.,7 Salaried position\">Salary</span></td><td><span data-toggle=\"tooltip\" data-placement=\"top\" title=\"HH12 7.7 Family business work\">HH Business</span></td>\n</tr>\n <tr><td colspan=\"9\">AGE</td></tr>\n <tr><td></td><td>15-19</td>\n   <td>.378</td><td>.13</td><td>.203</td><td>.114</td><td>.044</td><td>.004</td><td>.016</td>\n </tr>\n <tr><td></td><td>20-24</td>\n   <td>.384</td><td>.148</td><td>.201</td><td>.109</td><td>.041</td><td>.019</td><td>.019</td>\n </tr>\n <tr><td></td><td>25-29</td>\n   <td>.478</td><td>.174</td><td>.254</td><td>.14</td><td>.05</td><td>.037</td><td>.03</td>\n </tr>\n <tr><td></td><td>30-34</td>\n   <td>.585</td><td>.22</td><td>.32</td><td>.171</td><td>.057</td><td>.06</td><td>.04</td>\n </tr>\n <tr><td></td><td>35-39</td>\n   <td>.615</td><td>.227</td><td>.348</td><td>.201</td><td>.062</td><td>.054</td><td>.04</td>\n </tr>\n <tr><td></td><td>40-44</td>\n   <td>.59</td><td>.225</td><td>.349</td><td>.169</td><td>.054</td><td>.047</td><td>.041</td>\n </tr>\n <tr><td></td><td>45-49</td>\n   <td>.586</td><td>.235</td><td>.349</td><td>.166</td><td>.048</td><td>.053</td><td>.042</td>\n </tr>\n \n <tr><td colspan=\"9\">REGION</td></tr>\n <tr><td></td><td>Northern</td>\n   <td>.513</td><td>.194</td><td>.429</td><td>.044</td><td>.021</td><td>.031</td><td>.025</td>\n </tr>\n <tr><td></td><td>Northeastern</td>\n   <td>.415</td><td>.242</td><td>.283</td><td>.006</td><td>.026</td><td>.03</td><td>.023</td>\n </tr>\n <tr><td></td><td>Eastern</td>\n   <td>.5</td><td>.163</td><td>.333</td><td>.105</td><td>.048</td><td>.033</td><td>.028</td>\n </tr>\n <tr><td></td><td>Western</td>\n   <td>.548</td><td>.265</td><td>.273</td><td>.183</td><td>.041</td><td>.047</td><td>.037</td>\n </tr>\n <tr><td></td><td>Southern</td>\n   <td>.541</td><td>.13</td><td>.167</td><td>.241</td><td>.073</td><td>.07</td><td>.048</td>\n </tr>\n <tr><td></td><td>Central</td>\n   <td>.717</td><td>.391</td><td>.348</td><td>.377</td><td>.128</td><td>.03</td><td>.036</td>\n </tr>\n \n <tr><td colspan=\"9\">RELIGION</td></tr>\n <tr><td></td><td>Hindu</td>\n   <td>.556</td><td>.218</td><td>.305</td><td>.179</td><td>.053</td><td>.045</td><td>.034</td>\n </tr>\n <tr><td></td><td>Muslim</td>\n   <td>.412</td><td>.099</td><td>.269</td><td>.04</td><td>.046</td><td>.031</td><td>.039</td>\n </tr>\n <tr><td></td><td>Christian</td>\n   <td>.449</td><td>.107</td><td>.186</td><td>.124</td><td>.026</td><td>.09</td><td>.031</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.57</td><td>.226</td><td>.356</td><td>.137</td><td>.08</td><td>.042</td><td>.042</td>\n </tr>\n \n <tr><td colspan=\"9\">CASTE</td></tr>\n <tr><td></td><td>Brahmin</td>\n   <td>.331</td><td>.128</td><td>.215</td><td>.009</td><td>.015</td><td>.049</td><td>.03</td>\n </tr>\n <tr><td></td><td>OBC</td>\n   <td>.55</td><td>.224</td><td>.309</td><td>.149</td><td>.048</td><td>.042</td><td>.042</td>\n </tr>\n <tr><td></td><td>SC</td>\n   <td>.592</td><td>.15</td><td>.312</td><td>.246</td><td>.082</td><td>.043</td><td>.023</td>\n </tr>\n <tr><td></td><td>ST</td>\n   <td>.77</td><td>.419</td><td>.403</td><td>.372</td><td>.11</td><td>.043</td><td>.028</td>\n </tr>\n <tr><td></td><td>Other</td>\n   <td>.435</td><td>.161</td><td>.259</td><td>.064</td><td>.023</td><td>.049</td><td>.036</td>\n </tr>\n \n <tr><td colspan=\"9\">URBANITY</td></tr>\n <tr><td></td><td>Rural</td>\n   <td>.659</td><td>.277</td><td>.399</td><td>.215</td><td>.058</td><td>.029</td><td>.031</td>\n </tr>\n <tr><td></td><td>Urban</td>\n   <td>.226</td><td>.011</td><td>.047</td><td>.018</td><td>.039</td><td>.085</td><td>.045</td>\n </tr>\n \n <tr><td colspan=\"9\">AFFLUENCE</td></tr>\n <tr><td></td><td>Poorest</td>\n   <td>.733</td><td>.24</td><td>.398</td><td>.339</td><td>.105</td><td>.034</td><td>.024</td>\n </tr>\n <tr><td></td><td>Poorer</td>\n   <td>.669</td><td>.266</td><td>.393</td><td>.24</td><td>.077</td><td>.03</td><td>.03</td>\n </tr>\n <tr><td></td><td>Middle</td>\n   <td>.544</td><td>.236</td><td>.311</td><td>.122</td><td>.038</td><td>.044</td><td>.044</td>\n </tr>\n <tr><td></td><td>Richer</td>\n   <td>.384</td><td>.149</td><td>.217</td><td>.039</td><td>.022</td><td>.044</td><td>.043</td>\n </tr>\n <tr><td></td><td>Richest</td>\n   <td>.266</td><td>.08</td><td>.125</td><td>.005</td><td>.004</td><td>.08</td><td>.033</td>\n </tr>\n \n <tr><td colspan=\"9\">EDUCATION</td></tr>\n <tr><td></td><td>xi2: No school</td>\n   <td>.68</td><td>.258</td><td>.395</td><td>.257</td><td>.08</td><td>.031</td><td>.028</td>\n </tr>\n <tr><td></td><td>xi2: Primary</td>\n   <td>.539</td><td>.221</td><td>.307</td><td>.133</td><td>.045</td><td>.045</td><td>.038</td>\n </tr>\n <tr><td></td><td>xi2: Upper Primary</td>\n   <td>.372</td><td>.141</td><td>.201</td><td>.053</td><td>.024</td><td>.038</td><td>.044</td>\n </tr>\n <tr><td></td><td>xi2: Secondary</td>\n   <td>.288</td><td>.084</td><td>.129</td><td>.022</td><td>.008</td><td>.093</td><td>.035</td>\n </tr>\n <tr><td></td><td>xi2: Higher</td>\n   <td>.272</td><td>.024</td><td>.042</td><td>.004</td><td>.003</td><td>.187</td><td>.037</td>\n </tr>\n \n</table>\n     </div>\n   </div>\n </div>\n</div>\n</div>")
    ; __line = 138
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],102:[function(require,module,exports){
module.exports=( function anonymous(locals, escapeFn, include, rethrow
/**/) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div id=\"webContent\">\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n\n            <div class=\"col-xs-9 myText\">\n                <section id=\"introduction\"></section>\n                <section id=\"domestic-violence\"></section>\n                <section id=\"labor-force-participation\"></section>\n                <section id=\"work-dv-relationship\"></section>\n                <section id=\"appendix\"></section>\n            </div>\n            \n            <div class=\"col-xs-3 scrollspy\">\n                <ul id=\"nav\" class=\"nav hidden-xs hidden-sm\" data-spy=\"affix\"></ul>\n            </div>\n\n        </div><!--end of .row-->\n    </div><!--end of .container-->\n</div>"
  , __filename = "/Users/shaypepper/CodingDojo/ghio/thesis/views/web.ejs";
try {
  var __output = [], __append = __output.push.bind(__output);
  with (locals || {}) {
    ; __append("<div id=\"webContent\">\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n\n            <div class=\"col-xs-9 myText\">\n                <section id=\"introduction\"></section>\n                <section id=\"domestic-violence\"></section>\n                <section id=\"labor-force-participation\"></section>\n                <section id=\"work-dv-relationship\"></section>\n                <section id=\"appendix\"></section>\n            </div>\n            \n            <div class=\"col-xs-3 scrollspy\">\n                <ul id=\"nav\" class=\"nav hidden-xs hidden-sm\" data-spy=\"affix\"></ul>\n            </div>\n\n        </div><!--end of .row-->\n    </div><!--end of .container-->\n</div>")
    ; __line = 19
  }
  return __output.join("");
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

})
},{}],103:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[14]);
