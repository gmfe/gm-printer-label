import moment from 'moment/moment'
import Big from 'big.js'
import i18next from '../../../locales'
const t = i18next.t

export const CLEAN_FOOD_NUTRITION_INFO = [
  {
    text: t('能量'),
    value: 'energy',
    unit: 'KJ',
  },
  {
    text: t('碳水化合物'),
    value: 'carbohydrate',
    unit: 'g',
  },
  {
    text: t('蛋白质'),
    value: 'protein',
    unit: 'g',
  },
  {
    text: t('脂肪'),
    value: 'fat',
    unit: 'g',
  },
  {
    text: t('钙'),
    value: 'element_Ca',
    unit: 'mg',
  },
  {
    text: t('磷'),
    value: 'element_P',
    unit: 'mg',
  },
  {
    text: t('钾'),
    value: 'element_K',
    unit: 'mg',
  },
  {
    text: t('钠'),
    value: 'element_Na',
    unit: 'mg',
  },
  {
    text: t('氯'),
    value: 'element_Cl',
    unit: 'mg',
  },
  {
    text: t('镁'),
    value: 'element_Mg',
    unit: 'mg',
  },
  {
    text: t('铁'),
    value: 'element_Fe',
    unit: 'mg',
  },
  {
    text: t('锌'),
    value: 'element_Zn',
    unit: 'mg',
  },
  {
    text: t('硒'),
    value: 'element_Se',
    unit: 'μg',
  },
  {
    text: t('钼'),
    value: 'element_Mo',
    unit: 'μg',
  },
  {
    text: t('铬'),
    value: 'element_Cr',
    unit: 'μg',
  },
  {
    text: t('碘'),
    value: 'element_I',
    unit: 'μg',
  },
  {
    text: t('铜'),
    value: 'element_Cu',
    unit: 'mg',
  },
  {
    text: t('维生素A'),
    value: 'vitamin_A',
    unit: 'μg',
  },
  {
    text: t('维生素D'),
    value: 'vitamin_D',
    unit: 'μg',
  },
  {
    text: t('维生素E'),
    value: 'vitamin_E',
    unit: 'mg',
  },
  {
    text: t('维生素K'),
    value: 'vitamin_K',
    unit: 'μg',
  },
  {
    text: t('维生素B1'),
    value: 'vitamin_B1',
    unit: 'mg',
  },
  {
    text: t('维生素B2'),
    value: 'vitamin_B2',
    unit: 'mg',
  },
  {
    text: t('维生素B6'),
    value: 'vitamin_B6',
    unit: 'mg',
  },
  {
    text: t('维生素B12'),
    value: 'vitamin_B12',
    unit: 'μg',
  },
  {
    text: t('泛酸'),
    value: 'vitamin_B_pa',
    unit: 'mg',
  },
  {
    text: t('叶酸'),
    value: 'vitamin_B_folate',
    unit: 'μg',
  },
  {
    text: t('烟酸'),
    value: 'vitamin_B_niacin',
    unit: 'mg',
  },
  {
    text: t('胆碱'),
    value: 'vitamin_B_choline',
    unit: 'mg',
  },
  {
    text: t('生物素'),
    value: 'vitamin_B_biotin',
    unit: 'mg',
  },
  {
    text: t('维生素C'),
    value: 'vitamin_C',
    unit: 'mg',
  },
  {
    text: t('膳食纤维'),
    value: 'dietary_fiber',
    unit: 'g',
  },
  {
    text: t('水'),
    value: 'water',
    unit: 'g',
  },
]

