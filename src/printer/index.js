import normalizeCSS from 'normalize.css/normalize.css'
import printerCSS from './style.less'
import ReactDOMServer from 'react-dom/server'
import Printer from './printer'

function getHtml (props) {
  return ReactDOMServer.renderToString(<Printer {...props}/>)
}

function getCSS () {
  return normalizeCSS.toString() + printerCSS.toString()
}

export {
  getHtml,
  getCSS,
  Printer
}
