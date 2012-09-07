/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

/**
 * Class: OpenCharts.Style
 * 图形风格类
 */
OpenCharts.Style = OpenCharts.Class({

    /**
     * APIProperty: fillStyle
     * {String} 填充颜色
     */
    fillStyle: "#000",

    /**
     * APIProperty: strokeStyle
     * {String} 线颜色
     */
    strokeStyle:"#000",

    /**
     * APIProperty: lineWidth
     * {Number} 线宽度
     */
    lineWidth:1,

    /**
     * APIProperty: 绘制的透明度
     * {Number} 透明度
     */
    globalAlpha : 1,

    /**
     * Constructor: OpenCharts.Style
     *
     * Parameters:
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (options){
        var me = this;
        OpenCharts.Util.extend(this, options);
    },

    /**
     * Method: clone
     * 复制当前 style 对象。
     *
     * Returns:
     * {<OpenCharts.Style>} 返回一个克隆的style
     */
    clone:function(){
        var options = OpenCharts.Util.extend({}, this);
        return new OpenCharts.Style(options);
    },

    CLASS_NAME: "OpenCharts.Style"
});