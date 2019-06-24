import React from 'react'
import ReactDOM from 'react-dom'
import config from '../demo/config.json'
import defaultTempList from './default_temp.js'
import { PrinterEditShadow } from '../src'
import testData from '../print_sku/test_data'
import addFields from './add_fields'
import { toKey } from '../print_sku/key'
import './index.less'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      config,
      defaultTempList,
      initDefaultTemp: 'default_without_food_security_code'
    }
  }

  handleSave = (config) => {
    this.setState({
      config
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
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, window.document.getElementById('appContainer'))
