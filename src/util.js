import _ from 'lodash'

function pxAdd (origin, add) {
  return parseFloat(origin, 10) + add + 'px'
}

function getStyleWithDiff (style, diffX, diffY) {
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

function insertCSS (cssString, target) {
  const style = window.document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode(cssString))

  if (target) {
    target.appendChild(style)
  } else {
    window.document.head.appendChild(style)
  }
}

function dispatchMsg (event, data) {
  window.document.dispatchEvent(
    new window.CustomEvent(event, {
      detail: data
    })
  )
}
function substring (target, start = 0, end) {
  return target.substring(start, end)
}
function template (text, data) {
  try {
    return _.template(text, {
      interpolate: /{{([\s\S]+?)}}/g
    })({
      ...data,
      substring: substring // 添加一个截取字符串函数
    })
  } catch (err) {
    console.warn(err)
    return text
  }
}

let timer

function afterImgAndSvgLoaded (callback, $printer) {
  const $imgList = $printer.querySelectorAll('img')
  const $svgList = $printer.querySelectorAll('svg')

  clearTimeout(timer)

  const everyThingIsOk =
    _.every($imgList, (img) => img.complete) &&
    _.every($svgList, (svg) => svg.children.length)
  if (everyThingIsOk) {
    callback()
  } else {
    timer = setTimeout(afterImgAndSvgLoaded.bind(this, callback, $printer), 300)
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
  miniAppLink
}
