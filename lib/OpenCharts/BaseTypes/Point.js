/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

OpenCharts.Point = OpenCharts.Class({
    x:null,
    y:null,

    initialize: function (x, y){
        var me = this;
        me.x = x;
        me.y = y;
    },

    CLASS_NAME: "OpenCharts.Point"
});