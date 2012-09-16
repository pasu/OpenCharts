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

        var step = 0;
        for(var i=0;i<me.itemArray.length;i++)
            step += me.itemArray[i].length;

        if(me.bAnimation == false)
        {
            me.renderChartByAnimation(step);
        }
        else
        {
            me.iIndex = 0;
            me.totalStep = step;
            var callBack = function(obj){
                return function(){
                    obj.renderChartByAnimation(obj.iIndex);
                    obj.iIndex ++;
                }
            }(me);

            me.queueId = OpenCharts.Animation.start(
                callBack,
                null,null
            );
        }
    },

    renderChartByAnimation:function(step){
        var me = this;

        var nXRange = me.nXRange;
        var height =  me.axesHeight;
        var nYRange = me.nYRange;
        var nYStepNumber = me.nYStepNumber;
        var stepYValue = me.stepYValue;

        me.myContext.clearRect(nXRange,me.coordinateStyle.headRange,me.width-2*nXRange,me.height-me.coordinateStyle.footerRange-me.coordinateStyle.headRange)
        me.renderAxes();

        var iStep = 0;
        var jStep = 0;
        var tempStep = 0;
        for(var i=0;i<me.itemArray.length;i++)
        {
            iStep++;
            jStep = step - tempStep;
            tempStep += me.itemArray[i].length;
            if(tempStep>=step)
                break;
        }


        for(var i=0;i<iStep;i++)
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

            var jLength = me.itemArray[i].length;
            if(i == iStep-1)
                jLength = jStep;

            if(me.smooth)
            {
                var pointsArray = [];
                for(var j=0;j<jLength;j++)
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

                for(var j=1;j<jLength;j++)
                {
                    Y = me.height - (me.itemArray[i][j].data / stepYValue * nYRange) -  me.coordinateStyle.footerRange;
                    me.myContext.lineTo(nXRange*(j+1),Y);
                }
                //me.myContext.lineTo(nXRange*(me.itemArray[i].length),me.height-me.coordinateStyle.footerRange);
                me.myContext.stroke();
            }

            me.myContext.save();
            me.myContext.fillStyle = "#FFF";
            for(var j=0;j<jLength;j++)
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

        if(me.bAnimation == true &&
            step == me.totalStep)
        {
            OpenCharts.Animation.stop(me.queueId);

            if(me.bShowLegend)
                me.renderLegend();
        }
    },

    CLASS_NAME: "OpenCharts.Chart.LineChart"
});