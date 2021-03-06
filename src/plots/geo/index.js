/**
* Copyright 2012-2016, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';

var Geo = require('./geo');

var Plots = require('../../plots/plots');


exports.name = 'geo';

exports.attr = 'geo';

exports.idRoot = 'geo';

exports.idRegex = /^geo([2-9]|[1-9][0-9]+)?$/;

exports.attrRegex = /^geo([2-9]|[1-9][0-9]+)?$/;

exports.attributes = require('./layout/attributes');

exports.layoutAttributes = require('./layout/layout_attributes');

exports.supplyLayoutDefaults = require('./layout/defaults');

exports.plot = function plotGeo(gd) {
    var fullLayout = gd._fullLayout,
        fullData = gd._fullData,
        geoIds = Plots.getSubplotIds(fullLayout, 'geo');

    /**
     * If 'plotly-geo-assets.js' is not included,
     * initialize object to keep reference to every loaded topojson
     */
    if(window.PlotlyGeoAssets === undefined) {
        window.PlotlyGeoAssets = { topojson : {} };
    }

    for(var i = 0; i < geoIds.length; i++) {
        var geoId = geoIds[i],
            fullGeoData = Plots.getSubplotData(fullData, 'geo', geoId),
            geo = fullLayout[geoId]._geo;

        // If geo is not instantiated, create one!
        if(geo === undefined) {
            geo = new Geo({
                id: geoId,
                graphDiv: gd,
                container: fullLayout._geocontainer.node(),
                topojsonURL: gd._context.topojsonURL
            },
                fullLayout
            );

            fullLayout[geoId]._geo = geo;
        }

        geo.plot(fullGeoData, fullLayout, gd._promises);
    }
};
