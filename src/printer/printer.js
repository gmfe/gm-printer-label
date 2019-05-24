import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Page from './page'
import _ from 'lodash'
import Block from './block'
import { pageTypeMap } from '../common/config'

@observer
class Printer extends React.Component {
  render () {
    const { config, selected, data } = this.props
    return (
      <div className='gm-printer-label' style={{
        width: pageTypeMap[config.page.type].width,
        height: pageTypeMap[config.page.type].height
      }}>
        <Page config={config.page}>
          {_.map(config.blocks, (block, i) => (
            <Block
              key={i}
              index={i}
              selected={selected}
              config={block}
              data={data}
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
  data: PropTypes.object.isRequired // 格式化后的数据
}

export default Printer
