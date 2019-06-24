import i18next from '../../locales'

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
    height: '28mm'
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
  { value: 'solid', text: i18next.t('实线') },
  { value: 'dashed', text: i18next.t('虚线') },
  { value: 'dotted', text: i18next.t('圆点') }
]

const blockTypeList = [
  { value: '', text: i18next.t('文本') },
  { value: 'line', text: i18next.t('线条') },
  { value: 'qrcode', text: i18next.t('二维码') },
  { value: 'barcode', text: i18next.t('条形码') }
]

export {
  fontSizeList,
  borderStyleList,
  blockTypeList,
  pageTypeMap
}
