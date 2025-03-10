import React from 'react'
import jsBarcode from 'jsbarcode'
import PropTypes from 'prop-types'

class BarCode extends React.Component {
  barcode = React.createRef()

  componentDidMount () {
    const { value, ...rest } = this.props
    if (!value) return
    /** jsBarCode的具体options前往：
     * https://blog.csdn.net/shencailing/article/details/122101956
     */
    jsBarcode(this.barcode.current, value, {
      ...rest
    })
  }

  // 改变尺寸之后重新生成
  componentDidUpdate (prevProps) {
    const { value, height, svgWidth } = this.props
    if (!prevProps.needResize) return
    if (prevProps.height !== height || prevProps.svgWidth !== svgWidth) {
      jsBarcode(this.barcode.current, value, {
        ...this.props,
        height: height + 'px',
      })
    }
  }

  render () {
    // 可设置条形码的宽高
    const { dataName, value, height = '', svgWidth } = this.props
    if (!value) return null
    return <svg
      data-name={dataName}
      ref={this.barcode}
      width={svgWidth}
      height={height}
      style={{
        width: svgWidth, height: height + 'px'
      }}
    />
  }
}

BarCode.propTypes = {
  value: PropTypes.string,
  dataName: PropTypes.string,
  needResize: PropTypes.bool
}

export default BarCode
