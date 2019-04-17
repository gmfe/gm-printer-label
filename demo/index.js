import React from 'react'
import ReactDOM from 'react-dom'
import config from '../demo/config.json'
import { PrinterEditShadow } from '../src'
import testData from '../print_sku/test_data'
import { toKey } from '../print_sku/key'
import './index.less'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      config
    }
  }

  handleSave = (config) => {
    console.log(config)
    this.setState({
      config
    })
  }

  render () {
    return (
      <div>
        <PrinterEditShadow
          data={toKey(testData)}
          config={this.state.config}
          onSave={this.handleSave}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, window.document.getElementById('appContainer'))
