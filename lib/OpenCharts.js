{
    inputScript('SingleFile.js');
    inputScript('BaseTypes/Class.js');
    inputScript('BaseTypes/Point.js');

    inputScript('TextStyle.js');

    inputScript('Charts.js');
}
function inputScript(inc){
    var script='<'+'script type="text/javascript" src="../lib/OpenCharts/'+inc+'"'+'><'+'/script>';
    document.writeln(script);
}