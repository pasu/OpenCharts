/**
 * @requires OpenCharts/SingleFile.js
 */

/**
 * Constructor: OpenCharts.Class
 * 基类。
 *
 * 创建一个新的OpenCharts类，如下所示：
 * (code)
 *     var MyClass = new OpenCharts.Class(prototype);
 * (end)
 *
 * 创建一个新的有多个继承类的OpenCharts类，如下所示:
 * (code)
 *     var MyClass = new OpenCharts.Class(Class1, Class2, prototype);
 * (end)
 */
OpenCharts.Class = function() {
    var len = arguments.length;
    var P = arguments[0];
    var F = arguments[len-1];

    var C = typeof F.initialize == "function" ?
        F.initialize :
        function(){ P.prototype.initialize.apply(this, arguments); };

    if (len > 1) {
        var newArgs = [C, P].concat(
            Array.prototype.slice.call(arguments).slice(1, len-1), F);
        OpenCharts.inherit.apply(null, newArgs);
    } else {
        C.prototype = F;
    }
    return C;
};

/**
 * Function: OpenCharts.inherit
 *
 * Parameters:
 * C - {Object} the class that inherits
 * P - {Object} the superclass to inherit from
 *
 * In addition to the mandatory C and P parameters, an arbitrary number of
 * objects can be passed, which will extend C.
 */
OpenCharts.inherit = function(C, P) {
    var F = function() {};
    F.prototype = P.prototype;
    C.prototype = new F;
    var i, l, o;
    for(i=2, l=arguments.length; i<l; i++) {
        o = arguments[i];
        if(typeof o === "function") {
            o = o.prototype;
        }
        OpenCharts.Util.extend(C.prototype, o);
    }
};

/**
 * APIFunction: extend
 * 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
 * Parameters:
 * destination - {Object} 目标对象。
 * source - {Object} 源对象，其属性将被设置到目标对象上。
 * Returns:
 * {Object} 目标对象。
 */
OpenCharts.Util = OpenCharts.Util || {};
OpenCharts.Util.extend = function(destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        var sourceIsEvt = typeof window.Event == "function"
            && source instanceof window.Event;

        if (!sourceIsEvt
            && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};

