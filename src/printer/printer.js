import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Page from './page'
import _ from 'lodash'
import Block from './block'
import { toKey } from './key'
import { pageTypeMap } from '../config'

@observer
class Printer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: toKey(props.data, props.options)
    }
  }

  render () {
    const {config, selected} = this.props
    const {data} = this.state
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
  data: PropTypes.object.isRequired,
  options: PropTypes.object // 传一些业务逻辑
}

Printer.defaultProps = {
  options: {}
}

export default Printer
