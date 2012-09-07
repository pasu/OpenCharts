var OpenCharts = {
    /**
     * Constant: VERSION_NUMBER
     */
    VERSION_NUMBER: "Release 1.0",

    /**
     * Constant: singleFile
     */
    singleFile: true,

    /**
     * Method: _getScriptLocation
     * Return the path to this script.
     * Returns:
     * {String} Path to this script
     */
    _getScriptLocation: (function() {
        var r = new RegExp("(^|(.*?\\/))(OpenCharts[^\\/]*?\\.js)(\\?|$)"),
            s = document.getElementsByTagName('script'),
            src, m, l = "";
        for(var i=0, len=s.length; i<len; i++) {
            src = s[i].getAttribute('src');
            if(src) {
                m = src.match(r);
                if(m) {
                    l = m[1];
                    break;
                }
            }
        }
        return (function() { return l; });
    })(),

    ImgPath : ''
};
