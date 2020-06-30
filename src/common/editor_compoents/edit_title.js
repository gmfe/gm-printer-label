import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import {
  Dialog,
  DropDown,
  DropDownItem,
  DropDownItems,
  Flex
} from '../../components'
import { Title } from './component'
import i18next from '../../../locales'
import { toJS } from 'mobx'

const DialogChildren = observer((props) => {
  const { config: { name } } = props.editStore

  const handleConfigName = (e) => {
    props.editStore.setConfigName(e.target.value)
  }

  return (
    <Flex alignCenter>
      <div>{i18next.t('模板名称')}：</div>
      <input className='gm-printer-label-edit-input-custom' type='text'
        value={name} onChange={handleConfigName}/>
    </Flex>
  )
})

@inject('editStore')
@observer
class EditTitle extends React.Component {
  handlePrint = () => {
    window.print()
  }

  handleReset = () => {
    const { initDefaultTemp } = this.props
    const { editStore } = this.props

    // 进行深拷贝
    const newConfig = JSON.parse(JSON.stringify(editStore.originConfig))

    // 重置模板配置，但是保留原来模板名字
    const config = {
      ...newConfig,
      name: editStore.config.name
    }

    editStore.init(config, initDefaultTemp)
  }

  handleSaveAs = () => {
    const { editStore } = this.props

    Dialog.render({
      title: i18next.t('另存为'),
      children: <DialogChildren editStore={editStore}/>,
      onOK: async () => {
        // 传true参数 用来区分“另存为”是新建模板，不是编辑模板
        this.props.onSave(toJS(editStore.config), true)
      }
    })
  }

  handleSave = () => {
    const { editStore, onSave } = this.props

    onSave(toJS(editStore.config))
  }

  render () {
    return (
      <div className='gm-printer-label-edit-header-top'>
        <Flex justifyBetween>
          <Title title={i18next.t('基本信息')}/>
          <div>
            <button className='btn btn-default btn-sm'
              onClick={this.handlePrint}>{i18next.t('测试打印')}
            </button>
            <div className='gm-gap-10'/>
            <button className='btn btn-default btn-sm'
              onClick={this.handleReset}>{i18next.t('重置')}
            </button>
            <div className='gm-gap-10'/>
            <DropDown
              popup={(
                <DropDownItems>
                  <DropDownItem onClick={this.handleSaveAs}>{i18next.t(
                    '另存为')}</DropDownItem>
                </DropDownItems>
              )}
            >
              <button className='btn btn-primary btn-sm'
                onClick={this.handleSave}>{i18next.t('保存')}</button>
            </DropDown>
          </div>
        </Flex>
      </div>
    )
  }
}

EditTitle.propTypes = {
  editStore: PropTypes.object,
  onSave: PropTypes.func.isRequired
}

export default EditTitle
