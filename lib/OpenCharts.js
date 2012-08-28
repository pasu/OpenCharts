{
    inputScript('SingleFile.js');

    inputScript('BaseTypes/Class.js');
    inputScript('BaseTypes/Point.js');
    inputScript('BaseTypes/Rect.js');

    inputScript('TextStyle.js');
    inputScript('Style.js');
    inputScript('Coordinate.js');

    inputScript('Item.js');

    inputScript('RenderEnginer.js');

    inputScript('Charts.js');

    inputScript('Chart/AxesChart.js');
    inputScript('Chart/AreaChart.js');
    inputScript('Chart/LineChart.js');
    inputScript('Chart/PointChart.js');
}
function inputScript(inc){
    var script='<'+'script type="text/javascript" src="../lib/OpenCharts/'+inc+'"'+'><'+'/script>';
    document.writeln(script);
}