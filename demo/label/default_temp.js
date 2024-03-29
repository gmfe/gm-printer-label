export default {
  'default': {
    'page': {
      'type': '70X50'
    },
    'blocks': [
      {
        'text': '打印:{{当前时间_年月日}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '2px',
          'fontSize': '10px'
        }
      },
      {
        'type': 'qrcode',
        'qrcode': '{{溯源码}}',
        'style': {
          'position': 'absolute',
          'left': '196px',
          'top': '113px',
          'width': '70px',
          'height': '70px',
          'right': ''
        }
      },
      {
        'type': 'order_qrcode',
        'order_qrcode': '{{订单溯源码}}',
        'style': {
          'position': 'absolute',
          'left': '196px',
          'top': '113px',
          'width': '70px',
          'height': '70px',
          'right': ''
        }
      },
      {
        'type': 'merchandise_trace_qrcode',
        'merchandise_trace_qrcode': '{{商品溯源二维码}}',
        'style': {
          'position': 'absolute',
          'left': '196px',
          'top': '113px',
          'width': '70px',
          'height': '70px',
          'right': ''
        }
      },
      {
        'text': '商户:{{商户名}}({{商户ID}})',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '18px',
          'fontSize': '12px'
        }
      },
      {
        'text': '客服:{{客服电话}}',
        'style': {
          'position': 'absolute',
          'top': '2px',
          'right': '6px',
          'fontSize': '10px'
        }
      },
      {
        'text': '司机:{{司机}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '34px',
          'fontSize': '12px'
        }
      },
      {
        'text': '{{SKU}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '71px',
          'fontWeight': 'bold',
          'fontSize': '18px'
        }
      },
      {
        'type': 'line',
        'style': {
          'position': 'absolute',
          'left': '0px',
          'top': '16px',
          'borderTopColor': 'black',
          'borderTopWidth': '1px',
          'borderTopStyle': 'solid',
          'width': '100%'
        }
      },
      {
        'type': 'line',
        'style': {
          'position': 'absolute',
          'left': '0px',
          'top': '69px',
          'borderTopColor': 'black',
          'borderTopWidth': '1px',
          'borderTopStyle': 'solid',
          'width': '100%'
        }
      },
      {
        'text': '下单:{{下单}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '113px',
          'fontSize': '14px',
          'fontWeight': '',
          'right': '78px'
        }
      },
      {
        'text': '实称:{{实称}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '130px',
          'right': '78px'
        }
      },
      {
        'text': '备注:{{备注}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '148px',
          'right': '78px',
          'fontSize': '14px'
        }
      },
      {
        'text': '分拣号:{{分拣号}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '49px',
          'fontWeight': 'bold',
          'fontSize': '18px'
        }
      }
    ]
  },
  'default_without_food_security_code': {
    'page': {
      'type': '70X50'
    },
    'blocks': [
      {
        'text': '打印:{{当前时间_年月日}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '2px',
          'fontSize': '10px'
        }
      },
      {
        'text': '商户:{{商户名}}({{商户ID}})',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '18px',
          'fontSize': '12px'
        }
      },
      {
        'text': '客服:{{客服电话}}',
        'style': {
          'position': 'absolute',
          'top': '2px',
          'right': '6px',
          'fontSize': '10px'
        }
      },
      {
        'text': '司机:{{司机}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '34px',
          'fontSize': '12px'
        }
      },
      {
        'text': '{{SKU}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '71px',
          'fontWeight': 'bold',
          'fontSize': '18px'
        }
      },
      {
        'type': 'line',
        'style': {
          'position': 'absolute',
          'left': '0px',
          'top': '16px',
          'borderTopColor': 'black',
          'borderTopWidth': '1px',
          'borderTopStyle': 'solid',
          'width': '100%'
        }
      },
      {
        'type': 'line',
        'style': {
          'position': 'absolute',
          'left': '0px',
          'top': '69px',
          'borderTopColor': 'black',
          'borderTopWidth': '1px',
          'borderTopStyle': 'solid',
          'width': '100%'
        }
      },
      {
        'text': '下单:{{下单}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '113px',
          'fontSize': '14px',
          'fontWeight': '',
          'right': ''
        }
      },
      {
        'text': '实称:{{实称}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '130px',
          'right': ''
        }
      },
      {
        'text': '备注:{{备注}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '148px',
          'right': '',
          'fontSize': '14px'
        }
      },
      {
        'text': '分拣号:{{分拣号}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '49px',
          'fontWeight': 'bold',
          'fontSize': '18px'
        }
      }
    ]
  },
  'default_with_package_id': {
    'page': {
      'type': '70X50'
    },
    'blocks': [
      {
        'text': '打印:{{当前时间_年月日}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '2px',
          'fontSize': '10px'
        }
      },
      {
        'type': 'qrcode',
        'qrcode': '{{溯源码}}',
        'style': {
          'position': 'absolute',
          'left': '204px',
          'top': '129px',
          'width': '55px',
          'height': '55px',
          'right': ''
        }
      },
      {
        'text': '商户:{{商户名}}({{商户ID}})',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '18px',
          'fontSize': '12px'
        }
      },
      {
        'text': '客服:{{客服电话}}',
        'style': {
          'position': 'absolute',
          'top': '2px',
          'right': '6px',
          'fontSize': '10px'
        }
      },
      {
        'text': '司机:{{司机}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '34px',
          'fontSize': '12px'
        }
      },
      {
        'text': '{{SKU}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '71px',
          'fontWeight': 'bold',
          'fontSize': '18px'
        }
      },
      {
        'type': 'line',
        'style': {
          'position': 'absolute',
          'left': '0px',
          'top': '16px',
          'borderTopColor': 'black',
          'borderTopWidth': '1px',
          'borderTopStyle': 'solid',
          'width': '100%'
        }
      },
      {
        'type': 'line',
        'style': {
          'position': 'absolute',
          'left': '0px',
          'top': '69px',
          'borderTopColor': 'black',
          'borderTopWidth': '1px',
          'borderTopStyle': 'solid',
          'width': '100%'
        }
      },
      {
        'text': '下单:{{下单}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '110px',
          'fontSize': '14px',
          'fontWeight': '',
          'right': '78px'
        }
      },
      {
        'text': '实称:{{实称}}',
        'style': {
          'position': 'absolute',
          'left': '3px',
          'top': '125px',
          'right': '78px'
        }
      },
      {
        'text': '备注:{{备注}}',
        'style': {
          'position': 'absolute',
          'left': '4px',
          'top': '168px',
          'right': '78px',
          'fontSize': '14px'
        }
      },
      {
        'text': '分拣号:{{分拣号}}',
        'style': {
          'position': 'absolute',
          'left': '2px',
          'top': '49px',
          'fontWeight': 'bold',
          'fontSize': '18px'
        }
      },
      {
        'type': 'barcode',
        'barcode': '{{商品码}}',
        'style': {
          'position': 'absolute',
          'left': '4px',
          'top': '143px',
          'width': '120px',
          'height': '25px'
        }
      }
    ]
  }
}
