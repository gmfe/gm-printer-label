import i18next from '../locales'
const addFields = [
  { key: i18next.t('商品名'), value: '{{SKU}}' },
  { key: i18next.t('商品ID'), value: '{{SKU_ID}}' },
  { key: i18next.t('下单数'), value: i18next.t('{{下单}}') },
  { key: i18next.t('实称数'), value: i18next.t('{{实称}}') },
  { key: i18next.t('分拣号'), value: i18next.t('{{分拣号}}') },
  { key: i18next.t('司机'), value: i18next.t('{{司机}}') },
  { key: i18next.t('商户名'), value: i18next.t('{{商户名}}') },
  { key: i18next.t('商户ID'), value: i18next.t('{{商户ID}}') },
  { key: i18next.t('收货人'), value: i18next.t('{{收货人}}') },
  { key: i18next.t('路线'), value: i18next.t('{{路线}}') },
  { key: i18next.t('站点名'), value: i18next.t('{{站点名}}') },
  { key: i18next.t('备注'), value: i18next.t('{{备注}}') },
  { key: i18next.t('客服电话'), value: i18next.t('{{客服电话}}') },
  { key: i18next.t('商品溯源二维码'), value: i18next.t('{{溯源码}}') },
  { key: i18next.t('商品验货码'), value: i18next.t('{{商品码}}') },
  { key: i18next.t('自定义编码'), value: i18next.t('{{自定义编码}}') },
  { key: i18next.t('打印时间'), value: i18next.t('{{当前时间_年月日}}') },
  { key: i18next.t('页码'), value: i18next.t('{{页码}}') }
]
export default addFields
