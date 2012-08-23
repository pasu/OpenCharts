/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

OpenCharts.TextStyle = OpenCharts.Class({
    fSize:null,
    fStyle:null,
    fWeight:null,
    fFamily:null,
    fColor:null,
    fTextAlign:null,
    fVisible:null,

    initialize: function (){
        var me = this;
        me.fSize = "16px";
        me.fStyle = "normal";
        me.fWeight = "normal";
        me.fFamily = "serif";
        me.fColor = "#000";
        me.fVisible = true;
        me.fTextAlign = "center";
    },

    setFontSize:function(nPixel){
        var me = this;
        me.fSize = nPixel+"px";
    },

    getFontSize:function(){
        var me = this;
        return me.fSize;
    },

    setFontStyle:function(strFontStyle){
        var me = this;
        me.fStyle = strFontStyle;
    },

    getFontStyle:function(){
        var me = this;
        return me.fStyle;
    },

    setFontWeight:function(strFontWight){
        var me = this;
        me.fWeight = strFontWight;
    },

    getFontWeight:function(){
        var me = this;
        return me.fWeight;
    },

    CLASS_NAME: "OpenCharts.TextStyle"
});