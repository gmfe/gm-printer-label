const pageTypeMap = {
  '70X50': {
    width: '70mm',
    height: '50mm'
  },
  '60X40': {
    width: '60mm',
    height: '50mm'
  },
  '40X30': {
    width: '40mm',
    height: '30mm'
  }
}

const fontSizeList = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px'
]

const borderStyleList = [
  {value: 'solid', text: '实线'},
  {value: 'dashed', text: '虚线'},
  {value: 'dotted', text: '圆点'}
]

const blockTypeList = [
  {value: '', text: '文本'},
  {value: 'line', text: '线条'},
  {value: 'qrcode', text: '二维码'}
]

const configTempList = [
  { value: '1', text: '模板1', config: require('./config_temp/1.json') },
  { value: '2', text: '黄马甲', config: require('./config_temp/hmj.json') }
]

export {
  fontSizeList,
  borderStyleList,
  blockTypeList,
  pageTypeMap,
  configTempList
}
