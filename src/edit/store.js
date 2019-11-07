import { observable, action, computed } from 'mobx'
import _ from 'lodash'
import i18next from '../../locales'

class EditStore {
  @observable
  config = null

  @observable
  selected = null

  @observable
  // 载入模板下拉框选中的值
  tempKey = null

  @observable
  // 初始模板
  originConfig = null

  @action
  init (config, initDefaultTemp) {
    this.config = config
    this.originConfig = config
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
  setConfigName (name) {
    this.config.name = name
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
  addConfigBlock (type, url) {
    switch (type) {
      case '':
      case 'text':
        this.config.blocks.push({
          text: i18next.t('请编辑'),
          style: {
            position: 'absolute',
            fontSize: '14px',
            left: '0px',
            top: '0px'
          }
        })
        break
      case 'line':
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
        break
      case 'qrcode':
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
        break
      case 'barcode':
        this.config.blocks.push({
          type,
          barcode: i18next.t('{{商品码}}'),
          style: {
            position: 'absolute',
            left: '0px',
            top: '0px',
            height: '30px',
            width: '165px'
          }
        })
        break
      case 'image':
        this.config.blocks.push({
          type,
          url,
          style: {
            position: 'absolute',
            left: '0px',
            top: '0px',
            height: '100px',
            width: '100px'
          }
        })
        console.log(this.config)
        break
      default:
        window.alert(i18next.t('出错啦，未识别类型，此信息不应该出现'))
        break
    }
  }

  @action
  // 删除所选字段
  removeConfig () {
    if (this.selected !== null) {
      this.config.blocks.splice(this.selected, 1)
      this.selected = null
    }
  }

  @action
  // 添加字段到打印单中
  addFieldToBlocks ({ value, key }) {
    // 不一定每次打印都传页码过去，为了不出现“页码：”情况，页码前不加前缀
    (key === i18next.t('页码'))
      ? (this.config.blocks.push({
        text: `${value}`,
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px'
        }
      }))
      : (this.config.blocks.push({
        text: `${key}:${value}`,
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px'
        }
      }))
  }

  @computed
  get computedIsTime () {
    if (this.selected !== null) {
      const block = this.config.blocks[this.selected]
      if ((!block.type || block.type === 'text') && _.includes(block.text, '时间')) {
        return true
      }
    }
    return false
  }
}

const editStore = new EditStore()

export default editStore
