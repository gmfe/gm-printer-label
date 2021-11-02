import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Printer } from '../../printer'
import { inject, observer } from 'mobx-react'
import EditModifyFiled from './edit_modify_filed'
import EditTitle from './edit_title'
import EditSelect from './edit_select'
import EditAddFiled from './edit_add_filed'
import { Gap, Title } from './component'
import { Flex } from '../../components'
import i18next from '../../../locales'
import ContextMenu from './context_menu'

@inject('editStore')
@observer
class Edit extends React.Component {
  handleCancel = (e) => {
    if (e.target === e.currentTarget) {
      this.props.editStore.setSelected(null)
    }
  }

  render () {
    const { data, initDefaultTemp, defaultTempList, addFields, onSave, editStore, insertBlocksConfig, uploadQiniuImage } = this.props
    return (
      <div className='gm-printer-label-edit'>

        <Flex className='gm-printer-label-edit-title-fixed'>
          <Title title={i18next.t('模板预览')}
            text={<span className='gm-text-desc gm-padding-left-5'>
              {i18next.t('说明：单击选中内容，双击编辑，可拖动以摆放位置，可方向键细调位置，可点击右键删除')}
            </span>}/>
        </Flex>

        <div className='gm-printer-label-edit-header'>
          <EditTitle
            onSave={onSave}
            initDefaultTemp={initDefaultTemp}
          />
          <Gap height='10px'/>
          <EditSelect
            insertBlocksConfig={insertBlocksConfig}
            initDefaultTemp={initDefaultTemp}
            defaultTempList={defaultTempList}
            uploadQiniuImage={uploadQiniuImage}
          />
          <Gap height='5px'/>
          <EditModifyFiled/>
          <Gap height='5px'/>
          <EditAddFiled data={addFields}/>

          {/* 挂载shadow down中的Dialog组件 */}
          <div id='gm-printer-label-modal'/>

        </div>

        <div className='gm-printer-label-edit-content'
          onClick={this.handleCancel}>
          <ContextMenu>
            <Printer
              selected={editStore.selected}
              config={editStore.config}
              data={data}
              onChange={this.handleChange}
            />
          </ContextMenu>
        </div>
      </div>
    )
  }
}

Edit.propTypes = {
  editStore: PropTypes.object,
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  initDefaultTemp: PropTypes.string,
  defaultTempList: PropTypes.object,
  addFields: PropTypes.object.isRequired,
  insertBlocksConfig: PropTypes.array.isRequired
}

Edit.deaultProps = {
  onSave: _.noop
}

export default Edit
