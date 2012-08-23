/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/RenderEnginer.js
 */
OpenCharts.Chart = OpenCharts.Class({
    nType:null,

    width:null,
    height:null,
    title:null,
    myCanvas:null,
    myContext:null,

    strTitle:null,
    titleStyle:null,
    titlePosition:null,

    initialize: function (div, options){
        var me = this;
        me.myCanvas = document.getElementById(div);
        me.myContext =  me.myCanvas.getContext("2d");
        me.width = options.width;
        me.height = options.height;

        me.makeDefaultTitle()
    },

    makeDefaultTitle:function(){
        var me = this;
        me.strTitle = "OpenCharts 1.0.0";
        me.titleStyle = new OpenCharts.TextStyle();
        me.titleStyle.fSize = "20px";
        me.titleStyle.fWeight = "normal";
        me.titleStyle.fStyle = "bold";
        me.titleStyle.fColor = "#000";
        me.titleStyle.fFamily = "Microsoft YaHei";

        me.titlePosition = new OpenCharts.Point(me.width/2,30);
    },

    render:function(){
        var me = this;
        me.renderTitle();
    },

    renderTitle:function(){
        var me = this;
        if(me.strTitle == null || me.titleStyle== null || me.titleStyle.fVisible == false)
            return;

        OpenCharts.RenderEnginer.renderText(me.myContext,me.strTitle,me.titleStyle,me.titlePosition);

    },

    renderFrame:function(){
        var me = this;
    },

    CLASS_NAME: "OpenCharts.Chart"
});