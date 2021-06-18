import i18next from '../../locales'

const insertBlocksConfig = [
  { value: '', text: i18next.t('文本') },
  { value: 'line', text: i18next.t('线条') },
  { value: 'order_qrcode', text: i18next.t('订单溯源二维码') },
  { value: 'qrcode', text: i18next.t('商品溯源二维码') },
  { value: 'barcode', text: i18next.t('验货条形码') },
  { value: 'package_id_qrcode', text: i18next.t('验货二维码') },
  { value: 'image', text: i18next.t('图片') },
  { value: 'diycode', text: i18next.t('自定义编码条形码') },
  { value: 'diyqrcode', text: i18next.t('自定义二维码') }
]

export default insertBlocksConfig