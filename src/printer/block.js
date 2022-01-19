import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { getStyleWithDiff, dispatchMsg, template, miniAppLink } from '../util'
import TableType from './components/table_type'
import BarCode from './barcode'
import QrCode from './qrcode'

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

  handleDragStart = ({ clientX, clientY }) => {
    const { index } = this.props

    this.setState({
      clientX,
      clientY
    })

    window.document.dispatchEvent(
      new window.CustomEvent('gm-printer-label-select', {
        detail: {
          selected: index
        }
      })
    )
  }

  handleDragEnd = ({ clientX, clientY }) => {
    const { config } = this.props
    const diffX = clientX - this.state.clientX
    const diffY = clientY - this.state.clientY

    const style = getStyleWithDiff(config.style, diffX, diffY)

    dispatchMsg('gm-printer-label-block-style-set', {
      style
    })
  }

  handleClick = () => {
    const { index } = this.props

    dispatchMsg('gm-printer-label-select', {
      selected: index
    })
  }

  handleDoubleClick = () => {
    const {
      config: { type }
    } = this.props
    if (!type || type === 'text') {
      this.setState(
        {
          isEdit: true
        },
        () => {
          this.refEdit.focus()
        }
      )
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
      config: {
        type,
        text,
        qrcode,
        order_qrcode,
        style,
        barcode,
        in_stock_barcode,
        package_id_qrcode,
        diycode,
        url,
        fieldType,
        fieldKey,
        production_barcode
      },
      data,
      className,
      isStation,
      ...rest
    } = this.props
    const { isEdit } = this.state
    let content = null
    if (!type || type === 'text') {
      if (fieldType === 'table') {
        // 字段类型为表格
        content = (
          <TableType
            data={data[fieldKey]}
            data-name={index}
            style={{ width: '100%', height: '100%' }}
          />
        )
      } else {
        content = template(text, data)
      }
    } else if (type === 'line') {
      content = null
    } else if (type === 'qrcode') {
      content = isStation ? (
        <QrCode
          value={miniAppLink + template(qrcode, data)}
          size={parseInt(style.height)}
        />
      ) : (
        <div
          data-qrcode={template(qrcode, data)}
          data-width={style.width}
          data-height={style.height}
          data-name={index}
          style={{ width: '100%', height: '100%' }}
          data-placeholder='商品溯源'
        />
      )
    } else if (type === 'order_qrcode') {
      content = isStation ? (
        <QrCode
          value={miniAppLink + template(order_qrcode, data)}
          size={parseInt(style.height)}
        />
      ) : (
        <div
          data-orderQrcode={template(order_qrcode, data)}
          data-width={style.width}
          data-height={style.height}
          data-name={index}
          style={{ width: '100%', height: '100%' }}
          data-placeholder='订单溯源'
        />
      )
    } else if (type === 'barcode') {
      content = isStation ? (
        <>
          <BarCode
            value={template(barcode, data)}
            textMargin={0}
            margin={0}
            height={parseInt(style.height) - 14}
            width={2}
            displayValue={false}
            dataName={barcode}
            background='transparent'
          />
          <div style={{ marginLeft: '50px' }}>{template(barcode, data)}</div>
        </>
      ) : (
        <div
          data-packagecode='验货条形码'
          data-name={index}
          style={{ width: '100%', height: '100%' }}
        >
          <svg
            style={{ height: '100%', width: '100%' }}
            data-packagecode={template(barcode, data)}
            // 需要减去14才能打印出正确高度
            data-height={parseInt(style.height) - 14}
            data-name={index}
            id={`package${template(barcode, data)}`}
          />
        </div>
      )
    } else if (type === 'in_stock_barcode') {
      content = isStation ? (
        <BarCode
          value={template(in_stock_barcode, data)}
          textMargin={0}
          margin={0}
          height={parseInt(style.height) - 14}
          width={2}
          displayValue={false}
          dataName={in_stock_barcode}
          background='transparent'
        />
      ) : (
        <div
          data-instockcode='入库条码'
          data-name={index}
          style={{ width: '100%', height: '100%' }}
        >
          <svg
            style={{ height: '100%', width: '100%' }}
            data-instockcode={template(in_stock_barcode, data)}
            // 需要减去14才能打印出正确高度
            data-height={parseInt(style.height) - 14}
            data-name={index}
            id={`instock${template(in_stock_barcode, data)}`}
          />
        </div>
      )
    } else if (type === 'production_barcode') {
      content = isStation ? (
        <BarCode
          value={template(production_barcode, data)}
          textMargin={0}
          margin={0}
          height={parseInt(style.height) - 14}
          width={2}
          displayValue={false}
          dataName={production_barcode}
          background='transparent'
        />
      ) : (
        <div
          data-productionbarcode='商品条码'
          data-name={index}
          style={{ width: '100%', height: '100%' }}
        >
          <svg
            style={{ height: '100%', width: '100%' }}
            data-productionbarcode={template(production_barcode, data)}
            // 需要减去14才能打印出正确高度
            data-height={parseInt(style.height) - 14}
            data-name={index}
            id={`production${template(production_barcode, data)}`}
          />
        </div>
      )
    } else if (type === 'package_id_qrcode') {
      content = isStation ? (
        <QrCode
          value={template(package_id_qrcode, data)}
          size={parseInt(style.height)}
        />
      ) : (
        <div
          data-packageqrcode={template(package_id_qrcode, data)}
          data-width={style.width}
          data-height={style.height}
          data-name={index}
          style={{ width: '100%', height: '100%' }}
          data-placeholder='验货二维码'
        />
      )
    } else if (type === 'diycode') {
      content = isStation ? (
        <>
          <BarCode
            value={template(diycode, data)}
            textMargin={0}
            margin={0}
            height={35}
            width={2}
            displayValue={false}
            dataName={'diycode'}
            background='transparent'
          />
          <div style={{ marginLeft: '50px' }}>{template(diycode, data)}</div>
        </>
      ) : (
        <div
          data-diycode='自定义编码条形码'
          data-name={index}
          style={{ width: '100%', height: '100%' }}
        >
          <svg
            style={{ height: '100%', width: '100%' }}
            data-diycode={template(diycode, data)}
            // 需要减去14才能打印出正确高度
            data-height={parseInt(style.height) - 14}
            data-name={index}
            id={`package${template(diycode, data)}`}
          />
        </div>
      )
    } else if (type === 'diyqrcode') {
      content = isStation ? (
        <QrCode value={template(text, data)} size={parseInt(style.height)}/>
      ) : (
        <div
          data-diyqrcode={template(text, data)}
          data-width={style.width}
          data-height={style.height}
          data-name={index}
          style={{ width: '100%', height: '100%' }}
          data-placeholder='自定义二维码'
        />
      )
    } else if (type === 'image') {
      content = (
        <img
          src={url}
          data-width={style.width}
          data-height={style.height}
          style={{ width: '100%', height: '100%' }}
          data-name={index}
        />
      )
    }

    const active = index === selected
    return (
      <div
        {...rest}
        style={style}
        className={classNames(
          'gm-printer-label-block',
          `gm-printer-label-block-type-${type}`,
          className,
          {
            active
          }
        )}
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        data-name={index}
      >
        {content}
        {(!type || type === 'text') && active && isEdit && (
          <textarea
            ref={(ref) => (this.refEdit = ref)}
            className='gm-printer-label-block-text-edit'
            value={text}
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
  selected: PropTypes.number,
  isStation: PropTypes.bool
}

export default Block
