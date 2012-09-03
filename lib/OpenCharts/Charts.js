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
    itemNameArray:null,
    maxValue:0,

    events: null,

    totalOffsetX:null,
    totalOffsetY:null,

    msgObj:null,

    bShowLabel:false,
    bShowLegend:false,

    initialize: function (div, options){
        var me = this;
        me.myCanvas = document.getElementById(div);
        me.myContext =  me.myCanvas.getContext("2d");

        me.itemArray = [];
        me.itemNameArray = [];
        me.initializePosition();

        me.makeDefault();
    },

    initializePosition:function(){
        var me = this;
        me.width =  me.myCanvas.width;
        me.height =  me.myCanvas.height;
        var currentElement = this.myCanvas;

        do{
            me.totalOffsetX += currentElement.offsetLeft;
            me.totalOffsetY += currentElement.offsetTop;
        }
        while(currentElement = currentElement.offsetParent)
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

    addItems:function(items,name){
        var me = this;
        me.itemArray.push(items);
        me.itemNameArray.push(name);

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
        me.myContext.clearRect(0,0,me.width,me.height);

        me.renderTitle();
        me.renderFrame();

        me.renderChart();

        me.renderLegend();
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

    addEventListener:function(action,message){
        // to do in subclass
    },

    relMouseCoords:function(event){
        var canvasX = 0;
        var canvasY = 0;
        var me = this;

        canvasX = event.pageX - me.totalOffsetX;
        canvasY = event.pageY - me.totalOffsetY;

        return {x:canvasX, y:canvasY}
    },

    addEventListener:function(action,message){
        var me = this;
        me._message = message;

        var callBack = function(obj){
            return function(evt){
                obj.onMouse(evt);
            }
        }(me);

        me.myCanvas.addEventListener(action,callBack,false);

        me.msgObj=document.createElement("div")
        me.msgObj.setAttribute("id","axes_msg");
        document.body.appendChild(me.msgObj);
    },

    showLabel:function(bShow){
        var me = this;
        me.bShowLabel = bShow;
    },

    showLegend:function(bShow){
        var me = this;
        me.bShowLegend = bShow;
    },

    renderLegend:function(){
        var me = this;
        var nItems = me.itemArray.length;
        var strTitle;
        var nWidth = 0;
        var charWidth = 12;
        var nHeight = 2*charWidth*(nItems+1);
        if(nHeight>me.height)
        {
            charWidth = me.height/(2*nItems+2);
            nHeight = me.height;
        }

        var textstyle = new OpenCharts.TextStyle();
        textstyle.fTextAlign = "left";
        textstyle.fSize = "8px";
        textstyle.fFamily = "Yahei";

        for(var i=0;i<nItems;i++)
        {
            strTitle = me.itemNameArray[i];
            var cArr = strTitle.match(/[^\x00-\xff]/ig);
            var n = strTitle.length + (cArr == null ? 0 : cArr.length);
            if(nWidth<n*charWidth/2)
                nWidth = n*charWidth/2;
        }

        var titlePosition = new OpenCharts.Point(me.width-10-nWidth,(me.height-nHeight)/2+2*charWidth+5);

        me.myContext.fillStyle = "#FFF";
        me.myContext.strokeStyle = "#000";
        me.myContext.lineWidth = 1;
        me.myContext.fillRect(titlePosition.x - charWidth*2,titlePosition.y-charWidth*2,me.width-titlePosition.x+2*charWidth - 5,nItems*2*charWidth+charWidth);
        me.myContext.strokeRect(titlePosition.x - charWidth*2,titlePosition.y-charWidth*2,me.width-titlePosition.x+2*charWidth - 5,nItems*2*charWidth+charWidth);

        for(var i=0;i<nItems;i++)
        {
            var fillStyle = me.itemArray[i][0].itemStyle;
            if(typeof fillStyle == "string")
            {
                me.myContext.fillStyle = fillStyle;
            } else if(fillStyle === undefined)
            {
                me.myContext.fillStyle = "#" + i.toString() + i.toString() + i.toString();
            }
            else
            {
                me.myContext.fillStyle = fillStyle;
            }
            me.myContext.strokeStyle = "#000";
            me.myContext.lineWidth = 1;
            me.myContext.fillRect(titlePosition.x - charWidth-5,titlePosition.y-charWidth,12,12);
            me.myContext.strokeRect(titlePosition.x - charWidth-5,titlePosition.y-charWidth,12,12);

            strTitle = me.itemNameArray[i];
            OpenCharts.RenderEnginer.renderText(me.myContext,strTitle,textstyle,titlePosition);
            titlePosition.y += 2*charWidth;
        }
    },

    CLASS_NAME: "OpenCharts.Chart"
});