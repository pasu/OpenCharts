
OpenCharts.Rect = OpenCharts.Class({
    x:null,
    y:null,
    width:null,
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