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
    context.stroke();
    context.closePath();
};

OpenCharts.RenderEnginer.bezier = function(context,pointsArray){
    var length = pointsArray.length;
    for(var i=0;i<length-2;i++)
    {
        var x0 = pointsArray[i].x;
        var y0 = pointsArray[i].y;

        var x1 = pointsArray[i+1].x;
        var y1 = pointsArray[i+1].y;

        var x2 = pointsArray[i+2].x;
        var y2 = pointsArray[i+2].y;

        var qx = x0;
        var qy = y0;
        var px = (x0+4*x1-x2)/4;
        var py = (y0+4*y1-y2)/4;

        context.moveTo(x0,y0);
        context.bezierCurveTo(qx,qy,px,py,x1,y1);
        if(i==length-3)
        {
            var rx = (4*x1+x2-x0)/4;
            var ry = (4*y2+y2-y0)/4;
            var sx = x2;
            var sy = y2;

            context.moveTo(x1,y1);
            context.bezierCurveTo(rx,ry,sx,sy,x2,y2);
        }
        context.stroke();
    }
};