
OpenCharts.RenderEnginer = OpenCharts.RenderEnginer || {};

OpenCharts.RenderEnginer.renderText = function(context,strText,textStyle,position){
    context.font = textStyle.fStyle + " " + textStyle.fWeight + " " +
        textStyle.fSize + " " + textStyle.fFamily;
    context.fillStyle = textStyle.fColor;
    context.textAlign = textStyle.fTextAlign;
    if(textStyle.bFillText)
        context.fillText(strText,position.x,position.y);
    else
        context.strokeText(strText,position.x,position.y);

};

OpenCharts.RenderEnginer.renderRoundRect = function(){

};