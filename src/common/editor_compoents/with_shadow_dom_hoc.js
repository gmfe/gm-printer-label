import React from 'react'
import ReactDOM from 'react-dom'
import { insertCSS } from '../../util'
import { getCSS as getPrinterCSS } from '../../printer'
import { getCSS as getEditorCSS } from './index'

const withShadowDom = WrapCom => {
  return class extends React.Component {
    ref = React.createRef()

    componentDidMount () {
      const shadowRoot = this.ref.current.attachShadow({ mode: 'open' })
      // 在window下挂 shadow root
      window.shadowRoot = shadowRoot
      ReactDOM.render(<WrapCom {...this.props}/>, shadowRoot)
      insertCSS(getPrinterCSS() + getEditorCSS(), shadowRoot)
    }

    componentWillUnmount () {
      // 移除示例,不然很多意想不到的事情发生
      ReactDOM.unmountComponentAtNode(window.shadowRoot)
    }

    render () {
      return <div id='shadowroot' ref={this.ref}/>
    }
  }
}

export default withShadowDom
