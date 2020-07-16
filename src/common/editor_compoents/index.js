// eslint-disable-next-line
import editCSS from 'css-loader!postcss-loader!less-loader!./style.lesss'

function getCSS () {
  return editCSS.toString()
}

export {
  getCSS
}
