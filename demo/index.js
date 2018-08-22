import React from 'react'
import ReactDOM from 'react-dom'
import config from '../demo/config.json'
import 'normalize.css/normalize.css'
import { PrinterEdit } from '../src'

class App extends React.Component {
  constructor (props) {
    super(props)

    let cConfig = window.localStorage.getItem('GM-PRINTER-LABEL-CACHE')
    if (cConfig) {
      cConfig = JSON.parse(cConfig)
    }

    this.state = {
      config: cConfig || config
    }
  }

  handleSave = (config) => {
    console.log(JSON.stringify(config))

    this.setState({
      config
    })

    window.localStorage.setItem('GM-PRINTER-LABEL-CACHE', JSON.stringify(config))
  }

  render () {
    return (
      <div>
        <PrinterEdit
          config={this.state.config}
          onSave={this.handleSave}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, window.document.getElementById('appContainer'))
