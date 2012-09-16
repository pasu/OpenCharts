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
 * Class: OpenCharts.Chart.AreaChart
 * 面积图表类。用于创建面积类型的统计图表
 * Inherits from:
 *  - <OpenCharts.Chart.AxesChart>
 */
OpenCharts.Chart.AreaChart = OpenCharts.Class(OpenCharts.Chart.AxesChart,{

    /**
     * Constructor: OpenCharts.Chart.AreaChart
     *
     * Parameters:
     * div - {Obj} 外部传入canvas元素
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (div, options){
        OpenCharts.Chart.AxesChart.prototype.initialize.apply(this,
            arguments);
    },

    /**
     * Method: destroy
     * Destroy is a destructor: this is to alleviate cyclic references which
     *     the Javascript garbage cleaner can not take care of on its own.
     */
    destroy: function() {

    },

    /**
     * Method: renderChart
     * 渲染面积统计图表
     */
    renderChart:function(){
        var me = this;
        me.renderAxes();

        if(me.bAnimation == false)
        {
            for(var i=0;i<me.itemArray.length;i++)
            {
                me.renderChartByAnimation(i);
            }
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

    renderChartByAnimation:function(i){
        var me = this;

        var nXRange = me.nXRange;
        var height =  me.axesHeight;
        var nYRange = me.nYRange;
        var nYStepNumber = me.nYStepNumber;
        var stepYValue = me.stepYValue;

        var areaStyle = me.itemArray[i][0].itemStyle;
        if(typeof areaStyle == "string")
        {
            me.myContext.strokeStyle = areaStyle;
            me.myContext.lineWidth = 1;
            me.myContext.fillStyle = areaStyle;
        } else if(areaStyle === undefined)
        {
            me.myContext.strokeStyle = "#" + i.toString() + i.toString() + i.toString();
            me.myContext.lineWidth = 1;
            me.myContext.fillStyle = me.myContext.strokeStyle;
        }
        else
        {
            me.myContext.strokeStyle = areaStyle.strokestrokeStyle;
            me.myContext.lineWidth = areaStyle.lineWidth;
            me.myContext.fillStyle = areaStyle.fillStyle;
        }

        me.myContext.globalAlpha = 0.3;
        me.myContext.beginPath();
        me.myContext.moveTo(nXRange,me.height-me.coordinateStyle.footerRange);
        for(var j=0;j<me.itemArray[i].length;j++)
        {
            var Y = me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
            me.myContext.lineTo(nXRange*(j+1),Y);
        }
        me.myContext.lineTo(nXRange*(me.itemArray[i].length),me.height-me.coordinateStyle.footerRange);
        me.myContext.closePath();
        me.myContext.fill();
        me.myContext.globalAlpha = 1;

        me.myContext.beginPath();
        me.myContext.moveTo(nXRange,me.height-me.coordinateStyle.footerRange);
        for(var j=0;j<me.itemArray[i].length;j++)
        {
            var Y = me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
            me.myContext.lineTo(nXRange*(j+1),Y);
        }
        me.myContext.lineTo(nXRange*(me.itemArray[i].length),me.height-me.coordinateStyle.footerRange);
        me.myContext.stroke();

        me.myContext.save();
        if(me.dotStyle == null)
        {
            me.myContext.fillStyle = "#FFF";
        }
        else
        {
            nRadius = me.dotStyle.lineWidth;
            me.myContext.fillStyle = me.dotStyle.fillStyle;
            me.myContext.strokeStyle = me.dotStyle.strokeStyle;
            me.myContext.lineWidth = me.dotStyle.lineWidth;
        }

        for(var j=0;j<me.itemArray[i].length;j++)
        {
            me.myContext.beginPath();
            var Y = me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
            me.myContext.arc(nXRange*(j+1),Y, me.dotRadius, 0, Math.PI * 2, true);
            me.myContext.closePath();
            me.myContext.fill();
            me.myContext.stroke();
        }
        me.myContext.restore();

        if(me.bAnimation == true &&
            me.iIndex ==me.itemArray.length-1 )
        {
            OpenCharts.Animation.stop(me.queueId);

            if(me.bShowLegend)
                me.renderLegend();
        }
    },

    CLASS_NAME: "OpenCharts.Chart.AreaChart"
});