/**
 * @requires OpenCharts/BaseTypes/Class.js
 * @requires OpenCharts/BaseTypes/Point.js
 * @requires OpenCharts/BaseTypes/Rect.js
 * @requires OpenCharts/TextStyle.js
 *@requires OpenCharts/Style.js
 */

/**
 * Namespace: OpenCharts.RenderEnginer
 * Canvas渲染引擎绘制
 */
OpenCharts.RenderEnginer = OpenCharts.RenderEnginer || {};

/**
 * APIFunction: renderText
 * 绘制文本
 *
 * Parameters:
 * context - {Object} 绘制的canvas画布内容.
 * strText - {String} 绘制的字符串.
 * textStyle - {<OpenCharts.TextStyle>} 绘制的字符串文本风格.
 * position - {<OpenCharts.Point>} 绘制的字符串位置.
 *
 */
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

/**
 * APIFunction: strokeRoundRect
 * 绘制圆角矩形
 *
 * Parameters:
 * context - {Object} 绘制的canvas画布内容.
 * rect - {<OpenCharts.Rect>} 绘制的矩形.
 * radius - {Number} 圆角的半径.
 * style - {<OpenCharts.Style>} 绘制的圆角矩形风格.
 *
 */
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

/**
 * APIFunction: bezier
 * 绘制贝塞尔曲线，效果有点勉强
 *
 * Parameters:
 * context - {Object} 绘制的canvas画布内容.
 * pointsArray - {Array(<OpenCharts.Point>)} 绘制的点串.
 *
 */
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