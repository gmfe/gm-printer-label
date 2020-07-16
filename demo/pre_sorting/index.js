import React from 'react'
import ReactDOM from 'react-dom'
import config from './config.json'
import { LabelEditorPreSort } from '../../src'
import addFields from './add_fields'
import insertBlocksConfig from './insert_blocks_config'
import './index.less'

import testData from './mock/test_data'
import { toKey } from './mock/key'
import defaultTempList from './default_temp'

class App extends React.Component {
  defaultTempList = defaultTempList
  initDefaultTemp = 'default'

  state = {
    config,
  }

  handleSave = (config) => {
    this.setState({
      config,
    })
    console.log(config)
  }

  render () {
    return (
      <div>
        <LabelEditorPreSort
          data={toKey(testData)}
          config={this.state.config}
          onSave={this.handleSave}
          defaultTempList={this.defaultTempList}
          initDefaultTemp={null}
          addFields={addFields}
          insertBlocksConfig={insertBlocksConfig}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, window.document.getElementById('appContainer'))
