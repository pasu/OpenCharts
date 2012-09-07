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

    initialize: function (x, y,width,height){
        var me = this;
        me.x = x;
        me.y = y;
        me.width = width;
        me.height = height;
    },

    getX:function(){
        return this.x;
    },

    getY:function(){
        return this.y;
    },

    getWidth:function(){
        return this.width;
    },

    getHeight:function(){
        return this.height;
    },

    getLeft:function(){
        return this.x;
    },

    getTop :function(){
        return this.y;
    },

    getRight  :function(){
        return this.x + this.width;
    },

    getBottom  :function(){
        return this.y + this.height;
    },
    CLASS_NAME: "OpenCharts.Rect"
});