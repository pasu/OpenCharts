/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/BaseTypes/Point.js
 * @requires OpenCharts/BaseTypes/Rect.js
 * @requires OpenCharts/TextStyle.js
 *@requires OpenCharts/Style.js
 * @requires OpenCharts/Item.js
 * @requires OpenCharts/RenderEnginer.js
 * @requires OpenCharts/Charts.js
 */

/**
 * Class: OpenCharts.Chart.PieChart
 * 面积图表类。用于创建面积类型的统计图表
 * Inherits from:
 *  - <OpenCharts.Chart>
 */
OpenCharts.Chart.PieChart = OpenCharts.Class(OpenCharts.Chart,{

    /**
     * APIProperty: coordinateStyle
     * {<OpenCharts.Coordinate>} 坐标轴风格
     */
    coordinateStyle:null,

    /**
     * Property: radius
     * {Number} 饼半径，像素单位
     */
    radius:null,

    /**
     * Property: totalValue
     * {Number} 数据总和
     */
    totalValue:null,

    /**
     * Property: center
     * {<OpenCharts.Point>} 饼图中点
     */
    center:null,

    /**
     * Property: hitItemIDs
     * {Array(Boolean)} 选中饼的ID集合
     */
    hitItemIDs:null,

    /**
     * APIProperty: startAngel
     * {Number} 起始角度
     */
    startAngel:0,

    /**
     * Property: angle
     * {Number} 当前饼的起始角度
     */
    angle:0,

    /**
     * APIProperty: hitRange
     * {Number} 选中饼离圆心的直线距离
     */
    hitRange:15,

    /**
     * Constructor: OpenCharts.Chart.PieChart
     *
     * Parameters:
     * div - {Obj} 外部传入canvas元素
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (div, options){
        OpenCharts.Chart.prototype.initialize.apply(this,
            arguments);

        var me = this;
        me.center = new OpenCharts.Point(0,0);
        me.coordinateStyle = new OpenCharts.Coordinate();
    },

    /**
     * Method: calculateValue
     * 计算图表绘制所需数值
     */
    calculateValue:function(){
        var me = this;
        me.radius = Math.min(me.height - me.coordinateStyle.headRange - me.coordinateStyle.footerRange,me.width*0.5)/2;

        me.hitItemIDs = [];
        for(var i=0;i<me.itemArray[0].length;i++)
        {
            me.totalValue += me.itemArray[0][i].data;
            me.hitItemIDs.push(false);
        }

        me.center.x = me.width/2;
        me.center.y = me.coordinateStyle.headRange + (me.height - me.coordinateStyle.headRange - me.coordinateStyle.footerRange)/2;

    },

    /**
     * Method: renderChart
     * 渲染饼状统计图表
     */
    renderChart:function(){
        var me = this;
        me.myContext.clearRect(0,0,me.width,me.height);

        me.renderTitle();
        me.renderFrame();
        me.angle = 0;

        if(me.bAnimation == false)
        {
            for(var i=0;i<me.itemArray[0].length;i++)
            {
                me.renderChartByAnimation(i);
            }
            me.angle = 0;
            if(me.bShowLegend)
                me.renderLegend();

        }
        else
        {
            me.iIndex = 0;
            var callBack = function(obj){
                return function(){
                    obj.renderChartByAnimation(obj.iIndex);
                    obj.iIndex++;
                }
            }(me);

            me.queueId = OpenCharts.Animation.start(
                callBack,
                null,null
            );
        }
    },

    /**
     * Method: renderChartByAnimation
     * 动态渲染饼状统计图表
     */
    renderChartByAnimation:function(i){
        var me = this;
        if(me.itemArray[0][i].data == 0)
            return;

        var x = me.center.x;
        var y = me.center.y;
        var pieStyle = me.itemArray[0][i].itemStyle;
        if(typeof pieStyle == "string")
        {
            me.myContext.strokeStyle = pieStyle;
            me.myContext.lineWidth = 1;
            me.myContext.fillStyle = pieStyle;
        } else if(pieStyle === undefined)
        {
            me.myContext.strokeStyle = "#" + i.toString() + i.toString() + i.toString();
            me.myContext.lineWidth = 1;
            me.myContext.fillStyle = me.myContext.strokeStyle;
        }
        else
        {
            me.myContext.strokeStyle = pieStyle.strokestrokeStyle;
            me.myContext.lineWidth = pieStyle.lineWidth;
            me.myContext.fillStyle = pieStyle.fillStyle;
        }
        me.myContext.strokeStyle = "#FFF";
        me.myContext.lineWidth = 1;

        var shoudRotate = me.itemArray[0][i].data*360/me.totalValue;
        var begin_angle = me.angle + me.startAngel;
        var end_angle = begin_angle + shoudRotate;
        me.angle += shoudRotate;

        var PI = (Math.PI / 180);
        if(me.hitItemIDs[i] == true)
        {
            var rotate = begin_angle + shoudRotate/2;
            rotate = rotate*PI;
            x = x + Math.cos(rotate)*me.hitRange;
            y = y + Math.sin(rotate)*me.hitRange;
        }

        me.myContext.beginPath();
        me.myContext.moveTo(x,y);
        me.myContext.arc(x,y,me.radius,begin_angle*PI,end_angle*PI,false);
        me.myContext.closePath();
        me.myContext.fill();
        me.myContext.stroke();

        if(me.bAnimation == true &&
            me.iIndex ==me.itemArray[0].length-1 )
        {
            OpenCharts.Animation.stop(me.queueId);
            me.angle = 0;

            if(me.bShowLegend)
                me.renderLegend();
        }
    },
    /**
     * APIMethod: getItemByPosition
     * 获取点击点所在的图表子项
     * Parameters:
     * pointX - {Number} 鼠标相对canvas所在X位置。
     * pointY - {Number} 鼠标相对canvas所在Y位置。
     * selectType - {String} 点击类型，精确or按照x。
     *
     * Returns:
     * {JsonObject} 返回所在IndexX和IndexY及其描述信息
     */
    getItemByPosition:function(pointX,pointY,selectType){
        var me = this;
        var itemSelectedArray = [];

        var distance = Math.sqrt((pointX-me.center.x)*(pointX-me.center.x)+(pointY-me.center.y)*(pointY-me.center.y));

        var angle = 0;

        var x = me.center.x;
        var y = me.center.y;
        var pntRotate = 2*Math.PI - me.calculateRotateAngle(new OpenCharts.Point(x+10,y),new OpenCharts.Point(pointX,pointY));
        for(var i=0;i<me.itemArray[0].length;i++)
        {
            x = me.center.x;
            y = me.center.y;
            var shoudRotate = me.itemArray[0][i].data*360/me.totalValue;
            var begin_angle = angle + me.startAngel;
            var end_angle = begin_angle + shoudRotate;
            angle += shoudRotate;

            var PI = (Math.PI / 180);
            if(me.hitItemIDs[i] == true)
            {
                if(distance>=me.hitRange && distance <me.radius+me.hitRange)
                {
                    var rotate = begin_angle + shoudRotate/2;
                    rotate = rotate*PI;
                    x = x + Math.cos(rotate)*me.hitRange;
                    y = y + Math.sin(rotate)*me.hitRange;
                    rotate = 2*Math.PI - me.calculateRotateAngle(new OpenCharts.Point(x+10,y),new OpenCharts.Point(pointX,pointY));
                    if(rotate >=begin_angle*PI && rotate<end_angle*PI)
                    {
                        itemSelectedArray.push({indexX:0,indexY:i});
                        return itemSelectedArray;
                    }
                }
            }
            else
            {
                if(distance <=me.radius)
                {
                    if(pntRotate >=begin_angle*PI && pntRotate<end_angle*PI)
                    {
                        itemSelectedArray.push({indexX:0,indexY:i});
                        return itemSelectedArray;
                    }
                }
            }
        }
        return itemSelectedArray;
    },

    /**
     * Method: onMousemove
     * 鼠标移动事件
     * Parameters:
     * evt - {Object} 鼠标点击事件。
     */
    onMousemove:function(evt)
    {
        var me = this;
        me.onMouse(evt,false);
    },

    /**
     * Method: onMousedown
     * 鼠标移动事件
     * Parameters:
     * evt - {Object} 鼠标点击事件。
     */
    onMousedown:function(evt)
    {
        var me = this;
        me.onMouse(evt,true);
    },

    /**
     * Method: onMouse
     * 鼠标事件
     * Parameters:
     * evt - {Object} 鼠标点击事件。
     */
    onMouse:function(evt,bRender){
        var me = this;
        var relPosition = me.relMouseCoords(evt);
        var mouseX=relPosition.x;
        var mouseY=relPosition.y;
        var items = me.getItemByPosition(mouseX,mouseY);
        if(items==null || items.length==0)
        {
            me.msgObj.style.visibility = "hidden";
            return;
        }

        me.msgObj.style.visibility = "visible";
        var strokecolor = "#000";
        var areaStyle = me.itemArray[items[0].indexX][items[0].indexY].itemStyle;
        if(typeof areaStyle == "string")
        {
            strokecolor = areaStyle;
        }

        me.msgObj.style.borderColor= strokecolor;
        me.msgObj.className = "message";
        var value = mouseX + me.totalOffsetX;
        me.msgObj.style.left = value + "px";
        value = mouseY + me.totalOffsetY;
        me.msgObj.style.top = value+"px";
        me.msgObj.style.position = "absolute";
        me.msgObj.style.visibility = "visible";
        me.msgObj.innerHTML = "";
        for(var i=0;i<items.length;i++)
        {
            var strMessage = OpenCharts.String.format(me._message,{
                itemName: me.itemNameArray[items[i].indexX] || "",
                itemCaption:me.itemArray[items[i].indexX][items[i].indexY].strCaption ||"",
                itemData:me.itemArray[items[i].indexX][items[i].indexY].data||""
            });
            me.msgObj.innerHTML +=  strMessage + "<br />";
        }

        if(bRender == true)
        {
            me.hitItemIDs[items[0].indexY] = !me.hitItemIDs[items[0].indexY];
            var bAnimation =me.bAnimation;
            me.bAnimation = false;
            me.renderChart();
            me.bAnimation = bAnimation
        }
    },

    /**
     * Method: calculateRotateAngle
     * 计算两点相对(0,0)点夹角
     * Parameters:
     * p1 - {<OpenCharts.Point>} p1点位置。
     * p2 - {<OpenCharts.Point>} p2点位置。
     *
     * Returns:
     * {Number} 返回两点夹角弧度
     */
    calculateRotateAngle:function(p1,p2)
    {
        var dRotateAngle = Math.atan2(Math.abs(p1.y-p2.y),Math.abs(p1.x-p2.x));
        if (p2.x>=p1.x)
        {
            if (p2.y<=p1.y)
            {
                dRotateAngle=dRotateAngle;
            }
            else
            {
                dRotateAngle=2*Math.PI-dRotateAngle;
            }
        }
        else
        {
            if (p2.y<=p1.y)
            {
                dRotateAngle=Math.PI-dRotateAngle;
            }
            else
            {
                dRotateAngle=Math.PI+dRotateAngle;
            }
        }
        return dRotateAngle;
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

        var callBack;
        if(action == "mousemove")
        {
            callBack = function(obj){
                return function(evt){
                    obj.onMousemove(evt);
                }
            }(me);
        }
        else
        {
            callBack = function(obj){
                return function(evt){
                    obj.onMousedown(evt);
                }
            }(me);
        }

        me.myCanvas.addEventListener(action,callBack,false);

        me.msgObj=document.createElement("div")
        me.msgObj.setAttribute("id","axes_msg");
        document.body.appendChild(me.msgObj);
    },

    /**
     * Method: renderLegend
     * 渲染图例
     */
    renderLegend:function(){
        var me = this;
        var nItems = me.itemArray[0].length;
        var strTitle;
        var nWidth = 0;
        var charWidth = 11;
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
            strTitle = me.itemArray[0][i].strCaption;
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
            var fillStyle = me.itemArray[0][i].itemStyle;
            if(typeof fillStyle == "string")
            {
                me.myContext.fillStyle = fillStyle;
            } else if(fillStyle === undefined)
            {
                me.myContext.fillStyle = "#" + i.toString() + i.toString() + i.toString();
            }
            else
            {
                me.myContext.fillStyle = fillStyle.fillStyle;
            }
            me.myContext.strokeStyle = "#000";
            me.myContext.lineWidth = 1;
            me.myContext.fillRect(titlePosition.x - charWidth-5,titlePosition.y-charWidth,12,12);
            me.myContext.strokeRect(titlePosition.x - charWidth-5,titlePosition.y-charWidth,12,12);

            strTitle = me.itemArray[0][i].strCaption;
            OpenCharts.RenderEnginer.renderText(me.myContext,strTitle,textstyle,titlePosition);
            titlePosition.y += 2*charWidth;
        }
    },



    CLASS_NAME: "OpenCharts.Chart.PieChart"
});