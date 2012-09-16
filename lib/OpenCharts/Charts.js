/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/BaseTypes/Point.js
 * @requires OpenCharts/BaseTypes/Rect.js
 * @requires OpenCharts/TextStyle.js
 *@requires OpenCharts/Style.js
 * @requires OpenCharts/Item.js
 * @requires OpenCharts/RenderEnginer.js
 */

/**
 * Class: OpenCharts.Chart
 * 图表类。一切图表的基类，都需要创建图表类后才能进行后面的展现和事件响应操作
 */
OpenCharts.Chart = OpenCharts.Class({

    /**
     * APIProperty: nType
     * {String} 图表类型，Pie、Bar、Area、Line、Point
     */
    nType:null,

    /**
     * APIProperty: width
     * {Number} 图表画布宽度，即canvas宽度，像素单位
     */
    width:null,

    /**
     * APIProperty: height
     * {Number} 图表画布高度，即canvas高度，像素单位
     */
    height:null,

    /**
     * Property: myCanvas
     * {Object} 传入的Canvas画布
     */
    myCanvas:null,

    /**
     * Property: myContext
     * {Object} 传入的Canvas的content
     */
    myContext:null,

    /**
     * APIProperty: title
     * {String} 图表标题，默认为"OpenCharts 1.0.0"
     */
    strTitle:"OpenCharts 1.0.0",

    /**
     * APIProperty: title
     * {<OpenCharts.TextStyle>} 图表标题风格
     */
    titleStyle:null,

    /**
     * APIProperty: titlePosition
     * {<OpenCharts.Point>} 图表标题位置
     */
    titlePosition:null,

    /**
     * APIProperty: frameStyle
     * {<OpenCharts.Style>} 图表框风格
     */
    frameStyle:null,

    /**
     * Property: itemArray
     * {Array(OpenCharts.Items)} 图表数据，用户输入数据
     */
    itemArray:null,

    /**
     * Property: itemNameArray
     * {Array(String)} 图表每一组的数据名称
     */
    itemNameArray:null,

    /**
     * Property: maxValue
     * {Number} 图表数据中的最大值，内部计算
     */
    maxValue:0,

    /**
     * Property: totalOffsetX
     * {Number} 图表所在canvas相对HTML页面的偏移X值，像素单位
     */
    totalOffsetX:null,

    /**
     * Property: totalOffsetY
     * {Number} 图表所在canvas相对HTML页面的偏移Y值，像素单位
     */
    totalOffsetY:null,

    /**
     * Property: msgObj
     * {Obj} 提示框对象
     */
    msgObj:null,

    /**
     * Property: bShowLabel
     * {Boolean} 是否显示各项数据标签
     */
    bShowLabel:false,

    /**
     * Property: bShowLegend
     * {Boolean} 是否显示图例
     */
    bShowLegend:true,

    /**
     * APIProperty: bAnimation
     * {Boolean} 是否动画方式绘制
     */
    bAnimation:false,

    /**
     * Constructor: OpenCharts.Charts
     *
     * Parameters:
     * div - {Obj} 外部传入canvas元素
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (div, options){
        var me = this;
        me.myCanvas = document.getElementById(div);
        me.myContext =  me.myCanvas.getContext("2d");

        me.itemArray = [];
        me.itemNameArray = [];
        me.initializePosition();

        me.makeDefault();
    },

    /**
     * Method: destroy
     * Destroy is a destructor: this is to alleviate cyclic references which
     *     the Javascript garbage cleaner can not take care of on its own.
     */
    destroy: function() {

    },

    /**
     * Method: initializePosition
     * 初始化图表位置
     */
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

    /**
     * Method: makeDefault
     * 构造默认风格图表，包括标题和外框
     */
    makeDefault:function(){
        var me = this;
        me.makeDefaultTitle();
        me.makeDefaultFrame();
    },

    /**
     * Method: makeDefaultTitle
     * 构造默认图表标题及风格
     */
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

    /**
     * Method: makeDefaultFrame
     * 构造默认图表外框及风格
     */
    makeDefaultFrame:function(){
        var me = this;
        me.frameStyle = new OpenCharts.Style();
        me.frameStyle.strokeStyle = "#c3c3c3";
    },

    /**
     * APIMethod: addItems
     * 添加图表数据。
     *
     * Parameters:
     * items - {Array(<OpenCharts.Item>)} 图表数据数组。
     * name - {String>} 数据项名字。
      * (code)
     *     var items = [] ;
     *     items.push({strCaption : '海淀区',data : 2,itemStyle:'#00FFFF'});
     *     var charts = new OpenCharts.Chart.PieChart("canvas");
     *     charts.addItems(items,"北京");
     * (end)
     */
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

    /**
     * Method: getMaxValue
     * 获取数据组中最大数值
     */
    getMaxValue:function(){
        return this.maxValue;
    },

    /**
     * APIMethod: render
     * 绘制图表。
     */
    render:function(){
        var me = this;
        me.calculateValue();
        me.myContext.clearRect(0,0,me.width,me.height);

        me.renderTitle();
        me.renderFrame();

        me.renderChart();

        if(me.bShowLegend && me.bAnimation == false)
            me.renderLegend();
    },

    /**
     * Method: renderTitle
     * 绘制标题
     */
    renderTitle:function(){
        var me = this;
        if(me.strTitle == null || me.titleStyle== null || me.titleStyle.fVisible == false)
            return;

        OpenCharts.RenderEnginer.renderText(me.myContext,me.strTitle,me.titleStyle,me.titlePosition);
    },

    /**
     * Method: renderFrame
     * 绘制外框
     */
    renderFrame:function(){
        var me = this;
        var radius = 10;
        var myRect = new OpenCharts.Rect(1,1,me.width-1,me.height-1);
        OpenCharts.RenderEnginer.strokeRoundRect(me.myContext,myRect,radius,me.frameStyle);
    },

    /**
     * Method: renderChart
     * 绘制图表，继承类单独实现
     */
    renderChart:function(){
        // to do in subclass
    },

    /**
     * APIMethod: getItemByPosition
     * 获取点击点所在的图表子项，继承类实现
     * Parameters:
     * pointX - {Number} 鼠标相对canvas所在X位置。
     * pointY - {Number} 鼠标相对canvas所在Y位置。
     * selectType - {String} 点击类型，精确or按照x。
     *
     * Returns:
     * {JsonObject} 返回所在IndexX和IndexY及其描述信息
     */
    getItemByPosition:function(pointX,pointY,selectType){
        // to do in subclass
    },

    /**
     * Method: calculateValue
     * 计算图表绘制所需数值，继承类单独实现
     */
    calculateValue:function(){
        // to do in subclass
    },

    /**
     * Method: relMouseCoords
     * 获取鼠标位置相对当前canvas位置
     */
    relMouseCoords:function(event){
        var canvasX = 0;
        var canvasY = 0;
        var me = this;

        canvasX = event.pageX - me.totalOffsetX;
        canvasY = event.pageY - me.totalOffsetY;

        return {x:canvasX, y:canvasY}
    },

    /**
     * APIMethod: addEventListener
     * 添加图表事件
     * Parameters:
     * action - {String} 事件类型。
     * message - {String} 事件文字描述信息。
     * (code)
     *     var message = "${itemName}${itemCaption}的气温是${itemData}";
     *     charts.addEventListener("mousedown",message);
     * (end)
     *
     */
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

    /**
     * APIMethod: showLabel
     * 是否显示各项标题
     * Parameters:
     * bShow - {Boolean} 事件类型。
     *
     */
    showLabel:function(bShow){
        var me = this;
        me.bShowLabel = bShow;
    },

    /**
     * APIMethod: showLegend
     * 是否显示图例
     * Parameters:
     * bShow - {Boolean} 事件类型。
     *
     */
    showLegend:function(bShow){
        var me = this;
        me.bShowLegend = bShow;
    },

    /**
     * Method: renderLegend
     * 渲染图例
     */
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