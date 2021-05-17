import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Fonter,
  Gap,
  Line,
  Position,
  Separator,
  Size,
  TextAlign,
  Textarea,
  TipInfo,
  Title
} from './component'
import i18next from '../../../locales'
import _ from 'lodash'

@inject('editStore')
@observer
class EditModifyFiled extends React.Component {
  handleChangeBlock = (who, value) => {
    const { editStore } = this.props
    if (editStore.selected === null) {
      return
    }
    editStore.setConfigBlockBy(who, value)
  }

  handleRotateBarcode = () => {
    const { editStore } = this.props

    const { style } = editStore.config.blocks[editStore.selected]
    const newStyle = _.has(style, 'transform')
      ? _.omit(style, 'transform')
      : {
        ...style,
        transform: 'rotate(90deg)'
      }
    this.handleChangeBlock('style', newStyle)
  }

  renderBlocks () {
    const { editStore } = this.props

    const { type, text, style } = editStore.config.blocks[editStore.selected]

    return (
      <React.Fragment>
        <Title title={i18next.t('编辑字段')}/>
        <Gap/>
        <Position style={style}
          onChange={this.handleChangeBlock.bind(this, 'style')}/>
        <Gap/>

        {(!type || type === 'text') && (
          <div>
            <Fonter style={style}
              onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <Separator/>
            <TextAlign style={style}
              onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <Gap/>

            <Textarea value={text} placeholder='请输入填充内容'
              onChange={this.handleChangeBlock.bind(this, 'text')}/>
          </div>
        )}
        {type === 'line' && <Line style={style}
          onChange={this.handleChangeBlock.bind(this,
            'style')}/>}
        {(type === 'qrcode' || type === 'order_qrcode' || type ===
          'package_id_qrcode' || type === 'image') && (
          <div>
            <Size style={style}
              onChange={this.handleChangeBlock.bind(this, 'style')}/>
          </div>
        )}
        {type === 'diyqrcode' && (
          <div>
            <Size style={style}
              onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <Textarea value={text} placeholder='请输入填充内容'
              onChange={this.handleChangeBlock.bind(this, 'text')}/>
          </div>
        )
        }
        {type === 'barcode' && (
          <div>
            <Size style={style} withoutWidth
              onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <div>
              <button onClick={this.handleRotateBarcode}>{i18next.t(
                '旋转')}</button>
            </div>
          </div>
        )}
        {type === 'in_stock_barcode' && (
          <div>
            <Size style={style} withoutWidth
              onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <div>
              <button onClick={this.handleRotateBarcode}>{i18next.t(
                '旋转')}</button>
            </div>
          </div>
        )}
        {type === 'diycode' && (
          <div>
            <Size style={style} withoutWidth
              onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <div>
              <button onClick={this.handleRotateBarcode}>{i18next.t(
                '旋转')}</button>
            </div>
          </div>
        )}
        <TipInfo text={i18next.t('说明：请勿修改{}中的内容,避免出现数据异常')}/>
        {editStore.computedIsTime && (
          <div>
            <TipInfo
              text={i18next.t('注：可通过修改“{{}}”中的内容更改时间格式。')}
            />
            <TipInfo
              text={i18next.t(
                '1. 格式“1970-01-01 19:00:00”，输入“时间： {{当前时间}}”；'
              )}
            />
            <TipInfo
              text={i18next.t(
                '2. 格式“1970-01-01”，输入“时间： {{当前时间_年月日}}”；'
              )}
            />
            <TipInfo
              text={i18next.t(
                '3. 格式“19:00:00"，输入“时间： {{当前时间_时间}}"；'
              )}
            />
          </div>
        )}
      </React.Fragment>
    )
  }

  render () {
    let content = null
    const { editStore } = this.props

    if (editStore.selected !== null) {
      content = this.renderBlocks()
    }

    return <div>{content}</div>
  }
}

export default EditModifyFiled
