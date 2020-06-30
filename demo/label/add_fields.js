import i18next from '../../locales'

const addFields = {
    [i18next.t('基础')]: [
        {key: i18next.t('商品名'), value: '{{SKU}}'},
        {key: i18next.t('商品ID'), value: '{{SKU_ID}}'},
        {key: i18next.t('下单数(销售单位&基本单位)'), value: '{{下单}}'},
        {key: i18next.t('下单数(仅销售单位)'), value: '{{下单_销售单位}}'},
        {key: i18next.t('实称数(基本单位)'), value: '{{实称}}'},
        {key: i18next.t('实称数(销售单位)'), value: '{{实称数_销售单位}}'},
        {key: i18next.t('商品描述'), value: '{{商品描述}}'},
        {key: i18next.t('商品备注'), value: '{{备注}}'},
        {key: i18next.t('商品溯源码'), value: '{{溯源码}}'},
        {key: i18next.t('订单溯源码'), value: '{{订单溯源码}}'},
        {key: i18next.t('商品验货码'), value: '{{商品码}}'},
        {key: i18next.t('自定义编码'), value: '{{自定义编码}}'},
        {key: i18next.t('订单备注'), value: '{{订单备注}}'},
        {key: i18next.t('站点名'), value: '{{站点名}}'},
        {key: i18next.t('客服电话'), value: '{{客服电话}}'},
        {key: i18next.t('分拣号'), value: '{{分拣号}}'},
        {key: i18next.t('分拣员账号'), value: '{{分拣员账号}}'},
        {key: i18next.t('分拣员名字'), value: '{{分拣员名字}}'},
        {key: i18next.t('打印时间'), value: '{{当前时间_年月日}}'},
        {key: i18next.t('订单号'), value: '{{订单号}}'},
        {key: i18next.t('销售经理'), value: '{{销售经理}}'},
    ],
    [i18next.t('价格')]: [
        {key: i18next.t('单价(销售单位)'), value: '{{单价销售单位}}'},
        {key: i18next.t('单价(基本单位)'), value: '{{单价基本单位}}'},
        {key: i18next.t('出库金额'), value: '{{出库金额}}'},
        {key: i18next.t('下单金额'), value: '{{下单金额}}'},
    ],
    [i18next.t('配送')]: [
        {key: i18next.t('商户名'), value: '{{商户名}}'},
        {key: i18next.t('商户ID'), value: '{{商户ID}}'},
        {key: i18next.t('商户自定义编码'), value: '{{商户自定义编码}}'},
        {key: i18next.t('线路'), value: '{{线路}}'},
        {key: i18next.t('司机'), value: '{{司机}}'},
        {key: i18next.t('收货人'), value: '{{收货人}}'},
        {key: i18next.t('收货时间'), value: '{{收货时间_年月日}}'},
        {key: i18next.t('自提点'), value: '{{自提点}}'},
        {key: i18next.t('收货电话'), value: '{{收货电话}}'},
        {key: i18next.t('收货地址'), value: '{{收货地址}}'},
        {key: i18next.t('社区店名称'), value: '{{社区店名称}}'},
        {key: i18next.t('团长姓名'), value: '{{团长姓名}}'},
        {key: i18next.t('团长账户'), value: '{{团长账户}}'},
        {key: i18next.t('团长地址'), value: '{{团长地址}}'},
        {key: i18next.t('团长电话'), value: '{{团长电话}}'},
    ],
    [i18next.t('其他')]: [{key: i18next.t('页码'), value: '{{页码}}'}],
}

export default addFields

