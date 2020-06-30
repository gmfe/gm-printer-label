import React from 'react'
import PropTypes from 'prop-types'
import { Copy } from './component'
import i18next from '../../../locales'
import { inject, observer } from 'mobx-react'

@inject('editStore')
@observer
class ConfigText extends React.Component {
  handleChangeConfig = (e) => {
    this.props.onChange(JSON.parse(e.target.value))
  }

  render () {
    const { config } = this.props.editStore

    return (
      <div className='gm-printer-label-edit-config-text'>
        <hr/>
        <div style={{ padding: '10px' }}>
          <Copy text={JSON.stringify(config)}>
            <div>
              {i18next.t('请将以下配置代码发给观麦技术')}
              <button>{i18next.t('复制')}</button>
            </div>
          </Copy>
          <textarea
            style={{
              display: 'block',
              width: '500px',
              height: '300px'
            }}
            value={JSON.stringify(config, null, 2)}
            onChange={this.handleChangeConfig}
          />
        </div>
      </div>
    )
  }
}

ConfigText.propTypes = {
  editStore: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ConfigText
