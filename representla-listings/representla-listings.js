#!/usr/bin/env node

var program = require('commander');
var _ = require('underscore');
var Nightmare = require('nightmare');

function listTypes (markers) {
}

function listMarkers (markers) {
  markers = _.each(markers, function (marker) {
    console.log(marker.join('\t'))
  })
}

program
  .version('0.0.1')
  .option('--list-types', 'list the available listing types')
  .parse(process.argv);

new Nightmare()
  .goto('http://represent.la')
  .evaluate(function () {
    return markers;
  }, function (markers) {
    if (program.listTypes) {
      listTypes(markers);
      return;
    }

    listMarkers(markers);
  })
  .run()
