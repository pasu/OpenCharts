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

OpenCharts.Chart.PieChart = OpenCharts.Class(OpenCharts.Chart,{
    coordinateStyle:null,
    radius:null,
    totalValue:null,
    center:null,
    hitItemIDs:null,

    startAngel:0,
    hitRange:15,

    initialize: function (div, options){
        OpenCharts.Chart.prototype.initialize.apply(this,
            arguments);

        var me = this;
        me.center = new OpenCharts.Point(0,0);
        me.coordinateStyle = new OpenCharts.Coordinate();
    },

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

    renderChart:function(){
        var me = this;
        var angle = 0;
        me.myContext.clearRect(0,0,me.width,me.height);

        me.renderTitle();
        me.renderFrame();

        for(var i=0;i<me.itemArray[0].length;i++)
        {
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
            me.myContext.strokeStyle = "#000";
            me.myContext.lineWidth = 1;

            var shoudRotate = me.itemArray[0][i].data*360/me.totalValue;
            var begin_angle = angle + me.startAngel;
            var end_angle = begin_angle + shoudRotate;
            angle += shoudRotate;

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
        }
    },

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

    onMousemove:function(evt)
    {
        var me = this;
        me.onMouse(evt,false);
    },

    onMousedown:function(evt)
    {
        var me = this;
        me.onMouse(evt,true);
    },

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
        me.msgObj.style.left = mouseX + me.totalOffsetX;
        me.msgObj.style.top = mouseY + me.totalOffsetY;
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
            me.renderChart();
        }
    },

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