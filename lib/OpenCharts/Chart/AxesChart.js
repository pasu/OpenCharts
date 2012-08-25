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

OpenCharts.Chart.AxesChart = OpenCharts.Class(OpenCharts.Chart,{
    coordinateStyle:null,

    initialize: function (div, options){
        OpenCharts.Chart.prototype.initialize.apply(this,
            arguments);

        var me = this;
        me.coordinateStyle = new OpenCharts.Coordinate();
    },

    renderAxes:function(){
        var me = this;
        if(me.coordinateStyle.bShowAxes && me.itemArray != null)
        {
            var nXRange = me.width/(me.itemArray[0].length+1);
            var height =  me.height - me.coordinateStyle.headRange - me.coordinateStyle.footerRange;
            var nYRange = me.coordinateStyle.stepRange;
            var nYStepNumber;
            if( nYRange == -1){
                nYRange =height / me.coordinateStyle.stepNumber;
                nYStepNumber = me.coordinateStyle.stepNumber;
            }else
            {
                nYStepNumber = height / nYRange;
            }

            //XY轴绘制
            me.myContext.strokeStyle = me.coordinateStyle.axesStyle.strokeStyle;
            me.myContext.lineWidth = me.coordinateStyle.axesStyle.lineWidth;
            //me.myContext.beginPath();
            me.myContext.moveTo(nXRange,me.coordinateStyle.headRange );
            me.myContext.lineTo(nXRange,me.height-me.coordinateStyle.footerRange);
            me.myContext.lineTo(me.width - nXRange,me.height-me.coordinateStyle.footerRange);
            //me.myContext.closePath();
            me.myContext.stroke();

            //X刻度绘制
            for(var i=1;i<me.itemArray[0].length;i++)
            {
                me.myContext.moveTo(nXRange*(i+1),me.height-me.coordinateStyle.footerRange );
                me.myContext.lineTo(nXRange*(i+1),me.height-me.coordinateStyle.footerRange-me.coordinateStyle.scaleLength*(i%2==0?2:1));
                me.myContext.stroke();
            }

            //Y刻度绘制
            for(var j=1;j<nYStepNumber+1;j++)
            {
                me.myContext.moveTo(nXRange,me.height - me.coordinateStyle.footerRange - nYRange*j);
                me.myContext.lineTo(nXRange+me.coordinateStyle.scaleLength*(j%2==0?2:1),me.height - me.coordinateStyle.footerRange - nYRange*j);
                me.myContext.stroke();
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

    CLASS_NAME: "OpenCharts.Chart.AxesChart"
});