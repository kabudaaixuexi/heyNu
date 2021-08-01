
/**
 * @func 创建时间戳
 */
export function createTimestamp() {
  return new Date().getTime() 
}

/**
 * @func 时间
 */
export function getToday(sep = '-') {
  let date = new Date()
  let year = date.getFullYear()
  let month =
    (date.getMonth() + 1).toString().length == 1
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  let dates =
    date.getDate().toString().length == 1
      ? '0' + date.getDate()
      : date.getDate()
  return `${year}-${month}-${dates}`
}

/**
 *  @func 详细时间
 */
export function getAccurateDate(){
  let nowtime = new Date();
  return formatDate(nowtime, 'yyyy-MM-DD hh:mm:ss') 
} 
function formatDate(date,fmt){
  var o = {
      "M+":date.getMonth() + 1,//月份
      "D+":date.getDay(),//日
      "h+":date.getHours(),//hours
      "m+":date.getMinutes(),//分钟
      's+':date.getSeconds(),//秒,
  }

  if(/(y+)/.test(fmt)){
      //RegExp.$1 是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
      fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4 - RegExp.$1.length));
  }
  for(var k in o){
      if(new RegExp("("+k+")").test(fmt)){
          fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))
      }
  }
  return fmt;
}

/**
 * @func 生成userid
 */

export function newGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid;    
}

