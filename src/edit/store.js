import { observable, action, configure } from 'mobx'
import i18next from '../../locales'

configure({ enforceActions: 'observed' })

class EditStore {
  @observable
  config = null

  @observable
  selected = null

  @observable
  tempKey = null

  @observable
  isSelect = null

  @action
  init (config, initDefaultTemp) {
    this.config = config
    this.selected = null
    this.tempKey = initDefaultTemp || ''
  }

  @action
  setConfig (config, value) {
    this.selected = null
    this.config = { ...this.config, ...config }
    this.tempKey = value
  }

  @action
  setSizePageType (type) {
    this.config.page.type = type
  }

  @action
  setPageName (name) {
    this.config.name = name
  }

  @action
  setSelected (selected = null) {
    this.selected = selected
  }

  @action
  setConfigBlockBy (who, value) {
    if (this.selected !== null) {
      this.config.blocks[this.selected][who] = value
    }
  }

  @action
  addConfigBlock (type) {
    if (!type || type === 'text') {
      this.config.blocks.push({
        text: i18next.t('请编辑'),
        style: {
          position: 'absolute',
          fontSize: '14px',
          left: '0px',
          top: '0px'
        }
      })
    } else if (type === 'line') {
      this.config.blocks.push({
        type,
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px',
          borderTopColor: 'black',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          width: '100%'
        }
      })
    } else if (type === 'qrcode') {
      this.config.blocks.push({
        type,
        qrcode: i18next.t('{{溯源码}}'),
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '50px',
          height: '50px'
        }
      })
    } else if (type === 'barcode') {
      this.config.blocks.push({
        type,
        barcode: i18next.t('{{商品验货码}}'),
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px',
          height: '30px',
          width: '165px'
        }
      })
    } else {
      window.alert(i18next.t('出错啦，未识别类型，此信息不应该出现'))
    }
  }

  @action
  removeConfig () {
    if (this.selected !== null) {
      this.config.blocks.splice(this.selected, 1)
      this.selected = null
    }
  }

  @action
  addFieldToBlocks (value, key) {
    this.config.blocks.push({
      text: `${key}: ${value}`,
      style: {
        position: 'absolute',
        left: '0px',
        top: '0px'
      }
    })
  }
}

const editStore = new EditStore()

export default editStore
