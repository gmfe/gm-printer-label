import React from 'react'
import { Provider } from 'mobx-react'
import { getStyleWithDiff } from '../../util'

const withStore = store => WrapComponent =>
  class extends React.Component {
    constructor (props) {
      super(props)

      this.editStore = store
      this.editStore.init(props.config, props.initDefaultTemp)
    }

    componentDidMount () {
      window.document.addEventListener('gm-printer-label-select',
        this.handlePrinterSelect)
      window.document.addEventListener('gm-printer-label-block-style-set',
        this.handlePrinterBlockStyleSet)
      window.document.addEventListener('gm-printer-label-block-text-set',
        this.handlePrinterBlockTextSet)
      window.document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount () {
      window.document.removeEventListener('gm-printer-label-select',
        this.handlePrinterSelect)
      window.document.removeEventListener('gm-printer-label-block-style-set',
        this.handlePrinterBlockStyleSet)
      window.document.removeEventListener('gm-printer-label-block-text-set',
        this.handlePrinterBlockTextSet)
      window.document.removeEventListener('keydown', this.handleKeyDown)
    }

    handlePrinterSelect = (e) => {
      const { selected } = e.detail
      this.editStore.setSelected(selected)
    }

    handlePrinterBlockStyleSet = (e) => {
      const { style } = e.detail
      this.editStore.setConfigBlockBy('style', style)
    }

    handlePrinterBlockTextSet = (e) => {
      const { text } = e.detail
      this.editStore.setConfigBlockBy('text', text)
    }

    handleKeyDown = (e) => {
      if (e.target !== window.document.body) {
        return
      }
      const { editStore } = this
      if (e.code.startsWith('Arrow') && editStore.selected !== null) {
        e.preventDefault()

        let diffX = 0
        let diffY = 0

        if (e.code === 'ArrowLeft') {
          diffX -= 1
        } else if (e.code === 'ArrowUp') {
          diffY -= 1
        } else if (e.code === 'ArrowRight') {
          diffX += 1
        } else if (e.code === 'ArrowDown') {
          diffY += 1
        }

        const newStyle = getStyleWithDiff(
          editStore.config.blocks[editStore.selected].style, diffX, diffY)

        editStore.setConfigBlockBy('style', newStyle)
      } else if (e.code === 'Escape' && editStore.selected !== null) {
        e.preventDefault()
        editStore.setSelected(null)
      } else if (e.code === 'Backspace' && editStore.selected !== null) {
        e.preventDefault()
        editStore.removeConfig()
      }
    }

    render () {
      return (
        <Provider editStore={this.editStore}>
          <WrapComponent {...this.props}/>
        </Provider>
      )
    }
  }

export default withStore
