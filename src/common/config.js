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

const DiyTimeType = [
  {
    type: '',
    text: '格式“2022-01-01 19:00:00”，输入“单据日期：{{单据日期}}”；',
    format: 'YYYY-MM-DD HH:mm:ss'
  },
  {
    type: '时分',
    text: '格式“2022-01-01 19:00”，输入“单据日期：{{单据日期_时分}}”；',
    format: 'YYYY-MM-DD HH:mm'
  },
  {
    type: '日期',
    text: '格式“2022-01-01”，输入“单据日期：{{单据日期_日期}}”；',
    format: 'YYYY-MM-DD'
  },
  {
    type: '无年份',
    text: '格式“01-01 19:00:00”，输入“单据日期：{{单据日期_无年份}}”；',
    format: 'MM-DD HH:mm:ss'
  },
  {
    type: '日期_无年份',
    text: '格式“01-01”，输入“单据日期：{{单据日期_日期_无年份}}"；',
    format: 'MM-DD'
  },
  {
    type: '时间',
    text: '格式“19:00:00"，输入“单据日期：{{单据日期_时间}}"；',
    format: 'HH:mm:ss'
  },
  {
    type: '日期_星期',
    text: '格式“2022-01-01 星期六”，输入“单据日期：{{单据日期_日期_星期}}”；',
    format: 'YYYY-MM-DD dddd'
  }
]

export { DiyTimeType, borderStyleList, pageTypeMap }
