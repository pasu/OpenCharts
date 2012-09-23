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

/**
 * APIFunction: bspline
 * 绘制B样条曲线，效果有点勉强
 *
 * Parameters:
 * context - {Object} 绘制的canvas画布内容.
 * pointsArray - {Array(<OpenCharts.Point>)} 绘制的点串.
 *
 */
OpenCharts.RenderEnginer.bspline = function(context,pointsArray){
    pointsArray.splice(0,0,pointsArray[0]);
    pointsArray.push(pointsArray[pointsArray.length-1]);

    var i=0;
    var j = 0;
    var a0,a1,a2;
    var dt,t1,t2;
    var t_x,t_y;

    var n = pointsArray.length;
    var k = 100;
    dt=1.0/k;

    var x0 = (pointsArray[0].x+pointsArray[1].x)/2;
    var y0 = (pointsArray[0].y+pointsArray[1].y)/2;
    context.moveTo(x0,y0); //曲线起始点；

    for(i=1;i<n-1;i++)
    {
        for(j=0;j<=k;j++)
        {
            t1=j*dt;
            t2=t1*t1;

            a0=(t2-2*t1+1)/2.0;
            a1=(2*t1-2*t2+1)/2.0;
            a2=t2/2.0;

            t_x=a0*pointsArray[i-1].x+a1*pointsArray[i].x+a2*pointsArray[i+1].x;
            t_y=a0*pointsArray[i-1].y+a1*pointsArray[i].y+a2*pointsArray[i+1].y;

            context.lineTo(t_x,t_y);
        }
    }

    context.stroke();
};

/**
 * APIFunction: curve
 * 绘制曲线
 *
 * Parameters:
 * context - {Object} 绘制的canvas画布内容.
 * pointsArray - {Array(<OpenCharts.Point>)} 绘制的点串.
 *
 */
OpenCharts.RenderEnginer.curve = function(context,pointsArray){
    if(pointsArray.length<2)
        return;
    var averageLineLength, du, end, pieceCount, pieceLength, s, start, t, u, _ref, _ref2, _ref3;
    var points = [];
    var i = 0;
    for(i=0;i<pointsArray.length;i++)
    {
        points.push([pointsArray[i].x,pointsArray[i].y]);
    }
    i=0;

    var smoothConfig = {
        method: 'lanczos',
        clip: 'clamp',
        lanczosFilterSize: 2,
        cubicTension: 0
    };

    var distance = function(a, b) {
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    };
    s = Smooth(points, smoothConfig);
    averageLineLength = 1;
    pieceCount = 2;

    var i, lastIndex;

    if (points.length >= 2) {
        context.beginPath();
        context.moveTo(points[0][0],points[0][1]); //曲线起始点；
        lastIndex = points.length - 1;
        if (smoothConfig.clip === 'periodic') lastIndex++;
        for (i = 0; 0 <= lastIndex ? i < lastIndex : i > lastIndex; 0 <= lastIndex ? i++ : i--) {
            var position;
            for (t = 0, _ref = 1 / pieceCount; t < 1; t += _ref) {
                _ref2 = [s(i + t), s(i + t + 1 / pieceCount)], start = _ref2[0], end = _ref2[1];
                pieceLength = distance(start, end);
                du = averageLineLength / pieceLength;
                for (u = 0, _ref3 = 1 / pieceCount; 0 <= _ref3 ? u < _ref3 : u > _ref3; u += du) {
                    position = s(i + t + u);
                    context.lineTo(position[0],position[1]);
                }
            }
            position = s(i + 1);
            context.lineTo(position[0],position[1]);
        }
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.stroke();
    }
};