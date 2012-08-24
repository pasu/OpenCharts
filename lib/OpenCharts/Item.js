/**
 * @requires OpenCharts/BaseTypes/Class.js
 */

OpenCharts.Item = OpenCharts.Class({
    data:null,
    strCaption:null,
    itemStyle:null,

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