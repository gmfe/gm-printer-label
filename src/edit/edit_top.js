import React from 'react'
import PropTypes from 'prop-types'
import editStore from './store'
import { toJS } from 'mobx'
import { doPrint } from '../printer'
import _ from 'lodash'
import { blockTypeList } from '../config'
import { observer } from 'mobx-react/index'

@observer
class EditTop extends React.Component {
  handleInsert = (type) => {

    editStore.addConfigBlock(type)
    editStore.setSelected(editStore.config.blocks.length - 1)
  }

  handleTestPrint = () => {
    const {data} = this.props
    doPrint({
      config: toJS(editStore.config),
      data
    })
  }

  render () {
    return (
      <div className='gm-printer-edit-header-top'>
        <div style={{textAlign: 'right'}}>
          <button onClick={this.handleTestPrint}>测试打印</button>
          <button onClick={this.props.onSave}>保存</button>
        </div>
        <hr/>
        <div>
          <span>插入</span>
          &nbsp;&nbsp;
          {_.map(blockTypeList, v => (
            <button
              key={v.value}
              onClick={this.handleInsert.bind(this, v.value)}
            >{v.text}</button>
          ))}
        </div>
      </div>
    )
  }
}

EditTop.propTypes = {
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
}

export default EditTop
