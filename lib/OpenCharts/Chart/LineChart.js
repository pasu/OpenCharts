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
 * Class: OpenCharts.Chart.LineChart
 * 面积图表类。用于创建面积类型的统计图表
 * Inherits from:
 *  - <OpenCharts.Chart.AxesChart>
 */
OpenCharts.Chart.LineChart = OpenCharts.Class(OpenCharts.Chart.AxesChart,{

    /**
     * APIProperty: smooth
     * {Boolean>} 曲线是否平滑
     */
    smooth:false,

    /**
     * Constructor: OpenCharts.Chart.LineChart
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

        var nXRange = me.nXRange;
        var height =  me.axesHeight;
        var nYRange = me.nYRange;
        var nYStepNumber = me.nYStepNumber;
        var stepYValue = me.stepYValue;

        for(var i=0;i<me.itemArray.length;i++)
        {
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
            if(me.smooth)
            {
                var pointsArray = [];
                for(var j=0;j<me.itemArray[i].length;j++)
                {
                    var Y = me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
                    pointsArray.push(new OpenCharts.Point(nXRange*(j+1),Y));
                }
                OpenCharts.RenderEnginer.bezier(me.myContext,pointsArray);
            }
            else
            {
                me.myContext.beginPath();
                //me.myContext.moveTo(nXRange,me.height-me.coordinateStyle.footerRange);
                var Y = me.height - (me.itemArray[i][0].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
                me.myContext.moveTo(nXRange*1,Y);
                for(var j=1;j<me.itemArray[i].length;j++)
                {
                    Y = me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
                    me.myContext.lineTo(nXRange*(j+1),Y);
                }
                //me.myContext.lineTo(nXRange*(me.itemArray[i].length),me.height-me.coordinateStyle.footerRange);
                me.myContext.stroke();
            }

            me.myContext.save();
            me.myContext.fillStyle = "#FFF";
            for(var j=0;j<me.itemArray[i].length;j++)
            {
                me.myContext.beginPath();
                var Y = me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
                me.myContext.arc(nXRange*(j+1),Y, 4, 0, Math.PI * 2, true);
                me.myContext.closePath();
                me.myContext.fill();
                me.myContext.stroke();
            }
            me.myContext.restore();
        }
    },

    CLASS_NAME: "OpenCharts.Chart.LineChart"
});