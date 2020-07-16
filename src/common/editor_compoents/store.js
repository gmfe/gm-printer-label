import { action, computed, observable } from 'mobx'
import _ from 'lodash'
import i18next from '../../../locales'

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

  @action.bound
  init (config, initDefaultTemp) {
    this.config = this.getHandledConfig(config)
    this.originConfig = this.getHandledConfig(config)
    this.selected = null
    this.tempKey = initDefaultTemp || ''
  }

  @action.bound
  setConfig (config, value) {
    this.selected = null
    this.config = { ...this.config, ...config }
    this.tempKey = value
  }

  @action.bound
  setConfigName (name) {
    this.config.name = name
  }

  @action.bound
  setSizePageType (type) {
    this.config.page.type = type
  }

  @action.bound
  setCustomizePageSize (name, value) {
    this.config.page[name] = value
  }

  @action.bound
  setPageName (name) {
    this.config.name = name
  }

  @action.bound
  setSelected (selected = null) {
    this.selected = selected
  }

  @action.bound
  setConfigBlockBy (who, value) {
    if (this.selected !== null) {
      this.config.blocks[this.selected][who] = value
    }
  }

  @action.bound
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
      case 'order_qrcode':
        this.config.blocks.push({
          type,
          order_qrcode: i18next.t('{{订单溯源码}}'),
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
      case 'package_id_qrcode':
        this.config.blocks.push({
          type,
          package_id_qrcode: i18next.t('{{商品码}}'),
          style: {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '50px',
            height: '50px'
          }
        })
        break
      case 'diycode':
        this.config.blocks.push({
          type,
          diycode: i18next.t('{{自定义编码}}'),
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

  // 删除所选字段
  @action.bound
  removeConfig () {
    if (this.selected !== null) {
      this.config.blocks.splice(this.selected, 1)
      this.selected = null
    }
  }

  // 添加字段到打印单中
  @action.bound
  addFieldToBlocks ({ value, key, fieldType }) {
    // 不一定每次打印都传页码过去，为了不出现“页码：”情况，页码前不加前缀
    (key === i18next.t('页码'))
      ? (this.config.blocks.push({
        text: `${value}`,
        fieldType,
        fieldKey: key,
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px'
        }
      }))
      : (this.config.blocks.push({
        text: `${key}:${value}`,
        fieldType,
        fieldKey: key,
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
      if ((!block.type || block.type === 'text') &&
        _.includes(block.text, '时间')) {
        return true
      }
    }
    return false
  }

  @action.bound
  getHandledConfig (config) {
    const result = _.cloneDeep(config)
    // 添加自定义尺寸字段

    result.page = {
      ...result.page,
      customizeWidth: result.page.customizeWidth || 100, // 若没有则默认为100
      customizeHeight: result.page.customizeHeight || 100
    }

    return result
  }
}

export default EditStore
