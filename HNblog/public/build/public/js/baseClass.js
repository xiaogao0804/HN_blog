;
;
var $_$ = (function () {
    function $_$() {
        this.author = 'jarvan';
        this.g_request = 0;
    }
    $_$.prototype.$ajax = function (url, data, reslove, reject) {
        var promise = new Promise(function (reslove, reject) {
            if (this.g_request == 1) {
                return false;
            }
            $.ajax({
                url: url,
                data: data,
                type: "POST",
                success: function (res) {
                    console.log(res);
                    reslove(res);
                    this.g_request == 0;
                },
                error: function (res) {
                    reject(res);
                    this.g_request == 0;
                }
            });
        });
        return promise;
    };
    $_$.prototype.urlParse = function () {
        var search = location.search.substring(1, location.search.length);
        var arr = search.split('&');
        var obj = {};
        arr.forEach(function (item, index) {
            var arr = item.split('=');
            obj[arr[0]] = arr[1];
        });
        return obj;
    };
    $_$.prototype.objToJson = function (obj, index) {
        var str = "";
        if (typeof obj == "object" && (!(obj instanceof Array))) {
            for (var i in obj) {
                if (typeof obj[i] != "object") {
                    str += i + "=" + obj[i] + "&";
                }
                else {
                    str += this.objToJson(obj[i], i);
                }
            }
        }
        else if (typeof obj == "object" && (obj instanceof Array) && index) {
            for (var i in obj) {
                if (typeof obj[i] != "object") {
                    str += index + "[" + i + "]=" + obj[i] + "&";
                }
                else {
                    str += this.objToJson(obj[i]);
                }
            }
        }
        else if ((obj instanceof Array) && (!index)) {
            for (var i in obj) {
                if (typeof obj[i] != "object") {
                    str += "Array[" + i + "]=" + obj[i] + "&";
                }
                else {
                    str += this.objToJson(obj[i]);
                }
            }
        }
        return str;
    };
    $_$.prototype.$setValue = function (ele, value) {
        $(ele).val(value);
    };
    $_$.prototype.$getValue = function (ele) {
        if ($(ele).val() == "") {
            return "";
        }
        else {
            return this.stripscript($(ele).val().trim());
        }
    };
    $_$.prototype.stripscript = function (str) {
        if (str == undefined) {
            return '';
        }
        str = str + '';
        if (str.length <= 0) {
            return '';
        }
        // str = str.toLowerCase();
        if (str.indexOf('<script') >= 0) {
            str = str.replace(/<script.*?>.*?<\/script>/ig, '');
            str = str.replace(/<script.*?>/ig, '');
        }
        if (str.indexOf('</script>') >= 0) {
            str = str.replace(/<\/script>/ig, '');
        }
        return str;
    };
    $_$.prototype.$pl_set_value = function (input, data) {
        var index = 0;
        data ? plSet() : plClear();
        function plClear() {
            $(input[index]).val('');
            ++index;
            if (index == input.length) {
                return false;
            }
            else {
                plClear();
            }
        }
        function plSet() {
            $(input[index]).val(data[index]);
            ++index;
            if (index == input.length) {
                return false;
            }
            else {
                plSet();
            }
        }
    };
    return $_$;
}());
//export default $_$;
module.exports = $_$;
