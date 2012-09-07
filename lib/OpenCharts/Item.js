/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

/**
 * Class: OpenCharts.Coordinate
 * 图表数据项
 */
OpenCharts.Item = OpenCharts.Class({

    /**
     * APIProperty: data
     * {Number} 图表数据值
     */
    data:null,

    /**
     * APIProperty: strCaption
     * {String} 图表文本描述
     */
    strCaption:null,

    /**
     * APIProperty: itemStyle
     * {String or <OpenCharts.Style>} 图表数据项风格
     * 该属性支持类的方式，也支持json方式输入，后续会支持Excel、XML等多种常用格式的继承方式
     * (code)
     *     var items = [] ;
     *     items.push({strCaption : '海淀区',data : 2,itemStyle:'#00FFFF'});
     *     var style = new OpenCharts.Style();
     *
     *      style.fillStyle = "#F00";
     *     items.push(new OpenCharts.Item(12,"朝阳",style));
     *
     *     var charts = new OpenCharts.Chart.PieChart("canvas");
     *     charts.addItems(items,"北京");
     * (end)
     */
    itemStyle:null,

    /**
     * Constructor: OpenCharts.Coordinate
     *
     * Parameters:
     * nValue - {Number} 设置图表数据值。
     * strCaption - {String} 设置图表文本描述。
     * itemStyle - {String or <OpenCharts.Style>} 设置图表数据项风格。
     */
    initialize: function (nValue,strCaption,itemStyle){
        var me = this;
        me.data = nValue;
        me.strCaption = strCaption;
        if(typeof itemStyle !== "undefined")
        {
            if(typeof itemStyle == "string")
            {
                me.itemStyle = new OpenCharts.Style;
                me.itemStyle.fillStyle = me.itemStyle.strokeStyle = itemStyle;
            }else{
                me.itemStyle = itemStyle.clone();
            }
        }else{
            me.itemStyle = new OpenCharts.Style;
        }
    },

    CLASS_NAME: "OpenCharts.Item"
});