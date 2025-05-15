import React from 'react'
import jsBarcode from 'jsbarcode'
import PropTypes from 'prop-types'

function freshBarCode (data, barCodeType = 'CODE128', width) {
  try {
    const codeLength = data.length
    let numBars

    // 根据不同的条形码类型设置条数
    switch (barCodeType) {
      case 'CODE128':
      case 'CODE128A':
      case 'CODE128B':
      case 'CODE128C':
        numBars = codeLength * 7.45
        break
      default:
        numBars = codeLength * 7
    }
    console.log(data, barCodeType, width, numBars, codeLength)
    const barWidth = width / numBars
    return barWidth || 1.2
  } catch (e) {
    console.log('不支持的内容')
  }
}

class BarCode extends React.Component {
  barcode = React.createRef()

  componentDidMount () {
    const {value, needAutoWidth, ...rest} = this.props
    if (!value) return
    /** jsBarCode的具体options前往：
     * https://blog.csdn.net/shencailing/article/details/122101956
     */
    let width = rest.width
    if (needAutoWidth) {
      width = freshBarCode(value, 'CODE128', Number(rest.svgWidth.replace('px', '')))
    }
    jsBarcode(this.barcode.current, value, {
      format: 'CODE128',
      ...rest,
      margin: 0,
      height: rest.height + 'px',
      width,
    })
  }

  // 改变尺寸之后重新生成
  componentDidUpdate (prevProps) {
    const {value, height, svgWidth, needAutoWidth} = this.props
    if (!prevProps.needResize) return
    if (prevProps.height !== height || prevProps.svgWidth !== svgWidth) {
      let width = this.props.width
      if (needAutoWidth) {
        width = freshBarCode(value, 'CODE128', Number(svgWidth.replace('px', '')) || 70)
      }

      jsBarcode(this.barcode.current, value, {
        ...this.props,
        width,
        height: height + 'px',
      })
    }
  }

  render () {
    // 可设置条形码的宽高
    const {dataName, value, height = ''} = this.props
    if (!value) return null
    return <div style={{width: '100%', maxWidth: '100%', height: '100%'}}>
      <svg
        data-name={dataName}
        ref={this.barcode}
        height={height}
        style={{
          height: height + 'px'
        }}
      />
    </div>
  }
}

BarCode.propTypes = {
  value: PropTypes.string,
  dataName: PropTypes.string,
  needResize: PropTypes.bool
}

export default BarCode
