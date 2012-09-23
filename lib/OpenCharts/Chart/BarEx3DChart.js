/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/BaseTypes/Point.js
 * @requires OpenCharts/BaseTypes/Rect.js
 * @requires OpenCharts/TextStyle.js
 *@requires OpenCharts/Style.js
 * @requires OpenCharts/Item.js
 * @requires OpenCharts/RenderEnginer.js
 * @requires OpenCharts/Charts.js
 * @requires OpenCharts/BarExChart.js
 */

/**
 * Class: OpenCharts.Chart.BarEx3DChart
 * 横向3D柱状图表类。用于创建3D柱状类型的统计图表
 * Inherits from:
 *  - <OpenCharts.Chart>
 */
OpenCharts.Chart.BarEx3DChart = OpenCharts.Class(OpenCharts.Chart.BarExChart,{

    /**
     * Constructor: OpenCharts.Chart.BarChart
     *
     * Parameters:
     * div - {Obj} 外部传入canvas元素
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (div, options){
        OpenCharts.Chart.BarExChart.prototype.initialize.apply(this,
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
        var n3dRotate = 45*(Math.PI / 180);

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
                me.myContext.strokeStyle  = "#000";

                var xBegin = me.coordinateStyle.headRange;
                var yBegin = me.coordinateStyle.headRange +  ((j+1)+j*me.itemArray.length+i)*me.nXRange;
                var nHeight=me.itemArray[i][j].data / stepYValue * nYRange;
                nHeight -= nX3dRange*Math.sin(n3dRotate);


                var positionX,positionY;
                me.myContext.beginPath();
                positionX = xBegin;
                positionY = yBegin;
                me.myContext.moveTo(positionX,positionY);
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate),positionY-nX3dRange*Math.sin(n3dRotate));
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate)+nHeight*step/10,positionY-nX3dRange*Math.sin(n3dRotate));
                me.myContext.lineTo(positionX+nHeight*step/10,positionY);
                me.myContext.closePath();
                me.myContext.fill();
                me.myContext.stroke();

                me.myContext.beginPath();
                me.myContext.moveTo(positionX+nHeight*step/10,positionY);
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate)+nHeight*step/10,positionY-nX3dRange*Math.sin(n3dRotate));
                me.myContext.lineTo(positionX+nX3dRange*Math.cos(n3dRotate)+nHeight*step/10,positionY-nX3dRange*Math.sin(n3dRotate)+nXRange);
                me.myContext.lineTo(positionX+nHeight*step/10,positionY+nXRange);
                me.myContext.closePath();
                me.myContext.fill();
                me.myContext.stroke();



                me.myContext.fillRect(xBegin,yBegin,nHeight*step/10,me.nXRange);
                me.myContext.strokeRect(xBegin,yBegin,nHeight*step/10,me.nXRange);
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

    CLASS_NAME: "OpenCharts.Chart.BarExChart"
});