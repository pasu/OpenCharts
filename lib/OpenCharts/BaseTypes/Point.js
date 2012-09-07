/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

/**
 * Class: OpenCharts.Point
 * 此类用x,y坐标描述屏幕上的坐标点。
 */
OpenCharts.Point = OpenCharts.Class({

    /**
     * APIProperty: x
     * {Number} x坐标
     */
    x:0.0,

    /**
     * APIProperty: y
     * {Number} y坐标
     */
    y:0.0,

    /**
     * Constructor: OpenCharts.Point
     * 创建新的OpenCharts.Point实例,如：
     * (start code)
     *  var pnt = new OpenCharts.Point(21,25);
     * (end)
     *
     * Parameters:
     * x - {Number} x坐标
     * y - {Number} y坐标
     *
     * Returns:
     * 返回OpenCharts.Point实例
     */
    initialize: function (x, y){
        var me = this;
        me.x = x;
        me.y = y;
    },

    /**
     * APIMethod: clone
     * 克隆的当前的point对象。
     *
     * Returns:
     * {<OpenCharts.Point>} 表示point的字符串。例如:"x=200.4,y=242.2"
     */
    clone:function() {
        return new OpenCharts.Point(this.x, this.y);
    },

    CLASS_NAME: "OpenCharts.Point"
});