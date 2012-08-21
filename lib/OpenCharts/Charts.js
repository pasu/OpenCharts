OpenCharts.Chart = OpenCharts.Class({
    nType:null,

    width:null,
    height:null,

    myCanvas:null,
    initialize: function (div, options){
        alert(1);
        var me = this;
        me.myCanvas = document.getElementById(div);
        this.width = options.width;
        this.height = options.height;
    },

    render:function(){
        var me = this;
        var context =  me.myCanvas.getContext("2d");
        context.fillStyle ='rgba(255,0,0,.3)';//填充颜色：红色，半透明
        context.strokeStyle ='hsl(120,50%,50%)';//线条颜色：绿色
        context.lineWidth = 13;//设置线宽
        context.beginPath();
        context.moveTo(200,100);
        context.lineTo(100,200);
        context.lineTo(300,200);
        context.closePath();//可以把这句注释掉再运行比较下不同
        context.stroke();//画线框
        context.fill();//填充颜色
    },

    CLASS_NAME: "OpenCharts.Chart"
});