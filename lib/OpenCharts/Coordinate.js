/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

/**
 * Class: OpenCharts.Coordinate
 * 图表坐标轴风格
 */
OpenCharts.Coordinate = OpenCharts.Class({

    /**
     * APIProperty: unit
     * {String} 图表数据单位，默认为空
     */
    unit:"",

    /**
     * APIProperty: stepNumber
     * {Number} Y轴段数，默认为10
     * stepRange为-1时，采用stepNumber方式对Y轴进行分段。
     * 比如Y轴为15，分段数目为5，则每段数值为3
     * 该属性目前不支持饼图等没有坐标轴的图表类型
     */
    stepNumber:10,

    /**
     * APIProperty: stepRange
     * {Number} Y轴每段数值，默认为-1
     * stepRange为-1时，采用stepNumber方式对Y轴进行分段，否则则以stepRange来分段
     * 比如Y轴为15，每段数值为3，则会分为5段
     * 该属性目前不支持饼图等没有坐标轴的图表类型
     */
    stepRange:-1,

    /**
     * APIProperty: headRange
     * {Number} 坐标轴顶端预留空白大小，像素单位
     */
    headRange:50,

    /**
     * APIProperty: footerRange
     * {Number} 坐标轴底部预留空白大小，像素单位
     */
    footerRange:30,

    /**
     * APIProperty: headRange
     * {Number} 坐标轴顶端预留空白大小，像素单位
     */
    scaleLength:4,

    /**
     * APIProperty: bShowAxes
     * {Boolean} 是否显示坐标轴
     */
    bShowAxes:true,

    /**
     * APIProperty: bShowXAxesGrid
     * {Boolean} 是否显示X坐标轴
     */
    bShowXAxesGrid:false,

    /**
     * APIProperty: bShowYAxesGrid
     * {Boolean} 是否显示Y坐标轴
     */
    bShowYAxesGrid:true,

    /**
     * APIProperty: bShowXAxesText
     * {Boolean} 是否显示X坐标轴文字
     */
    bShowXAxesText:true,

    /**
     * APIProperty: bShowYAxesText
     * {Boolean} 是否显示Y坐标轴文字
     */
    bShowYAxesText:true,

    /**
     * APIProperty: axesStyle
     * {<OpenCharts.Style>} 坐标轴风格
     */
    axesStyle:null,

    /**
     * APIProperty: axesTextStyle
     * {<OpenCharts.TextStyle>} 坐标轴文本风格
     */
    axesTextStyle:null,

    /**
     * Constructor: OpenCharts.Coordinate
     *
     * Parameters:
     * options - {Object} 设置该类开放的属性。
     */
    initialize: function (options){
        var me = this;
        OpenCharts.Util.extend(this, options);
        me.axesStyle = new OpenCharts.Style();
        me.axesStyle.strokeStyle = "#111";
        me.axesStyle.lineWidth = 1;

        me.axesTextStyle = new OpenCharts.TextStyle();
        me.axesTextStyle.fSize  = "12px";
        me.axesStyle.fFamily = "Microsoft YaHei";
    },


    CLASS_NAME: "OpenCharts.Coordinate"
});