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
 * Class: OpenCharts.Chart.BarChart
 * 复合图表。用于创建统计图表集合
 */
OpenCharts.Chart.CompoundChart = OpenCharts.Class({

    /**
     * Property: itemArray
     * {Array(OpenCharts.Charts)}
     */
    itemArray:null,
    /**
     * Constructor: OpenCharts.Chart.CompoundChart
     *
     */
    initialize: function (){
        this.itemArray = [];
    },

    /**
     * APIMethod: addCharts
     * 获取点击点所在的图表子项
     * Parameters:
     * chartItem - {OpenCharts.Chart} 鼠标相对canvas所在X位置。
     */
    addCharts:function(chartItem){
        var me = this;
        chartItem.bAnimation = false;
        chartItem.bShowLegend = false;
        if(me.itemArray.length>0)
        {
            chartItem.coordinateStyle.bShowAxes = false;
        }
        me.itemArray.push(chartItem);
    },

    /**
     * Method: renderChart
     * 渲染柱状统计图表
     */
    render:function(){
        var me = this;
        var i = 0;
        me.itemArray[i].render();
        for(i=1;i<me.itemArray.length;i++)
        {
            me.itemArray[i].calculateValue();
            me.itemArray[i].renderChart();
        }
    },

    CLASS_NAME: "OpenCharts.Chart.CompoundChart"
});