function toKey (data, options = {}) {
  const newData = {
    _origin: data,
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
    order_security_code,
    package_id,
    outer_id,
    page_number,
    desc,
    sorter,
    std_sale_price,
    sale_unit_price,
    order_id,
    out_stock_quantity,
    out_stock_price,
    pick_up_station,
    community_name,
    distributor_name,
    distributor_username,
    distributor_address,
    distributor_phone,
    clean_food_info,
    proc_plan_finish_time,
    proc_plan_start_time,
    saleunit_weighting_quantity,
  } = data
  const {
    station_name,
    receiver_name,
    route_name,
    sort_id,
    source_sort_id,
    address_id,
    source_address_id,
    address_name,
    source_address_name,
    order_remark,
    receive_begin_time,
    receive_end_time,
    res_custom_code,
    address,
    receiver_phone,
    sale_employee_name,
  } = order

  const {
    origin_area,
    material_description,
    suggest_usage,
    storage_conditions,
    cutting_specification,
    license,
    product_standards,
    shelf_life,
    nutrition_info,
    nutrition_status,
  } = clean_food_info

  const { sorter_username, sorter_name } = sorter

  // TODO ximin 补注释
  const k_driver_name =
    `${driver.name || ''}` +
    (source_sort_id ? `(${driver.source_driver_name})` : '')

  const k_address_name =
    `${address_name}` + (source_address_id ? `(${source_address_name})` : '')

  const k_address_id =
    `${address_id}` + (source_address_id ? `(${source_address_id})` : '')

  const k_sort_id = sort_id + (source_sort_id ? `(${source_sort_id})` : '')

  const k_xiadan =
    quantity +
    sale_unit_name +
    `(${parseFloat(
      Big(sale_ratio).times(quantity).toFixed(2),
    )}${std_unit_name})`

  let k_shicheng_std_unit =
    (is_weight
      ? weighting_quantity
      : weighting_quantity === 0
        ? parseFloat(Big(quantity).times(sale_ratio).toFixed(2))
        : weighting_quantity) + std_unit_name
  if (options.isShowRealWeight) {
    k_shicheng_std_unit = ''
  }
  const k_shicheng_sale_unit = `${saleunit_weighting_quantity}${sale_unit_name}`

  // 营养成分需要单位和name,后台不维护单位
  // 构造营养成分表格数据
  const nutritionInfo = {
    title: t('营养成分表'),
    tHeadInfo: [t('项目'), t('每100g'), t('NRV%')],
    tBodyInfo: nutrition_info.map((item) => {
      let per_100g
      let name
      CLEAN_FOOD_NUTRITION_INFO.forEach((nutrition) => {
        if (item.key === nutrition.value) {
          per_100g = item.per_100g + nutrition.unit
          name = nutrition.text
        }
      })

      return [name, per_100g, item.NRV + '%'] // 数组才能保证顺序
    }),
  }

  Object.assign(newData, {
    SKU: name,
    SKU_ID: id,

    下单: k_xiadan,
    下单_销售单位: quantity + sale_unit_name,
    实称: k_shicheng_std_unit,
    实称数_销售单位: k_shicheng_sale_unit,
    分拣号: k_sort_id,

    司机: k_driver_name,
    商户名: k_address_name,
    商户自定义编码: res_custom_code,
    商户ID: k_address_id,
    收货人: receiver_name,
    收货电话: receiver_phone,
    收货地址: address,
    销售经理: sale_employee_name,
    社区店名称: community_name,
    团长姓名: distributor_name,
    团长账户: distributor_username,
    团长地址: distributor_address,
    团长电话: distributor_phone,
    路线: route_name,
    线路: route_name, // 统一叫「线路」，保留「路线」配置项，防止之前配置了「路线」的打印出错

    站点名: station_name,
    备注: remark,

    客服电话: phone,
    溯源码: food_security_code,
    订单溯源码: order_security_code,
    商品码: package_id,
    自定义编码: outer_id,

    当前时间: moment().format('YYYY-MM-DD HH:mm:ss'),
    当前时间_时间: moment().format('HH:mm:ss'),
    当前时间_年月日: moment().format('YYYY-MM-DD'),
    订单号: order_id,
    页码: page_number,
    商品描述: desc,
    订单备注: order_remark,
    分拣员账号: sorter_username,
    分拣员名字: sorter_name,
    单价销售单位: sale_unit_price,
    单价基本单位: std_sale_price,
    出库金额: out_stock_quantity * out_stock_price,
    下单金额: sale_unit_price * quantity,
    收货时间: `${moment(receive_begin_time).format(
      'YYYY-MM-DD HH:mm:ss',
    )}~${moment(receive_end_time).format('YYYY-MM-DD HH:mm:ss')}`,
    收货时间_年月日: `${moment(receive_begin_time).format(
      'YYYY-MM-DD',
    )}~${moment(receive_end_time).format('YYYY-MM-DD')}`,
    收货时间_时间: `${moment(receive_begin_time).format('HH:mm:ss')}~${moment(
      receive_end_time,
    ).format('HH:mm:ss')}`,
    产地: origin_area,
    原料说明: material_description,
    建议使用方法: suggest_usage,
    // 营养成分表: nutrition_information,
    贮存条件: storage_conditions,
    切配规格: cutting_specification,
    许可证: license,
    产品执行标准: product_standards,
    自提点: pick_up_station,
    保质期: shelf_life,
    营养成分表: nutritionInfo,
    计划开始时间: proc_plan_start_time,
    计划完成时间: proc_plan_finish_time,
    nutrition_status, // 是否开启营养素
  })

  return newData
}

export { toKey }
