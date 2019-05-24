import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { toJS } from 'mobx'
import editStore from './store'
import { Printer } from '../printer'
import { getStyleWithDiff } from '../util'
import { observer } from 'mobx-react'
import EditBottom from './edit_bottom'
import EditTop from './edit_top'
import Help from './help'

const STORAGE_CACHE = 'GM-PRINTER-LABEL-CACHE'

@observer
class Edit extends React.Component {
  constructor (props) {
    super(props)

    let config = props.config
    editStore.init(config)
  }

  componentDidMount () {
    window.document.addEventListener('gm-printer-label-select', this.handlePrinterSelect)
    window.document.addEventListener('gm-printer-label-block-style-set', this.handlePrinterBlockStyleSet)
    window.document.addEventListener('gm-printer-label-block-text-set', this.handlePrinterBlockTextSet)
    window.document.addEventListener('keydown', this.handleKeyDown)

    this.draftSaveTimer = setInterval(() => {
      window.localStorage.setItem(STORAGE_CACHE, JSON.stringify(toJS(editStore.config)))
    }, 2000)
  }

  componentWillUnmount () {
    window.document.removeEventListener('gm-printer-label-select', this.handlePrinterSelect)
    window.document.removeEventListener('gm-printer-label-block-style-set', this.handlePrinterBlockStyleSet)
    window.document.removeEventListener('gm-printer-label-block-text-set', this.handlePrinterBlockTextSet)
    window.document.removeEventListener('keydown', this.handleKeyDown)

    clearInterval(this.draftSaveTimer)
  }

  handleSave = () => {
    this.props.onSave(toJS(editStore.config))
  }

  handlePrinterSelect = (e) => {
    const { selected } = e.detail
    editStore.setSelected(selected)
  }

  handlePrinterBlockStyleSet = (e) => {
    const { style } = e.detail
    editStore.setConfigBlockBy('style', style)
  }

  handlePrinterBlockTextSet = (e) => {
    const { text } = e.detail
    editStore.setConfigBlockBy('text', text)
  }

  handleKeyDown = (e) => {
    if (e.target !== window.document.body) {
      return
    }

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

      const newStyle = getStyleWithDiff(editStore.config.blocks[editStore.selected].style, diffX, diffY)

      editStore.setConfigBlockBy('style', newStyle)
    } else if (e.code === 'Escape' && editStore.selected !== null) {
      e.preventDefault()
      editStore.setSelected(null)
    } else if (e.code === 'Backspace' && editStore.selected !== null) {
      e.preventDefault()
      editStore.removeConfig()
    }
  }

  handleCancel = (e) => {
    if (e.target === e.currentTarget) {
      editStore.setSelected(null)
    }
  }

  render () {
    const { data, initDefaultTemp, defaultTempList } = this.props
    return (
      <div className='gm-printer-label-edit'>
        <div className='gm-printer-label-edit-header'>
          <EditTop
            onSave={this.handleSave}
            initDefaultTemp={initDefaultTemp}
            defaultTempList={defaultTempList}
          />
          <hr/>
          <EditBottom/>
        </div>
        <div className='gm-printer-label-edit-content' onClick={this.handleCancel}>
          <div className='gm-printer-label-edit-tip'>单击选中内容，双击编辑，可拖动以摆放位置，可方向键细调位置</div>
          <Printer
            selected={editStore.selected}
            config={editStore.config}
            data={data}
            onChange={this.handleChange}
          />
          <Help data={data}/>
        </div>
      </div>
    )
  }
}

Edit.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  initDefaultTemp: PropTypes.string,
  defaultTempList: PropTypes.object
}

Edit.deaultProps = {
  onSave: _.noop
}

export default Edit
