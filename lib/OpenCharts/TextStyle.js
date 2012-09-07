/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

/**
 * Class: OpenCharts.TextStyle
 * 文本风格类
 */
OpenCharts.TextStyle = OpenCharts.Class({

    /**
     * APIProperty: fSize
     * {String} 文字大小，比如"12px"
     */
    fSize:null,

    /**
     * APIProperty: fillStyle
     * {String} 字体风格
     */
    fStyle:null,

    /**
     * APIProperty: fWeight
     * {String} 填充颜色
     */
    fWeight:null,

    /**
     * APIProperty: fFamily
     * {String} 字体
     */
    fFamily:null,

    /**
     * APIProperty: fColor
     * {String} 字体颜色
     */
    fColor:null,

    /**
     * APIProperty: fTextAlign
     * {String} 对齐方式
     */
    fTextAlign:null,

    /**
     * APIProperty: fVisible
     * {String} 填充颜色
     */
    fVisible:null,

    /**
     * APIProperty: bFillText
     * {Boolean} true：填充方式绘制，false：边框方式绘制
     */
    bFillText:null,

    /**
     * Constructor: OpenCharts.TextStyle
     *
     */
    initialize: function (){
        var me = this;
        me.fSize = "16px";
        me.fStyle = "normal";
        me.fWeight = "normal";
        me.fFamily = "serif";
        me.fColor = "#000";
        me.fVisible = true;
        me.fTextAlign = "center";
        me.bFillText = true;
    },

    /**
     * APIMethod: setFontSize
     * 设置文字大小。
     *
     * Parameters:
     * nPixel - {Number} 字体大小。
     */
    setFontSize:function(nPixel){
        var me = this;
        me.fSize = nPixel+"px";
    },

    /**
     * APIMethod: getFontSize
     * 获取文字大小。
     *
     * Returns:
     * {String} 返回字体大小
     */
    getFontSize:function(){
        var me = this;
        return me.fSize;
    },

    /**
     * APIMethod: setFontStyle
     * 设置文字风格。
     *
     * Parameters:
     * strFontStyle - {String} 字体风格。
     */
    setFontStyle:function(strFontStyle){
        var me = this;
        me.fStyle = strFontStyle;
    },

    /**
     * APIMethod: getFontStyle
     * 获取文字风格。
     *
     * Returns:
     * {String} 返回字体风格
     */
    getFontStyle:function(){
        var me = this;
        return me.fStyle;
    },

    /**
     * APIMethod: setFontWeight
     * 设置文字加粗。
     *
     * Parameters:
     * strFontWight - {String} 粗体风格。
     */
    setFontWeight:function(strFontWight){
        var me = this;
        me.fWeight = strFontWight;
    },

    /**
     * APIMethod: getFontWeight
     * 返回文字粗体风格。
     *
     * Returns:
     * {String} 返回粗体风格。
     */
    getFontWeight:function(){
        var me = this;
        return me.fWeight;
    },

    CLASS_NAME: "OpenCharts.TextStyle"
});