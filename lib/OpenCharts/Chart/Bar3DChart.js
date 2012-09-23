/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/BaseTypes/Point.js
 * @requires OpenCharts/BaseTypes/Rect.js
 * @requires OpenCharts/TextStyle.js
 *@requires OpenCharts/Style.js
 * @requires OpenCharts/Item.js
 * @requires OpenCharts/RenderEnginer.js
 * @requires OpenCharts/Charts.js
 * @requires OpenCharts/BarChart.js
 */

/**
 * Class: OpenCharts.Chart.Bar3DChart
 * 3D柱状图表类。用于创建柱状类型的统计图表
 * Inherits from:
 *  - <OpenCharts.BarChart>
 */
OpenCharts.Chart.Bar3DChart = OpenCharts.Class(OpenCharts.Chart.BarChart,{
    /**
     * Constructor: OpenCharts.Chart.BarChart
     *
     * Parameters:
     * div - {Obj} 外部传入canvas元素
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (div, options){
        OpenCharts.Chart.BarChart.prototype.initialize.apply(this,
            arguments);
    },

    renderChartByAnimation:function(step){
        var me = this;

        var nXRange = me.nXRange;
        var height =  me.axesHeight;
        var nYRange = me.nYRange;
        var nYStepNumber = me.nYStepNumber;
        var stepYValue = me.stepYValue;

        var nX3dRange = nXRange/2;
        var n3dRotate = 30*(Math.PI / 180);

        for(var i=0;i<me.itemArray.length;i++)
        {
            for(var j=0;j<me.itemArray[i].length;j++)
            {
                var barStyle = me.itemArray[i][j].itemStyle;
                if(typeof barStyle == "string")
                {
                    me.myContext.strokeStyle = barStyle;
                    me.myContext.lineWidth = 1;
                    me.myContext.fillStyle = barStyle;
                } else if(barStyle === undefined)
                {
                    me.myContext.strokeStyle = "#" + i.toString() + i.toString() + i.toString();
                    me.myContext.lineWidth = 1;
                    me.myContext.fillStyle = me.myContext.strokeStyle;
                }
                else
                {
                    me.myContext.strokeStyle = barStyle.strokestrokeStyle;
                    me.myContext.lineWidth = barStyle.lineWidth;
                    me.myContext.fillStyle = barStyle.fillStyle;
                }
                me.myContext.strokeStyle = "#000"

                var xBegin= (1+(j+1)+j*me.itemArray.length+i)*me.nXRange;

                var yBegin=me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
                var nHeight=me.itemArray[i][j].data / stepYValue * nYRange;
                nHeight -= nX3dRange*Math.sin(n3dRotate);

                var positionX,positionY;
                me.myContext.beginPath();
                positionX = xBegin;
                positionY = yBegin+nHeight*(1-step/10) + nX3dRange*Math.sin(n3dRotate);
                me.myContext.moveTo(positionX,positionY);
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate),positionY-nX3dRange*Math.sin(n3dRotate));
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate)+nXRange,positionY-nX3dRange*Math.sin(n3dRotate));
                me.myContext.lineTo(positionX+nXRange,positionY);
                me.myContext.closePath();
                me.myContext.fill();
                me.myContext.stroke();

                me.myContext.beginPath();
                me.myContext.moveTo(positionX+nXRange,positionY);
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate)+nXRange,positionY-nX3dRange*Math.sin(n3dRotate));
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate)+nXRange,positionY-nX3dRange*Math.sin(n3dRotate)+nHeight*step/10);
                me.myContext.lineTo(positionX+nXRange,positionY+nHeight*step/10);
                me.myContext.closePath();
                me.myContext.fill();
                me.myContext.stroke();

                me.myContext.fillRect(xBegin,yBegin+nHeight*(1-step/10)+nX3dRange*Math.sin(n3dRotate),me.nXRange,nHeight*step/10);
                me.myContext.strokeRect(xBegin,yBegin+nHeight*(1-step/10)+nX3dRange*Math.sin(n3dRotate),me.nXRange,nHeight*step/10);
            }
        }

        if(me.bAnimation == true &&
            step == 10)
        {
            OpenCharts.Animation.stop(me.queueId);

            if(me.bShowLegend)
                me.renderLegend();
        }
    },

    CLASS_NAME: "OpenCharts.Chart.BarChart"
});