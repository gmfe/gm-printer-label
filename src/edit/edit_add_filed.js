import React from 'react'
import { observer } from 'mobx-react'
import i18next from '../../locales'
import { Title, Gap, FieldBtn } from './component'
import { Flex } from '../components'
import editStore from './store'
import _ from 'lodash'

@observer
class EditAddFiled extends React.Component {
  handleAddFiled = (o) => {
    editStore.addFieldToBlocks(o)
    editStore.setSelected(editStore.config.blocks.length - 1)
  }

  render () {
    const { data } = this.props

    return (
      <div>
        <Title title={i18next.t('添加字段')}/>
        <Gap/>
        <Flex wrap>
          {_.map(data, o => <FieldBtn key={o.key} name={o.key} onClick={this.handleAddFiled.bind(this, o)}/>)}
        </Flex>
      </div>
    )
  }
}

export default EditAddFiled
