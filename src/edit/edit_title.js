import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex } from '../components'
import { Title } from './component'
import i18next from '../../locales'

@observer
class EditTitle extends React.Component {
  handlePrint = () => {
    window.print()
  }

  render () {
    return (
      <div className='gm-printer-label-edit-header-top'>
        <Flex justifyBetween>
          <Title title={i18next.t('基本信息')}/>
          <div>
            <button className='btn btn-default btn-sm' onClick={this.handlePrint}>{i18next.t('测试打印')}
            </button>
            <div className='gm-gap-10'/>
            <button className='btn btn-primary btn-sm' onClick={this.props.onSave}>{i18next.t('保存')}
            </button>
          </div>
        </Flex>
      </div>
    )
  }
}

EditTitle.propTypes = {
  onSave: PropTypes.func.isRequired
}

export default EditTitle
