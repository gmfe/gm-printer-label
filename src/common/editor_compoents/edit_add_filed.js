import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import i18next from '../../../locales'
import { FieldBtn, Gap, SubTitle, Title } from './component'
import { Flex } from '../../components'
import _ from 'lodash'

class FieldList extends React.Component {
  render () {
    const { fields, handleAddField } = this.props
    return (
      <div>
        <Title title={i18next.t('添加字段')}/>
        <Gap/>
        {_.map(fields, (arr, groupName) => {
          return (
            <Fragment key={groupName}>
              <SubTitle text={groupName}/>
              <Flex wrap>
                {_.map(arr, o => <FieldBtn key={o.key} name={o.key}
                  onClick={handleAddField.bind(this,
                    o)}/>)}
              </Flex>
            </Fragment>
          )
        })}
      </div>
    )
  }
}

@inject('editStore')
@observer
class EditAddFiled extends React.Component {
  handleAddFiled = (o) => {
    const { editStore } = this.props

    editStore.addFieldToBlocks(o)
    // 是自定义二维码就return
    // 特殊情况处理：添加了自定义二维码后又添加其他的码，再次选中自定义二维码后，进行编辑字段时，自定义二维码的编辑字段会隐藏
    if (editStore.config.blocks[editStore.selected]?.type === 'diyqrcode') return
    editStore.setSelected(editStore.config.blocks.length - 1)
  }

  render () {
    const { data } = this.props

    return (
      <FieldList fields={data} handleAddField={this.handleAddFiled}/>
    )
  }
}

export default EditAddFiled
