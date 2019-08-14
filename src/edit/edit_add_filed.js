import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import i18next from '../../locales'
import { Title, Gap, FieldBtn, SubTitle } from './component'
import { Flex } from '../components'
import editStore from './store'
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
                {_.map(arr, o => <FieldBtn key={o.key} name={o.key} onClick={handleAddField.bind(this, o)}/>)}
              </Flex>
            </Fragment>
          )
        })}
      </div>
    )
  }
}

@observer
class EditAddFiled extends React.Component {
  handleAddFiled = (o) => {
    editStore.addFieldToBlocks(o)
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
