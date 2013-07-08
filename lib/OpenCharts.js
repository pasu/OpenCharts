{
    inputScript('SingleFile.js');

    inputScript('BaseTypes.js');
    inputScript('Animation.js');

    inputScript('BaseTypes/Class.js');
    inputScript('BaseTypes/Point.js');
    inputScript('BaseTypes/Rect.js');

    inputScript('TextStyle.js');
    inputScript('Style.js');
    inputScript('Coordinate.js');

    inputScript('Item.js');

    inputScript('smooth.js');

    inputScript('RenderEnginer.js');

    inputScript('Charts.js');

    inputScript('Chart/AxesChart.js');
    inputScript('Chart/AreaChart.js');
    inputScript('Chart/LineChart.js');
    inputScript('Chart/PointChart.js');
    inputScript('Chart/BarChart.js');
    inputScript('Chart/BarExChart.js');
    inputScript('Chart/PieChart.js');
    inputScript('Chart/Bar3DChart.js');
    inputScript('Chart/BarEx3DChart.js');
    inputScript('Chart/CompoundChart.js');
    inputScript('Chart/StackedChart.js');
}
function inputScript(inc){
    var script='<'+'script type="text/javascript" src="../lib/OpenCharts/'+inc+'"'+'><'+'/script>';
    document.writeln(script);
}