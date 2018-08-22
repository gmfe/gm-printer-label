import { observable, action, configure } from 'mobx'
import _ from 'lodash'
import { pageSizeMap } from '../config'

configure({enforceActions: true})

class PrinterStore {
  @observable
  size = pageSizeMap['70X50'].size

  @observable
  gap = pageSizeMap['70X50'].gap

  data = {}

  @action
  init () {
    this.size = pageSizeMap['70X50'].size
    this.gap = pageSizeMap['70X50'].gap
    this.data = {}
  }

  @action
  setSize (size) {
    if (_.isString(size) && pageSizeMap[size]) {
      this.size = pageSizeMap[size].size
    } else if (_.isObject(size)) {
      this.size = size
    }
  }

  @action
  setGap (gap) {
    if (_.isString(gap) && pageSizeMap[gap]) {
      this.gap = pageSizeMap[gap].gap
    } else if (_.isObject(gap)) {
      this.gap = gap
    }
  }

  @action
  setData (data) {
    this.data = data
  }

  template (text) {
    try {
      return _.template(text, {
        interpolate: /{{([\s\S]+?)}}/g
      })({
        data: this.data
      })
    } catch (err) {
      console.warn(err)
      return text
    }
  }
}

const printerStore = new PrinterStore()

export default printerStore
