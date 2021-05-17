import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Printer from './printer'
import _ from 'lodash'

// eslint-disable-next-line
import normalizeCSS from "css-loader!./normalize.csss";
// eslint-disable-next-line
import printerCSS from "css-loader!postcss-loader!less-loader!./style.lesss";

function getHtml (props) {
  return ReactDOMServer.renderToString(<Printer {...props}/>)
}

function getBatchHtml (propsArr) {
  return ReactDOMServer.renderToString(
    <React.Fragment>
      {_.map(propsArr, (props) => (
        <Printer {...props}/>
      ))}
    </React.Fragment>
  )
}

function getCSS () {
  return normalizeCSS.toString() + printerCSS.toString()
}

export { getHtml, getBatchHtml, getCSS, Printer }
