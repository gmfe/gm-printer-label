import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { observer } from 'mobx-react/index'
import { getStyleWithDiff, dispatchMsg, template } from '../util'

@observer
class Block extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      clientX: null,
      clientY: null,
      isEdit: false
    }
  }

  handleDragStart = ({clientX, clientY}) => {
    const {index} = this.props

    this.setState({
      clientX,
      clientY
    })

    window.document.dispatchEvent(new window.CustomEvent('gm-printer-label-select', {
      detail: {
        selected: index
      }
    }))
  }

  handleDragEnd = ({clientX, clientY}) => {
    const {config} = this.props
    const diffX = clientX - this.state.clientX
    const diffY = clientY - this.state.clientY

    const style = getStyleWithDiff(config.style, diffX, diffY)

    dispatchMsg('gm-printer-label-block-style-set', {
      style
    })
  }

  handleClick = () => {
    const {index} = this.props

    dispatchMsg('gm-printer-label-select', {
      selected: index
    })
  }

  handleDoubleClick = () => {
    const {config: {type}} = this.props
    if (!type || type === 'text') {
      this.setState({
        isEdit: true
      }, () => {
        this.refEdit.focus()
      })
    }
  }

  handleEditBlur = () => {
    this.setState({
      isEdit: false
    })
  }

  handleText = (e) => {
    dispatchMsg('gm-printer-label-block-text-set', {
      text: e.target.value
    })
  }

  render () {
    const {
      index,
      selected,
      config: {type, text, qrcode, style, barcode},
      data,
      className,
      ...rest
    } = this.props
    const {isEdit} = this.state

    let content = null
    if (!type || type === 'text') {
      content = template(text, data)
    } else if (type === 'line') {
      content = null
    } else if (type === 'qrcode') {
      content = (
        <div
          data-qrcode={template(qrcode, data)}
          data-width={style.width}
          data-height={style.height}
          style={{width: '100%', height: '100%'}}
          data-placeholder='二维码'
        />
      )
    } else if (type === 'barcode') {
      content = (
        <div
          data-packagecode='条形码'
          style={{width: '100%', height: '100%'}}
        >
          <svg
            data-packagecode={template(barcode, data)}
            // 需要减去14才能打印出正确高度
            data-height={parseInt(style.height) - 14}
            id={`package${template(barcode, data)}`}
          />
        </div>
      )
    }

    const active = index === selected

    return (
      <div
        {...rest}
        style={style}
        className={classNames('gm-printer-label-block', `gm-printer-label-block-type-${type}`, className, {
          active
        })}
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        {content}
        {(!type || type === 'text') && active && isEdit && (
          <textarea
            ref={ref => (this.refEdit = ref)}
            className='gm-printer-label-block-text-edit' value={text}
            onChange={this.handleText}
            onBlur={this.handleEditBlur}
          />
        )}
      </div>
    )
  }
}

Block.propTypes = {
  index: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.number
}

export default Block
