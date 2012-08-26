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

OpenCharts.Chart.AreaChart = OpenCharts.Class(OpenCharts.Chart.AxesChart,{

    initialize: function (div, options){
        OpenCharts.Chart.AxesChart.prototype.initialize.apply(this,
            arguments);
    },

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
            me.myContext.closePath();
            me.myContext.stroke();

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

    CLASS_NAME: "OpenCharts.Chart.AreaChart"
});