import React from 'react'
import ReactDOM from 'react-dom'
import Edit from './edit'
import { insertCSS } from '../util'
import { getCSS } from '../printer'
import { getCSS as getEditCSS } from '../edit'

class EditShadow extends React.Component {
  ref = React.createRef()

  componentDidMount () {
    const dom = ReactDOM.findDOMNode(this.ref.current)
    const shadowRoot = dom.attachShadow({ mode: 'open' })

    ReactDOM.render(<Edit {...this.props}/>, shadowRoot)

    insertCSS(getCSS() + getEditCSS(), shadowRoot)
  }

  render () {
    return (
      <div ref={this.ref}/>
    )
  }
}

EditShadow.propTypes = Edit.propTypes

export default EditShadow
