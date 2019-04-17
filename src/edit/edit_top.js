import React from 'react'
import PropTypes from 'prop-types'
import editStore from './store'
import _ from 'lodash'
import { blockTypeList, pageTypeMap } from '../common/config'
import { observer } from 'mobx-react/index'
import configTempList from '../common/config_temp'

@observer
class EditTop extends React.Component {
  handleInsert = (type, e) => {
    e.target.blur()
    editStore.addConfigBlock(type)
    editStore.setSelected(editStore.config.blocks.length - 1)
  }

  handleInsertTemp = (e) => {
    if (e.target.value) {
      const config = _.find(configTempList, (config, group) => group === e.target.value)
      editStore.setConfig(config)
    }
  }

  handlePageType = (e) => {
    editStore.setSizePageType(e.target.value)
  }

  handlePrint = () => {
    window.print()
  }

  render () {
    return (
      <div className='gm-printer-label-edit-header-top'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            载入模板
            <select style={{ width: '80px' }} onChange={this.handleInsertTemp}>
              <option value=''>请选择</option>
              {_.map(configTempList, (config, group) => <option key={group} value={group}>{group}</option>)}
            </select>
          </div>
          <div>
            <button onClick={this.handlePrint}>测试打印</button>
            <button onClick={this.props.onSave}>保存</button>
          </div>
        </div>
        <hr/>
        <div>
          标签尺寸
          <select
            value={editStore.config.page.type}
            onChange={this.handlePageType}
          >
            {_.map(pageTypeMap, (v, k) => <option key={k} value={k}>{k}</option>)}
          </select>
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
  onSave: PropTypes.func.isRequired
}

export default EditTop
