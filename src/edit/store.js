import { observable, action, configure } from 'mobx'

configure({ enforceActions: 'observed' })

class EditStore {
  @observable
  config = null

  @observable
  selected = null

  @action
  init (config) {
    this.config = config
    this.selected = null
  }

  @action
  setConfig (config) {
    this.selected = null
    this.config = { ...this.config, ...config }
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
        text: '请编辑',
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
        qrcode: '{{溯源码}}',
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
        barcode: '{{商品码}}',
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px',
          height: '30px',
          width: '165px'
        }
      })
    } else {
      window.alert('出错啦，未识别类型，此信息不应该出现')
    }
  }

  @action
  removeConfig () {
    if (this.selected !== null) {
      this.config.blocks.splice(this.selected, 1)
      this.selected = null
    }
  }
}

const editStore = new EditStore()

export default editStore
