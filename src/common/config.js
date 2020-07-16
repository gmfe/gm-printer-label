import i18next from '../../locales'

const pageTypeMap = {
  '100X150': {
    width: '100mm',
    height: '150mm'
  },
  '100X100': {
    width: '100mm',
    height: '100mm'
  },
  '100X80': {
    width: '100mm',
    height: '80mm'
  },
  '80X100': {
    width: '80mm',
    height: '100mm'
  },
  '75X75': {
    width: '75mm',
    height: '75mm'
  },
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

const borderStyleList = [
  { value: 'solid', text: i18next.t('实线') },
  { value: 'dashed', text: i18next.t('虚线') },
  { value: 'dotted', text: i18next.t('圆点') }
]

export {
  borderStyleList,
  pageTypeMap
}
