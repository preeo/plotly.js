// in custom-plotly.js

// promise polyfill
//require('es6-promise').polyfill();
'use strict';
// promise polyfill
require('es6-promise').polyfill();

var plotlyCore = require('../lib/core');

// Load in the trace types for pie, and choropleth
plotlyCore.register([
    require('../lib/pie'),
    require('../lib/box'),
    require('../lib/surface'),
]);

module.exports = plotlyCore;

