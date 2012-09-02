OpenCharts.String = {

    /**
     * APIFunction: startsWith
     * 判断目标字符串是否以指定的子字符串开头.
     *
     * Parameters:
     * str - {String} 目标字符串.
     * sub - {String} 查找的子字符串.
     *
     * Returns:
     * {Boolean} 目标字符串以指定的子字符串开头,则返回true;否则返回false.
     */
    startsWith: function(str, sub) {
        return (str.indexOf(sub) == 0);
    },

    /**
     * APIFunction: contains
     * 判断目标字符串是否包含指定的子字符串.
     *
     * Parameters:
     * str - {String} 目标字符串.
     * sub - {String} 查找的子字符串.
     *
     * Returns:
     * {Boolean} 目标字符串中包含指定的子字符串,则返回true;否则返回false.
     */
    contains: function(str, sub) {
        return (str.indexOf(sub) != -1);
    },

    /**
     * APIFunction: trim
     * 删除一个字符串的开头和结尾处的所有空白字符.
     *
     * Parameters:
     * str - {String} (可能)存在空白字符填塞的字符串.
     *
     * Returns:
     * {String} 删除开头和结尾处空白字符后的字符串.
     */
    trim: function(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },

    /**
     * APIFunction: camelize
     * 骆驼式("-")连字符的字符串处理.
     * 例如: "chicken-head" becomes "chickenHead",
     *       "-chicken-head" becomes "ChickenHead".
     *
     * Parameters:
     * str - {String} 要处理的字符串,原始内容不应被修改.
     *
     * Returns:
     * {String}
     */
    camelize: function(str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i=1, len=oStringList.length; i<len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },

    /**
     * APIFunction: format
     * 提供带 ${token} 标记的字符串, 返回context对象属性中指定标记的属性值.
     *
     * 示例:1、template = "${value,getValue}";
     *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
     *         args = [2,23,12,36,21];
     *       返回值:36
     * 示例:2、template = "$${{value,getValue}}";
     *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
     *         args = [2,23,12,36,21];
     *       返回值:"${36}"
     * 示例:3、template = "${a,b}";
     *         context = {a: {b:"format"}};
     *         args = null;
     *       返回值:"format"
     * 示例:3、template = "${a,b}";
     *         context = null;
     *         args = null;
     *       返回值:"${a.b}"
     * Parameters:
     * template - {String} 带标记的字符串将要被替换.
     *                     参数 template 格式为"${token}",此处的 token 标记会替换为 context["token"] 属性的值
     * context - {Object} 带有属性的可选对象的属性用于匹配格式化字符串中的标记.
     *                    如果该参数为空,将使用 window 对象.
     * args - {Array} 可选参数传递给在context对象上找到的函数.
     *
     * Returns:
     * {String} 从 context 对象属性中替换字符串标记位的字符串.
     */
    format: function(template, context, args) {
        if(!context) {
            context = window;
        }

        // Example matching:
        // str   = ${foo.bar}
        // match = foo.bar
        var replacer = function(str, match) {
            var replacement;

            // Loop through all subs. Example: ${a.b.c}
            // 0 -> replacement = context[a];
            // 1 -> replacement = context[a][b];
            // 2 -> replacement = context[a][b][c];
            var subs = match.split(/\.+/);
            for (var i=0; i< subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }

                replacement = replacement[subs[i]];
            }

            if(typeof replacement == "function") {
                replacement = args ?
                    replacement.apply(null, args) :
                    replacement();
            }

            // If replacement is undefined, return the string 'undefined'.
            // This is a workaround for a bugs in browsers not properly
            // dealing with non-participating groups in regular expressions:
            // http://blog.stevenlevithan.com/archives/npcg-javascript
            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement;
            }
        };

        return template.replace(OpenCharts.String.tokenRegEx, replacer);
    },

    /**
     * Property: tokenRegEx
     * Used to find tokens in a string.
     * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
     */
    tokenRegEx:  /\$\{([\w.]+?)\}/g,

    /**
     * Property: numberRegEx
     * Used to test strings as numbers.
     */
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,

    /**
     * APIFunction: isNumeric
     * 判断一个字符串是否只包含一个数值.
     *
     * 例如:
     * (code)
     * OpenCharts.String.isNumeric("6.02e23") // true
     * OpenCharts.String.isNumeric("12 dozen") // false
     * OpenCharts.String.isNumeric("4") // true
     * OpenCharts.String.isNumeric(" 4 ") // false
     * (end)
     *
     * Returns:
     * {Boolean} 字符串包含唯一的数值,返回true;否则返回false.
     */
    isNumeric: function(value) {
        return OpenCharts.String.numberRegEx.test(value);
    },

    /**
     * APIFunction: numericIf
     * 把一个看似数值型的字符串转化为一个数值.
     *
     * Returns
     * {Number|String} 如果能转换为数值则返回数值,否则返回字符串本身.
     */
    numericIf: function(value) {
        return OpenCharts.String.isNumeric(value) ? parseFloat(value) : value;
    }

};

if (!String.prototype.startsWith) {
    /**
     * APIMethod: String.startsWith
     * 目标字符串是否以指定的子字符串开头.
     *
     * Parameters:
     * sStart - {String} 子字符串.
     *
     * Returns:
     * {Boolean}
     */
    String.prototype.startsWith = function(sStart) {
        return OpenCharts.String.startsWith(this, sStart);
    };
}

if (!String.prototype.contains) {
    /**
     * APIMethod: String.contains
     * 目标字符串是否包含子字符串.
     *
     * Parameters:
     * str - {String} 子字符串.
     *
     * Returns:
     * {Boolean} .
     */
    String.prototype.contains = function(str) {
        return OpenCharts.String.contains(this, str);
    };
}

if (!String.prototype.trim) {
    /**
     * APIMethod: String.trim
     * 删除目标字符串开头和结尾的所有空白字符.
     *
     * Returns:
     * {String}
     */
    String.prototype.trim = function() {
        return OpenCharts.String.trim(this);
    };
}

if (!String.prototype.camelize) {
    /**
     * APIMethod: String.camelize
     * 骆驼式("-")连字符的字符串处理.
     *
     * Returns:
     * {String}
     */
    String.prototype.camelize = function() {
        return OpenCharts.String.camelize(this);
    };
}