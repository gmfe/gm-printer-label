import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { toJS } from 'mobx'
import editStore from './store'
import { Printer, getCSS } from '../printer'
import './style.less'
import { getStyleWithDiff, insertCSS } from '../util'
import { observer } from 'mobx-react/index'
import EditBottom from './edit_bottom'
import EditTop from './edit_top'
import Help from './help'
import data from './data'
import { Copy } from './component'

insertCSS(getCSS())

const STORAGE_CACHE = 'GM-PRINTER-LABEL-CACHE'

@observer
class Edit extends React.Component {
  constructor (props) {
    super(props)

    let config = props.config

    let sConfig = window.localStorage.getItem(STORAGE_CACHE)
    if (sConfig) {
      try {
        if (sConfig !== JSON.stringify(config)) {
          config = JSON.parse(sConfig)

          window.alert('发现草稿，已加载')
        }
      } catch (err) {
      }
    }

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

  handleChangeConfig = (e) => {
    editStore.setConfig(JSON.parse(e.target.value))
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
    return (
      <div className='gm-printer-label-edit'>
        <div className='gm-printer-label-edit-header'>
          <EditTop data={data} onSave={this.handleSave}/>
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
          <hr/>
          <div style={{ padding: '10px' }}>
            <Copy text={JSON.stringify(editStore.config)}>
              <div>
                请将以下配置代码发给观麦技术 <button>复制</button>
              </div>
            </Copy>
            <textarea
              style={{
                display: 'block',
                width: '500px',
                height: '300px'
              }}
              value={JSON.stringify(editStore.config, null, 2)}
              onChange={this.handleChangeConfig}
            />
          </div>
        </div>
      </div>
    )
  }
}

Edit.propTypes = {
  config: PropTypes.object.isRequired,
  onSave: PropTypes.func
}

Edit.deaultProps = {
  onSave: _.noop
}

export default Edit
