import React from 'react'
import ReactDOM from 'react-dom'
import config from './config.json'
import defaultTempList from './default_temp.js'
import { PrinterEditShadow } from '../../src'
import addFields from './add_fields'
import insertBlocksConfig from './insert_blocks_config'
import './index.less'

import testData from './mock/test_data'
import { toKey } from './mock/key'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      config,
      defaultTempList,
      initDefaultTemp: 'default_without_food_security_code',
    }
  }

  handleSave = (config) => {
    this.setState({
      config,
    })
    console.log(JSON.stringify(config))
  }

  render () {
    return (
      <div>
        <PrinterEditShadow
          data={toKey(testData)}
          config={this.state.config}
          onSave={this.handleSave}
          defaultTempList={this.state.defaultTempList}
          initDefaultTemp={this.state.initDefaultTemp}
          addFields={addFields}
          insertBlocksConfig={insertBlocksConfig}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, window.document.getElementById('appContainer'))
