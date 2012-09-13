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
 * Class: OpenCharts.Chart.AxesChart
 * 坐标轴图表类。面积、点、线统计图表都基于此类
 * Inherits from:
 *  - <OpenCharts.Chart>
 */
OpenCharts.Chart.AxesChart = OpenCharts.Class(OpenCharts.Chart,{

    /**
     * APIProperty: coordinateStyle
     * {<OpenCharts.Coordinate>} 坐标轴风格
     */
    coordinateStyle:null,

    /**
     * APIProperty: dotStyle
     * {<OpenCharts.Style>} 数据绘制圆的风格
     */
    dotStyle:null,

    /**
     * APIProperty: dotRadius
     * {<Number>} 数据绘制圆的风格
     */
    dotRadius:4,

    /**
     * Property: nXRange
     * {Number} x轴单位坐标值
     */
    nXRange:null,

    /**
     * Property: axesHeight
     * {Number} 坐标轴高度
     */
    axesHeight:null,

    /**
     * Property: nYRange
     * {Number} y轴单位坐标值
     */
    nYRange:null,

    /**
     * Property: nYStepNumber
     * {Number} y轴段数
     */
    nYStepNumber:null,

    /**
     * Property: stepYValue
     * {Number} Y轴每段大小
     */
    stepYValue:null,

    /**
     * Constructor: OpenCharts.Chart.AxesChart
     *
     * Parameters:
     * div - {Obj} 外部传入canvas元素
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (div, options){
        OpenCharts.Chart.prototype.initialize.apply(this,
            arguments);

        var me = this;
        me.coordinateStyle = new OpenCharts.Coordinate();
    },

    /**
     * Method: renderAxes
     * 绘制坐标轴
     */
    renderAxes:function(){
        var me = this;
        if(me.coordinateStyle.bShowAxes && me.itemArray != null)
        {
            var nXRange = me.nXRange;
            var height =  me.axesHeight;
            var nYRange = me.nYRange;
            var nYStepNumber = me.nYStepNumber;

            //XY轴绘制
            me.myContext.strokeStyle = me.coordinateStyle.axesStyle.strokeStyle;
            me.myContext.lineWidth = me.coordinateStyle.axesStyle.lineWidth;
            //me.myContext.beginPath();
            me.myContext.moveTo(nXRange,me.coordinateStyle.headRange );
            me.myContext.lineTo(nXRange,me.height-me.coordinateStyle.footerRange);
            me.myContext.lineTo(me.width - nXRange,me.height-me.coordinateStyle.footerRange);
            me.myContext.stroke();
            //me.myContext.closePath();

            {
                me.myContext.save();
                me.myContext.lineWidth = 1;
                me.myContext.strokeStyle  = "#dbe1e1";
                me.myContext.globalCompositeOperation = "destination-over";

                //X刻度绘制
                if(me.coordinateStyle.bShowXAxesGrid)
                {
                    for(var i=1;i<me.itemArray[0].length;i++)
                    {
                        me.myContext.beginPath();
                        me.myContext.moveTo(nXRange*(i+1),me.height-me.coordinateStyle.footerRange );
                        me.myContext.lineTo(nXRange*(i+1),me.coordinateStyle.headRange);
                        me.myContext.stroke();
                        me.myContext.closePath();
                    }
                }

                if(me.coordinateStyle.bShowYAxesGrid)
                {
                    //Y刻度绘制
                    for(var j=1;j<nYStepNumber+1;j++)
                    {
                        me.myContext.beginPath();
                        me.myContext.moveTo(nXRange,me.height - me.coordinateStyle.footerRange - nYRange*j);
                        me.myContext.lineTo(me.width - nXRange,me.height - me.coordinateStyle.footerRange - nYRange*j);
                        me.myContext.stroke();
                        me.myContext.closePath();
                    }
                }

                me.myContext.restore();

            }


            //X刻度绘制
            for(var i=1;i<me.itemArray[0].length;i++)
            {
                me.myContext.beginPath();
                me.myContext.moveTo(nXRange*(i+1),me.height-me.coordinateStyle.footerRange );
                me.myContext.lineTo(nXRange*(i+1),me.height-me.coordinateStyle.footerRange-me.coordinateStyle.scaleLength*(i%2==0?2:1));
                me.myContext.stroke();
                me.myContext.closePath();
            }

            //Y刻度绘制
            for(var j=1;j<nYStepNumber+1;j++)
            {
                me.myContext.beginPath();
                me.myContext.moveTo(nXRange,me.height - me.coordinateStyle.footerRange - nYRange*j);
                me.myContext.lineTo(nXRange+me.coordinateStyle.scaleLength*(j%2==0?2:1),me.height - me.coordinateStyle.footerRange - nYRange*j);
                me.myContext.stroke();
                me.myContext.closePath();
            }



            //Text Prepare to Draw
            me.myContext.font = me.coordinateStyle.axesTextStyle.fStyle + " " + me.coordinateStyle.axesTextStyle.fWeight + " " +
                me.coordinateStyle.axesTextStyle.fSize + " " + me.coordinateStyle.axesTextStyle.fFamily;
            me.myContext.fillStyle = me.coordinateStyle.axesTextStyle.fColor;
            me.myContext.textAlign = me.coordinateStyle.axesTextStyle.fTextAlign;
            //X轴文字
            if(me.coordinateStyle.bShowXAxesText)
            {
                if(me.coordinateStyle.axesTextStyle.bFillText)
                {
                    for(var i=0;i<me.itemArray[0].length;i++)
                    {
                        me.myContext.fillText(me.itemArray[0][i].strCaption,nXRange*(i+1),me.height-me.coordinateStyle.footerRange+15 );
                    }

                }
                else
                {
                    for(var i=0;i<me.itemArray[0].length;i++)
                    {
                        me.myContext.strokeText(me.itemArray[0][i].strCaption,nXRange*(i+1),me.height-me.coordinateStyle.footerRange+me.coordinateStyle.axesTextStyle.fSize);
                    }
                }
            }

            //Y轴文字
            if(me.coordinateStyle.bShowYAxesText)
            {
                var stepYValue = Math.ceil(me.getMaxValue()/nYStepNumber);
                if(nXRange<50)
                    me.myContext.textAlign = "left";
                else
                    me.myContext.textAlign = "right";
                if(me.coordinateStyle.axesTextStyle.bFillText)
                {
                    for(var j=0;j<nYStepNumber+1;j++)
                    {
                        me.myContext.fillText(stepYValue*j,nXRange*0.9,me.height-me.coordinateStyle.footerRange-nYRange*j );
                    }

                }
                else
                {
                    for(var j=0;j<nYStepNumber+1;j++)
                    {
                        me.myContext.strokeText(stepYValue*j,nXRange*0.9,me.height-me.coordinateStyle.footerRange-nYRange*j );
                    }
                }
            }
        }
    },

    /**
     * Method: calculateValue
     * 计算图表绘制所需数值
     */
    calculateValue:function(){
        var me = this;
        me.nXRange = me.width/(me.itemArray[0].length+1);
        me.axesHeight =  me.height - me.coordinateStyle.headRange - me.coordinateStyle.footerRange;
        me.nYRange = me.coordinateStyle.stepRange;

        if( me.nYRange == -1){
            me.nYRange =me.axesHeight / me.coordinateStyle.stepNumber;
            me.nYStepNumber = me.coordinateStyle.stepNumber;
        }else
        {
            me.nYStepNumber = me.axesHeight / me.nYRange;
        }
        me.stepYValue = Math.ceil(me.getMaxValue()/me.nYStepNumber);
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
        var bXInRange = pointX>=me.nXRange && pointX<=(me.width-me.nXRange);
        var bYInRange = pointY>=me.coordinateStyle.headRange && pointY<=(me.height-me.coordinateStyle.footerRange);
        if(!bXInRange || !bYInRange)
            return null;

        var nType = "Area1";
        if(selectType != undefined)
            nType = selectType;
        var x = Math.round(pointX / me.nXRange) - 1;
        var itemSelectedArray = [];
        for(var i=0;i<me.itemArray.length;i++)
        {
            var Y = me.height - (me.itemArray[i][x].data / me.stepYValue * me.nYRange) -  me.coordinateStyle.footerRange;
            if(nType == "Area")
            {
                //itemSelectedArray.push({strCaption : me.itemArray[i][x].strCaption,data : me.itemArray[i][x].data,positionX:(x+1)*me.nXRange,positionY:Y});
                itemSelectedArray.push({indexX:i,indexY:x,positionX:(x+1)*me.nXRange,positionY:Y});
            }
            else
            {
                if(Math.abs(Y-pointY)<5 && Math.abs((x+1)*me.nXRange-pointX)<5)
                {
                    //itemSelectedArray.push({strCaption : me.itemArray[i][x].strCaption,data : me.itemArray[i][x].data,positionX:(x+1)*me.nXRange,positionY:Y});
                    itemSelectedArray.push({indexX:i,indexY:x,positionX:(x+1)*me.nXRange,positionY:Y});
                }
            }
        }
        return itemSelectedArray;
    },

    /**
     * APIMethod: onMouse
     * 鼠标事件
     * Parameters:
     * evt - {Object} 鼠标点击事件。
     */
    onMouse:function(evt){
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
        var strokecolor = "#FFF";
        var areaStyle = me.itemArray[items[0].indexX][0].itemStyle;
        if(typeof areaStyle == "string")
        {
            strokecolor = areaStyle;
        }
        else
        {
            strokecolor = areaStyle.fillStyle;
        }
        me.msgObj.style.borderColor= strokecolor;
        me.msgObj.className = "message";
        var value = items[0].positionX + me.totalOffsetX;
        me.msgObj.style.left = value + "px";
        value = items[0].positionY + me.totalOffsetY;
        me.msgObj.style.top = value + "px";
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
    },

    CLASS_NAME: "OpenCharts.Chart.AxesChart"
});