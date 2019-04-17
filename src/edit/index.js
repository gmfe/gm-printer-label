import PrinterEdit from './edit'
import PrinterEditShadow from './edit_shadow'

// eslint-disable-next-line
import editCSS from 'css-loader!postcss-loader!less-loader!./style.lesss'

function getCSS () {
  return editCSS.toString()
}

export {
  getCSS,
  PrinterEdit,
  PrinterEditShadow
}
