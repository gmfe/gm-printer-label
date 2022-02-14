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
  },
  // 箱签
  A4: {
    width: '210mm',
    height: '297mm'
  },
  A5: {
    width: '148mm',
    height: '210mm'
  },
  'A4/2': {
    width: '210mm',
    height: '140mm'
  },
  'A4/3': {
    width: '210mm',
    height: '93mm'
  },
  '241x280': {
    width: '241mm',
    height: '280mm'
  },
  '241x140': {
    width: '241mm',
    height: '140mm'
  }
}

const borderStyleList = [
  { value: 'solid', text: i18next.t('实线') },
  { value: 'dashed', text: i18next.t('虚线') },
  { value: 'dotted', text: i18next.t('圆点') }
]

export { borderStyleList, pageTypeMap }
