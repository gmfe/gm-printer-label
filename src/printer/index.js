import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Printer from './printer'

// eslint-disable-next-line
import normalizeCSS from 'css-loader!./normalize.csss'
// eslint-disable-next-line
import printerCSS from 'css-loader!postcss-loader!less-loader!./style.lesss'

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
