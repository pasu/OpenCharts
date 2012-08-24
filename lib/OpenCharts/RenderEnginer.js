/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/BaseTypes/Point.js
 * @requires OpenCharts/BaseTypes/Rect.js
 * @requires OpenCharts/TextStyle.js
 *@requires OpenCharts/Style.js
 */

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

OpenCharts.RenderEnginer.strokeRoundRect = function(context,rect,radius,style){
    context.strokeStyle = style.strokeStyle;
    context.lineWidth = style.lineWidth;

    context.beginPath();
    context.moveTo( rect.getX()+radius,rect.getY() );
    context.lineTo( rect.getRight()-radius,rect.getY() );
    context.arc( rect.getRight()-radius,rect.getY()+radius, radius, 3*Math.PI/2,2*Math.PI, false);
    context.lineTo( rect.getRight(),rect.getBottom()-radius);
    context.arc( rect.getRight()-radius,rect.getBottom()-radius, radius, 0, Math.PI/2, false);
    context.lineTo( rect.getX()+radius,rect.getBottom() );
    context.arc( rect.getX()+radius,rect.getBottom()-radius, radius, Math.PI/2, Math.PI, false);
    context.lineTo( rect.getX(),rect.getY()+radius);
    context.arc( rect.getX()+radius,rect.getY()+radius, radius,Math.PI, 3*Math.PI/2, false);
    context.closePath();
    context.stroke();
};