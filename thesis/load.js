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