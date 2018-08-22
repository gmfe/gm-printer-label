import normalizeCSS from 'normalize.css/normalize.css'
import printerCSS from './style.less'
import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import printerStore from './store'
import Page from './page'
import _ from 'lodash'
import { insertCSS } from '../util'
import Block from './block'

insertCSS(normalizeCSS.toString())
insertCSS(printerCSS.toString())

function addPageSizeStyle (rule) {
  insertCSS(`@page {size: ${rule}; }`)
}

@observer
class Printer extends React.Component {
  constructor (props) {
    super(props)

    printerStore.init()

    const {type, size, gap} = props.config.page
    if (_.isString(type)) {
      printerStore.setSize(type)
      printerStore.setGap(type)
    } else {
      printerStore.setSize(size)
      printerStore.setGap(gap)
    }

    printerStore.setData(props.data)

    if (type) {
      addPageSizeStyle(type)
    } else {
      addPageSizeStyle(`${size.width} ${size.height}`)
    }
  }

  render () {
    const {config, selected} = this.props

    return (
      <div className='gm-printer' style={{
        width: printerStore.size.width,
        height: printerStore.size.height
      }}>
        <Page>
          {_.map(config.blocks, (block, i) => (
            <Block
              key={i}
              index={i}
              selected={selected}
              config={block}
            />
          ))}
        </Page>
      </div>
    )
  }
}

Printer.propTypes = {
  selected: PropTypes.number,
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
}

export default Printer
