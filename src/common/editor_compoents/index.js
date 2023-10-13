// eslint-disable-next-line
import editCSS from '!!raw-loader!less-loader!./style.less'

function getCSS () {
  return editCSS.toString()
}

export {
  getCSS
}
