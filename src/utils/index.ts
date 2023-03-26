/* eslint-disable */


export function testClassDeco(constructor: Function) {
  console.log(constructor);
  console.log(constructor.prototype);
}

/**
 * 随机uuid
 */
export function uuid() {
  const s: Array<any> = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return uuid
}

export function randomString(length: number) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (var i = length; i > 0; --i) { result += str[Math.floor(Math.random() * str.length)] }
  return result
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
 export function toHump(str: string) {
  if (!str) return str
  return str.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  }).replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase()
  })
}

export function currentDate() {
  const d = new Date()
  let str = ''
  str += d.getFullYear() + '-' // 获取当前年份
  const month = d.getMonth() + 1
  str += month < 10 ? '0' + month + '-' : month + '-' // 获取当前月份（0——11）
  str += d.getDate() + ' '
  const hours = d.getHours()
  str += hours < 10 ? '0' + hours : hours + ':'
  str += d.getMinutes() + ':'
  str += d.getSeconds()
  return str
}
export function  getSysId(){
  let href:string=location.href
  let idIndex = location.href.indexOf('oSysId=')
  let sysId=href.substring(idIndex+7,href.indexOf('&',idIndex))
  return sysId
}
//获取屏幕，窗口高度
export function getWorkH(...arg:any){
  let windowH = document.body.scrollHeight
  arg.forEach((item:number)=>{
    windowH-=item
  })
  return windowH
}
export function downloadFile(url:string,obj?:any){
  //导出
  const form = document.createElement("form")
  // form.style.visibility='hidden'
  form.style.display='none'
  form.method='post'
  form.action=url
  const dom =document.body
  dom.append(form)
  for (let objKey in obj) {
    const input = document.createElement("input")
    input.type='hidden'
    input.name=objKey
    input.value=obj[objKey]
    form.append(input);
  }

  form.submit();
  form.remove();
}
//前面自动补零
export function numFixed(num:number|string,len:number) {
   let length=num.toString.length
  while (length<len){
    num='0'+num
    length++
  }
  return num
}
/**
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
export function toChinesNum(num:any) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  let getWan = (temp:any) => {
    let strArr = temp.toString().split('').reverse()
    let newNum = ''
    let newArr :any= []
    strArr.forEach((item:any, index:number) => {
      newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
    })
    let numArr:any = []
    newArr.forEach((m:any, n:any) => {
      if (m !== '零') numArr.push(n)
    })
    if (newArr.length > 1) {
      newArr.forEach((m:any, n:any) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m
          }
        } else {
          newNum += m
        }
      })
    } else {
      newNum = newArr[0]
    }

    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan :any= num % 10000
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}