import moment from 'moment'
import Big from 'big.js'

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
    food_security_code
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
    'SKU': name,
    'SKU_ID': id,

    '下单': k_xiadan,
    '实称': k_shichen,

    '分拣号': k_sort_id,

    '司机': k_driver_name,
    '商户名': k_address_name,
    '商户ID': k_address_id,
    '收货人': receiver_name,
    '路线': route_name,

    '站点名': station_name,
    '备注': remark,

    '客服电话': phone,
    '溯源码': food_security_code,

    '当前时间_年月日': moment().format('YYYY-MM-DD')
  })

  return newData
}

export {
  toKey
}
