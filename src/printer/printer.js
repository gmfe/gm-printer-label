import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Page from './page'
import _ from 'lodash'
import Block from './block'
import { pageTypeMap } from '../common/config'

@observer
class Printer extends React.Component {
  componentDidMount () {
    // Printer 不是立马就呈现出最终样式，有个过程。这个过程需要时间，什么 ready，不太清楚，估借 setState 来获取过程结束时刻
    this.setState({}, () => {
      this.props.onReady && this.props.onReady()
    })
  }

  render () {
    const { config, selected, data, isStation } = this.props
    const { type, style, customizeWidth, customizeHeight, doublePage } =
      config.page
    const ratio = doublePage ? 2 : 1
    const width =
      (type === '-1'
        ? customizeWidth
        : +pageTypeMap[type].width.split('mm')[0]) *
        ratio +
      'mm'
    const height =
      (type === '-1'
        ? customizeHeight
        : +pageTypeMap[type].height.split('mm')[0]) *
        ratio +
      'mm'
    return (
      <div
        className='gm-printer-label'
        style={{
          ...style,
          width,
          height
        }}
      >
        <Page pageStyle={{ width, height }}>
          {_.map(config.blocks, (block, i) => (
            <Block
              key={i}
              index={i}
              selected={selected}
              config={block}
              data={data}
              isStation={isStation}
            />
          ))}
        </Page>
      </div>
    )
  }
}

Printer.propTypes = {
  selected: PropTypes.number,
  config: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired, // 格式化后的数据
  onReady: PropTypes.func,
  isStation: PropTypes.bool
}

export default Printer
