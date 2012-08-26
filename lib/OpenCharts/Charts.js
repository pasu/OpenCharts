/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/BaseTypes/Point.js
 * @requires OpenCharts/BaseTypes/Rect.js
 * @requires OpenCharts/TextStyle.js
 *@requires OpenCharts/Style.js
 * @requires OpenCharts/Item.js
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

    frameStyle:null,

    itemArray:null,
    maxValue:0,

    initialize: function (div, options){
        var me = this;
        me.myCanvas = document.getElementById(div);
        me.myContext =  me.myCanvas.getContext("2d");
        me.width =  me.myCanvas.width;
        me.height =  me.myCanvas.height;

        me.itemArray = [];

        me.makeDefault();
    },

    makeDefault:function(){
        var me = this;
        me.makeDefaultTitle();
        me.makeDefaultFrame();
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

    makeDefaultFrame:function(){
        var me = this;
        me.frameStyle = new OpenCharts.Style();
        me.frameStyle.strokeStyle = "#c3c3c3";
    },

    addItems:function(items){
        var me = this;
        me.itemArray.push(items);

        for(var i=0;i<items.length;i++)
        {
            if(items[i].data>me.maxValue)
                me.maxValue = items[i].data;
        }
    },

    getMaxValue:function(){
        return this.maxValue;
    },

    render:function(){
        var me = this;
        me.calculateValue();
        me.renderTitle();
        me.renderFrame();

        me.renderChart();
    },

    renderTitle:function(){
        var me = this;
        if(me.strTitle == null || me.titleStyle== null || me.titleStyle.fVisible == false)
            return;

        OpenCharts.RenderEnginer.renderText(me.myContext,me.strTitle,me.titleStyle,me.titlePosition);
    },

    renderFrame:function(){
        var me = this;
        var radius = 10;
        var myRect = new OpenCharts.Rect(1,1,me.width-1,me.height-1);
        OpenCharts.RenderEnginer.strokeRoundRect(me.myContext,myRect,radius,me.frameStyle);
    },

    renderChart:function(){
        // to do in subclass
    },

    getItemByPosition:function(pointX,pointYselectType){
        // to do in subclass
    },

    calculateValue:function(){
        // to do in subclass
    },

    CLASS_NAME: "OpenCharts.Chart"
});