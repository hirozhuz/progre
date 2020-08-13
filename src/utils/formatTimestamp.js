/**
 * 日期格式化方法
 * @param timestamp
 * @param type
 * @returns {*}
 */
export default function formatTimestamp(timestamp, type) {
    let ts = !timestamp ? new Date().getTime() : typeof(timestamp) === 'string' ? parseInt(timestamp) : timestamp
    type = type === undefined || type === "date" ? "yyyy-MM-dd" : type

    /**
     * 格式占位符：
     * 年: y; 月: M; 日: d; 小时: h; 分: m; 秒: s; 季度: q; 毫秒: S
     * 年可以用 1-4 个占位符; 毫秒只能用 1 个占位符，返回 1-3 位的数字; 其他可以使用 1-2 个占位符
     * @param type {string} 格式化占位符字符串
     */
    let formatFactory = (type) => {

            Date.prototype.format = function (fmt) {
                let o = {
                    "M+": this.getMonth() + 1,                      // 月份
                    "d+": this.getDate(),                           // 日
                    "h+": this.getHours(),                          // 小时
                    "m+": this.getMinutes(),                        // 分
                    "s+": this.getSeconds(),                        // 秒
                    "q+": Math.floor((this.getMonth() + 3) / 3),    // 季度
                    "S" : this.getMilliseconds()                     // 毫秒
                }
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
                for (let k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                return fmt
            }

            return (new Date(ts)).format(type)
        },

        form = {
            "all"    : "yyyy-MM-dd hh:mm:ss",
            "time"   : "hh:mm:ss",
            "MD"     : "MM-dd",
            "MDHm"   : "MM-dd hh:mm",
            "MDHms"  : "MM-dd hh:mm:ss",
            "DHm"    : "dd hh:mm",
            "YMDHm"  : "yyyy-MM-dd hh:mm",
            "Hm"     : "hh:mm",
            "YM"     : "yyyy-MM",
            "cnAll"  : "yyyy年MM月dd日 hh:mm:ss",
            "default": "yyyy-MM-dd"
        }

    type = form[type] ? form[type] : type
    return formatFactory(type)
}
