/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

OpenCharts.Style = OpenCharts.Class({
    fillStyle: "#000",
    strokeStyle:"#000",
    lineWidth:1,
    globalAlpha : 1,

    initialize: function (options){
        var me = this;
        OpenCharts.Util.extend(this, options);
    },

    clone:function(){
        var options = OpenCharts.Util.extend({}, this);
        return new OpenCharts.Style(options);
    },

    CLASS_NAME: "OpenCharts.Style"
});