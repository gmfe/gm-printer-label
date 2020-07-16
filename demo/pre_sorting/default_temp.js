export default {
  'default': {
    'name': '默认模板',
    'page': {
      'type': '70X50',
      'customizeWidth': 100,
      'customizeHeight': 100,
    },
    'blocks': [
      {
        'type': 'barcode',
        'barcode': '{{商品码}}',
        'style': {
          'position': 'absolute',
          'left': '47px',
          'top': '5px',
          'height': '50px',
          'width': '165px',
        },
      },
      {
        'type': 'line',
        'style': {
          'position': 'absolute',
          'left': '0px',
          'top': '73px',
          'borderTopColor': 'black',
          'borderTopWidth': '1px',
          'borderTopStyle': 'solid',
          'width': '100%',
        },
      },
      {
        'text': '{{SKU}}',
        'fieldKey': '商品名',
        'style': {
          'position': 'absolute',
          'left': '9px',
          'top': '87px',
          'fontSize': '16px',
        },
      },
      {
        'text': '({{规格}})',
        'fieldKey': '规格',
        'style': {
          'position': 'absolute',
          'left': '74px',
          'top': '87px',
          'fontSize': '16px',
        },
      },
      {
        'text': '{{实称数_基本单位}}',
        'fieldKey': '实称数(基本单位)',
        'style': {
          'position': 'absolute',
          'left': '9px',
          'top': '111px',
          'fontWeight': 'bold',
          'fontSize': '16px',
        },
      },
    ],
  },
}
