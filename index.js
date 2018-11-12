; (function () {
    "use strict"
    var _global;
    Date.prototype.formater = function (str) {
        if (str && typeof str === 'string') {
            function lessThanTen(n) {
                if (Number(n) < 10) {
                    return '0' + n;
                } else {
                    return n;
                }
            };
            var transStr = str.toLowerCase();
            var o = {
                "(m+)(.)(d+|h+|m+)": this.getMonth() + 1, // 月
                "d+": this.getDate(), // 日 
                "h+": this.getHours(), // 时 
                "m+": this.getMinutes(), // 分 
                "s+": this.getSeconds(), // 秒 
                // "q+": Math.floor((this.getMonth() + 3) / 3), // 季度 
                // "s": this.getMilliseconds() // 毫秒 
            };
            if (/(y+)/.test(transStr)) {
                transStr = transStr.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
                if (k === '(m+)(.)(d+|h+|m+)') {
                    var mObj = transStr.match(k);
                    var mbI = mObj.index, mStr = mObj[1];
                    var rc = mStr.length === 1 ? lessThanTen(o[k]) : o[k];
                    transStr = transStr.substring(0, mbI)
                        + rc
                        + transStr.substring(mbI + mStr.length, transStr.length);
                } else {
                    if (new RegExp("(" + k + ")").test(transStr)) {
                        transStr = transStr.replace(RegExp.$1,
                            (RegExp.$1.length === 1) ? lessThanTen(o[k])
                                : o[k]
                        );
                    }
                }
            return transStr;
        } else {
            return '';
        }
    }
    // _global = (function () { return this || (0, eval)('this'); }());
    // if (typeof module !== "undefined" && module.exports) {
    //     module.exports = Date;
    // } else if (typeof define === "function" && define.amd) {
    //     define(function () { return Date; });
    // } else {
    //     !('Date' in _global) && (_global.Date = Date);
    // }
}());