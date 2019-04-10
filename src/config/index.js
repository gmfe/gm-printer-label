const pageTypeMap = {
  '70X50': {
    width: '70mm',
    height: '50mm'
  },
  '60X40': {
    width: '60mm',
    height: '40mm'
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
  { value: 'qrcode', text: '二维码' },
  { value: 'barcode', text: '商品码' }
]

export {
  fontSizeList,
  borderStyleList,
  blockTypeList,
  pageTypeMap
}
