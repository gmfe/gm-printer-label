import React from 'react'
import PropTypes from 'prop-types'
import editStore from './store'
import _ from 'lodash'
import { blockTypeList, pageTypeMap } from '../config'
import { observer } from 'mobx-react/index'
import { getStaticStorage } from 'gm_static_storage'
import queryString from 'query-string'

@observer
class EditTop extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      configTempList: []
    }
  }

  componentDidMount () {
    const { group_id } = queryString.parse(window.location.search)

    getStaticStorage('/mes/label_configs.json').then(json => {
      this.setState({
        configTempList: json
      })

      if (group_id && json[group_id]) {
        editStore.setConfig(json[group_id])
        window.alert(`已载入${group_id}模板`)
      }
    })
  }

  handleInsert = (type, e) => {
    e.target.blur()
    editStore.addConfigBlock(type)
    editStore.setSelected(editStore.config.blocks.length - 1)
  }

  handleInsertTemp = (e) => {
    if (e.target.value) {
      const config = _.find(this.state.configTempList, (config, group) => group === e.target.value)
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
    const { configTempList } = this.state
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
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
}

export default EditTop
