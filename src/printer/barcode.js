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

  render () {
    // 可设置条形码的宽高
    const { dataName, height = '', svgWidth } = this.props
    return <svg
      data-name={dataName}
      ref={this.barcode}
      style={{
        width: svgWidth, height: height + 'px'
      }}
    />
  }
}

BarCode.propTypes = {
  value: PropTypes.string,
  dataName: PropTypes.string
}

export default BarCode
