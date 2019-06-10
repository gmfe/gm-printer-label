import React from 'react'
import { observer } from 'mobx-react'
import i18next from '../../locales'
import { Title, Gap, FieldBtn } from './component'
import { Flex } from '../components'
import editStore from './store'
import _ from 'lodash'

@observer
class EditAddFiled extends React.Component {
  handleAddFiled = (v, k) => {
    editStore.addFieldToBlocks(v, k)
    editStore.setSelected(editStore.config.blocks.length - 1)
  }

  renderBlocks () {
    const { data } = this.props
    return (
      <div>
        <Title title={i18next.t('添加字段')}/>
        <Gap/>
        <Flex wrap>
          {_.map(data, (v, k) => k !== '_origin' ? <FieldBtn key={k} name={k} onClick={this.handleAddFiled.bind(this, v, k)}/> : '')}
        </Flex>
      </div>
    )
  }
  render () {
    return (
      <div>{this.renderBlocks()}</div>
    )
  }
}

export default EditAddFiled
