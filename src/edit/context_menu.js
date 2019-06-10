import React, { useEffect } from 'react'
import i18next from '../../locales'
import editStore from './store'
import PropTypes from 'prop-types'

class ContextMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: null,
      popup: {
        left: 0,
        top: 0
      }
    }

    this.menuRef = React.createRef()
  }

  componentDidMount () {
    window.shadowRoot.addEventListener('click', this.handleClick)
  }

  componentWillUnmount () {
    window.shadowRoot.addEventListener('click', this.handleClick)
  }

  handleClick = () => {
    // 简单处理,点击空白收起context_menu
    this.setState({
      name: null
    })
  }

  handleRemove = () => {
    const { name } = this.state

    editStore.setSelected(name)
    editStore.removeConfig()
  }

  handleContextMenu = (e) => {
    // 从e.target.dataset中更新name值
    const { target: { dataset: { name } }, clientX, clientY } = e

    e.preventDefault()

    this.setState({
      name,
      popup: {
        left: clientX,
        top: clientY
      }
    })
  }

  detectContextMenuTop = () => {
    const { popup: {top} } = this.state
    const clientHeight = window.document.body.clientHeight
    const contextMenuHeight = this.menuRef.current.clientHeight

    if ((clientHeight - top) < contextMenuHeight) {
      this.setState({
        popup: {
          ...this.state.popup,
          top: clientHeight - contextMenuHeight
        }
      })
    }
  }

  renderBlocks = () => {
    return (
      <div onClick={this.handleRemove}>
        {i18next.t('移除')}
      </div>
    )
  }
  render () {
    const { children } = this.props
    const { popup, name } = this.state
    return (
      <div onClick={this.handleCancel} className='gm-pinter-label-eidt-wrap' onContextMenu={this.handleContextMenu}>
        {children}
        {name && (
          <Menu
            detectContextMenuTop={this.detectContextMenuTop}>
            {
              <div ref={this.menuRef} className='gm-printer-label-contextmenu' style={{
                position: 'fixed',
                ...popup}}>
                {this.renderBlocks()}
              </div>
            }
          </Menu>
        )}
      </div>
    )
  }
}

function Menu (props) {
  const { children, detectContextMenuTop } = props
  useEffect(() => {
    detectContextMenuTop()
  })

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

Menu.propTypes = {
  children: PropTypes.element.isRequired,
  detectContextMenuTop: PropTypes.func.isRequired
}

ContextMenu.propTypes = {
  children: PropTypes.element.isRequired
}
export default ContextMenu
