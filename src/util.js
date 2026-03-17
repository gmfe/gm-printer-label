import _ from 'lodash'
import Big from 'big.js'
import moment from 'moment/moment'

function pxAdd(origin, add) {
  return parseFloat(origin, 10) + add + 'px'
}

function getStyleWithDiff(style, diffX, diffY) {
  const newStyle = Object.assign({}, style)

  if (!style.left && style.right) {
    newStyle.right = pxAdd(newStyle.right, -diffX)
  } else {
    newStyle.left = pxAdd(newStyle.left, diffX)
  }

  if (!style.top && style.bottom) {
    newStyle.bottom = pxAdd(newStyle.bottom, -diffY)
  } else {
    newStyle.top = pxAdd(newStyle.top, diffY)
  }

  return newStyle
}

function insertCSS(cssString, target) {
  const style = window.document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode(cssString))

  if (target) {
    target.appendChild(style)
  } else {
    window.document.head.appendChild(style)
  }
}

function dispatchMsg(event, data) {
  window.document.dispatchEvent(
    new window.CustomEvent(event, {
      detail: data,
    })
  )
}
function substring(target, start = 0, end) {
  return target.substring(start, end)
}

const price = (n, f = 2) => {
  /** 有些价格会有...,传给Big会报错，那么替换掉 */
  if (typeof n === 'string') {
    n = n.replace(/\.+$/, '')
  }
  // 自定义函数支持多栏
  if (n === undefined || n === '') return ''
  return Big(n || 0).toFixed(f)
}
const diyRandom = (a, b, c = 2) => {
  return (a + Math.random() * (b - a)).toFixed(c)
}
const parseFloatFun = a => {
  // 自定义函数支持多栏
  if (a === '' || a === undefined) return ''
  return parseFloat(+a)
}

/**
 *
 * @param num 处理小数点末尾零
 * @returns
 */
function removeTrailingZeros(str) {
  const toString = String(str)
  return toString.replace(/(\d+(?:\.\d+)?)0*([^\d]*)/g, (match, number, unit) => {
    // 使用parseFloat自动处理，然后转回字符串
    return parseFloat(number) + (unit || '')
  })
}

function template(text, data) {
  try {
    return _.template(text, {
      interpolate: /{{([\s\S]+?)}}/g,
    })({
      ...data,
      substring: substring, // 添加一个截取字符串函数
      price: price,
      diyRandom: diyRandom, // 提供一个计算随机数的函数
      parseFloatFun: parseFloatFun,
      removeTrailingZeros: removeTrailingZeros,
      addDay: (date, day, format = 'YYYY-MM-DD') => moment(date).add(day, 'day').format(format),
      formatDate: (date, format) => moment(date).format(format),
    })
  } catch (err) {
    console.warn(err)
    return text
  }
}

let timer

function afterImgAndSvgLoaded(callback, $printer, isTest = false) {
  const $imgList = $printer.querySelectorAll('img')
  const $svgList = $printer.querySelectorAll('svg')

  clearTimeout(timer)
  const everyThingIsOk =
    _.every($imgList, (img) => img.complete) &&
    (_.every($svgList, (svg) => svg.children.length) || isTest) // 模版测试打印时svg没有children
  if (everyThingIsOk) {
    callback()
  } else {
    // 递归调用时需要把 isTest 继续传下去，否则会使用默认值 false
    timer = setTimeout(afterImgAndSvgLoaded.bind(this, callback, $printer, isTest), 300)
  }
}
const miniAppLink = 'https://miniapp.guanmai.cn/traceability/?id='
export {
  pxAdd,
  getStyleWithDiff,
  insertCSS,
  dispatchMsg,
  template,
  afterImgAndSvgLoaded,
  miniAppLink,
}
