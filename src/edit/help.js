import React from 'react'
import PropTypes from 'prop-types'
import { toKey } from '../printer/key'
import _ from 'lodash'
import { Copy } from './component'

class Help extends React.Component {
  render () {
    const { data } = this.props

    const newData = toKey(data)

    return (
      <div className='gm-printer-label-edit-help' style={{ padding: '10px' }}>
        <hr/>
        使用举例： "SKU：{'{{SKU}}'}" 生成 "SKU：{data.name}"
        <br/>
        可用字段：
        <br/>
        <div>
          {_.map(newData, (v, k) => {
            if (k !== '_origin') {
              return (
                <Copy key={k} text={`{{${k}}}`}>
                  <div style={{ margin: '5px' }}>
                    <span style={{ padding: '0 10px', display: 'inline-block' }}>
                      {'{{'}{k}{'}}'}
                      &nbsp;=>&nbsp;
                      {_.template(`{{${k}}}`, {
                        interpolate: /{{([\s\S]+?)}}/g
                      })({ ...newData })}
                    </span>
                    <button>复制</button>
                  </div>
                </Copy>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

Help.propTypes = {
  data: PropTypes.object
}

export default Help
