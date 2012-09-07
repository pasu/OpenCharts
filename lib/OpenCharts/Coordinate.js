/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

OpenCharts.Coordinate = OpenCharts.Class({
    unit:"",
    stepNumber:10,
    stepRange:-1,
    headRange:50,
    footerRange:30,
    scaleLength:4,

    bShowAxes:true,
    bShowXAxesGrid:false,
    bShowYAxesGrid:true,
    bShowXAxesText:true,
    bShowYAxesText:true,

    axesStyle:null,
    axesTextStyle:null,

    initialize: function (options){
        var me = this;
        OpenCharts.Util.extend(this, options);
        me.axesStyle = new OpenCharts.Style();
        me.axesStyle.strokeStyle = "#111";
        me.axesStyle.lineWidth = 1;

        me.axesTextStyle = new OpenCharts.TextStyle();
        me.axesTextStyle.fSize  = "12px";
        me.axesStyle.fFamily = "Microsoft YaHei";
    },


    CLASS_NAME: "OpenCharts.Coordinate"
});