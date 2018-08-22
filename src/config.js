const pageSizeMap = {
  '70X50': {
    size: {
      width: '70mm',
      height: '50mm'
    },
    gap: {
      paddingTop: '2mm',
      paddingRight: '2mm',
      paddingBottom: '2mm',
      paddingLeft: '2mm'
    }
  },
  '自定义': {
    size: {
      width: '70mm',
      height: '50mm'
    },
    gap: {
      paddingTop: '2mm',
      paddingRight: '2mm',
      paddingBottom: '2mm',
      paddingLeft: '2mm'
    }
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

export {
  fontSizeList,
  borderStyleList,
  blockTypeList,
  pageSizeMap
}
