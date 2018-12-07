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
  { value: 'solid', text: '实线' },
  { value: 'dashed', text: '虚线' },
  { value: 'dotted', text: '圆点' }
]

const blockTypeList = [
  { value: '', text: '文本' },
  { value: 'line', text: '线条' },
  { value: 'qrcode', text: '二维码' }
]

const configTempList = [
  { value: 'null', text: 'null', config: require('./null.json') },
  { value: 'default', text: 'default', config: require('./default.json') },
  { value: '赫张鲁赫', text: '赫张鲁赫', config: require('./hezhangluhe.json') },
  { value: '黄马甲', text: '黄马甲', config: require('./huangmajia.json') },
  { value: '九州', text: '九州', config: require('./jiuzhou.json') },
  { value: '聚卿坊', text: '聚卿坊', config: require('./juqingfang.json') },
  { value: '品中', text: '品中', config: require('./pinzhong.json') },
  { value: '尚荣', text: '尚荣', config: require('./shangrong.json') },
  { value: '太原鸿新', text: '太原鸿新', config: require('./taiyuanhongxin.json') },
  { value: '万亩良田', text: '万亩良田', config: require('./wanmuliangtian.json') }
]

export {
  fontSizeList,
  borderStyleList,
  blockTypeList,
  pageTypeMap,
  configTempList
}
