/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

/**
 * Class: OpenCharts.Rect
 * 此类用x,y,width,height描述屏幕上的矩形区域。
 */
OpenCharts.Rect = OpenCharts.Class({

    /**
     * APIProperty: x
     * {Number} x坐标
     */
    x:0.0,

    /**
     * APIProperty: y
     * {Number} x坐标
     */
    y:0.0,

    /**
     * APIProperty: width
     * {Number} 宽度
     */
    width:0.0,

    /**
     * APIProperty: height
     * {Number} 高度
     */
    height:null,

    /**
     * Constructor: OpenCharts.Rect
     * 创建新的OpenCharts.Rect,如：
     * (start code)
     *  var rect = new OpenCharts.Rect(0,0,256,256);
     * (end)
     *
     * Parameters:
     * x - {Number} x坐标
     * y - {Number} y坐标
     * width - {Number} 宽度
     * height - {Number} 高度
     *
     * Returns:
     * 返回OpenCharts.Rect实例
     */
    initialize: function (x, y,width,height){
        var me = this;
        me.x = x;
        me.y = y;
        me.width = width;
        me.height = height;
    },

    /**
     * APIMethod: getX
     *
     * Returns:
     * {Number} 返回矩形左上角点x坐标.
     */
    getX:function(){
        return this.x;
    },

    /**
     * APIMethod: getY
     *
     * Returns:
     * {Number} 返回矩形左上角点y坐标.
     */
    getY:function(){
        return this.y;
    },

    /**
     * APIMethod: getWidth
     *
     * Returns:
     * {Number} 返回矩形宽度.
     */
    getWidth:function(){
        return this.width;
    },

    /**
     * APIMethod: getHeight
     *
     * Returns:
     * {Number} 返回矩形高度.
     */
    getHeight:function(){
        return this.height;
    },

    /**
     * APIMethod: getLeft
     *
     * Returns:
     * {Number} 返回左侧坐标.
     */
    getLeft:function(){
        return this.x;
    },

    /**
     * APIMethod: getTop
     *
     * Returns:
     * {Number} 返回上侧坐标.
     */
    getTop :function(){
        return this.y;
    },

    /**
     * APIMethod: getRight
     *
     * Returns:
     * {Number} 返回矩形右侧坐标.
     */
    getRight  :function(){
        return this.x + this.width;
    },

    /**
     * APIMethod: getBottom
     *
     * Returns:
     * {Number} 返回矩形下侧坐标.
     */
    getBottom  :function(){
        return this.y + this.height;
    },

    CLASS_NAME: "OpenCharts.Rect"
});