import React from 'react'
import PropTypes from 'prop-types'
import editStore from './store'
import { observer } from 'mobx-react'
import { pageTypeMap, blockTypeList } from '../common/config'
import { Flex, Select, Option } from '../components'
import { Gap } from './component'
import _ from 'lodash'

import i18next from '../../locales'

@observer
class EditSelect extends React.Component {
  constructor (props) {
    super(props)
    if (props.initDefaultTemp) {
      this.handleInsertTemp(props.initDefaultTemp)
    }
  }

  handleInsert = (type, e) => {
    e.target.blur()
    editStore.addConfigBlock(type)
    editStore.setSelected(editStore.config.blocks.length - 1)
  }

  handleInsertTemp = (value) => {
    const config = _.find(this.props.defaultTempList, (config, group) => group === value)
    editStore.setConfig(config, value)
  }

  handlePageName = e => {
    editStore.setPageName(e.target.value)
  }

  handlePageType = (e) => {
    editStore.setSizePageType(e)
  }

  render () {
    const { defaultTempList } = this.props
    const { tempKey, config: { name, page } } = editStore

    return (
      <div>
        <div>
          {
            defaultTempList && _.size(defaultTempList)
              ? <div>
                {i18next.t('载入模板：')}
                <Select style={{ width: '190px' }} value={tempKey} onChange={this.handleInsertTemp}>
                  <Option value=''>{i18next.t('请选择')}</Option>
                  {_.map(defaultTempList, (config, group) => <Option key={group} value={group}>{group}</Option>)}
                </Select>
              </div> : null
          }
        </div>

        <Flex alignCenter className='gm-padding-top-5'>
          <div>{i18next.t('模板名称')}：</div>
          <input className='gm-printer-label-edit-input-custom' type='text' value={name} onChange={this.handlePageName}/>
        </Flex>
        <Flex alignCenter className='gm-padding-top-5'>
          <div>{i18next.t('标签尺寸')}：</div>
          <Select style={{ width: '190px' }} className='gm-printer-label-edit-select' value={page.type} onChange={this.handlePageType}>
            {_.map(pageTypeMap, (v, k) => <Option key={k} value={k}>{k}</Option>)}
          </Select>
        </Flex>
        <Gap height='10px'/>

        <Flex alignCenter style={{ flexWrap: 'wrap' }}>
          <div style={{ margin: '0 14px 14px 0' }}>{i18next.t('插入')}</div>
          {_.map(blockTypeList, v => (
            <button className='btn btn-default btn-sm'
              key={v.value}
              style={{ margin: '0 14px 14px 0' }}
              onClick={this.handleInsert.bind(this, v.value)}
            >{v.text}</button>
          ))}
        </Flex>
      </div>
    )
  }
}

EditSelect.propTypes = {
  initDefaultTemp: PropTypes.string,
  defaultTempList: PropTypes.object
}

export default EditSelect
