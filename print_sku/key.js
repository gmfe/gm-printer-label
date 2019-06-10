import moment from 'moment/moment'
import Big from 'big.js'
import i18next from '../locales'

function toKey (data, options = {}) {
  const newData = {
    _origin: data
  }

  const {
    id,
    name,
    quantity,
    std_unit_name,
    sale_ratio,
    sale_unit_name,
    is_weight,
    weighting_quantity,
    order,
    driver,
    phone,
    remark,
    food_security_code,
    package_id,
    outer_id,
    page_number
  } = data
  const {
    station_name,
    receiver_name,
    route_name,
    sort_id,
    source_sort_id,
    address_id, source_address_id,
    address_name, source_address_name
  } = order

  // TODO ximin 补注释
  const k_driver_name =
    `${driver.name || ''}` +
    (source_sort_id ? `(${driver.source_driver_name})` : '')

  const k_address_name =
    `${address_name}` +
    (source_address_id ? `(${source_address_name})` : '')

  const k_address_id =
    `${address_id}` +
    (source_address_id ? `(${source_address_id})` : '')

  const k_sort_id =
    sort_id +
    (source_sort_id ? `(${source_sort_id})` : '')

  const k_xiadan =
    quantity + sale_unit_name +
    `(${parseFloat(Big(sale_ratio).times(quantity).toFixed(2))}${std_unit_name})`

  let k_shichen =
    (is_weight ? weighting_quantity : (
      weighting_quantity === 0 ? parseFloat(Big(quantity).times(sale_ratio).toFixed(2)) : weighting_quantity)) +
    std_unit_name
  if (options.isShowRealWeight) {
    k_shichen = ''
  }

  Object.assign(newData, {
    [i18next.t('商品名')]: name,
    [i18next.t('商品ID')]: id,

    [i18next.t('下单数')]: k_xiadan,
    [i18next.t('实称数')]: k_shichen,

    [i18next.t('分拣号')]: k_sort_id,

    [i18next.t('司机')]: k_driver_name,
    [i18next.t('商户名')]: k_address_name,
    [i18next.t('商户ID')]: k_address_id,
    [i18next.t('收货人')]: receiver_name,
    [i18next.t('路线')]: route_name,

    [i18next.t('站点名')]: station_name,
    [i18next.t('备注')]: remark,

    [i18next.t('客服电话')]: phone,
    [i18next.t('溯源码')]: food_security_code,
    [i18next.t('商品验货码')]: package_id,
    [i18next.t('自定义编码')]: outer_id,

    [i18next.t('打印时间')]: moment().format('YYYY-MM-DD'),
    [i18next.t('页码')]: page_number
  })

  return newData
}

export {
  toKey
}
