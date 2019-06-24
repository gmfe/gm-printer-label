import React from 'react'
import { observer } from 'mobx-react'
import editStore from './store'
import { Separator, Fonter, Position, TextAlign, Textarea, Line, Size, Gap, Title, TipInfo } from './component'
import i18next from '../../locales'

@observer
class EditModifyFiled extends React.Component {
  handleChangeBlock = (who, value) => {
    if (editStore.selected === null) {
      return
    }

    editStore.setConfigBlockBy(who, value)
  }

  renderBlocks () {
    const { type, text, style } = editStore.config.blocks[editStore.selected]

    return (
      <React.Fragment>
        <Title title={i18next.t('编辑字段')}/>
        <Gap/>
        <Position style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
        <Gap/>

        {(!type || type === 'text') && (
          <div>
            <Fonter style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <Separator/>
            <TextAlign style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <Gap/>

            <Textarea
              value={text}
              placeholder='请输入填充内容'
              onChange={this.handleChangeBlock.bind(this, 'text')}
            />
          </div>
        )}
        {type === 'line' && (
          <Line style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
        )}
        {type === 'qrcode' && (
          <div>
            <Size style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
          </div>
        )}
        {type === 'barcode' && (
          <div>
            <Size style={style} withoutWidth onChange={this.handleChangeBlock.bind(this, 'style')}/>
          </div>
        )}

        <TipInfo text={i18next.t('说明：请勿修改{}中的内容,避免出现数据异常')}/>
      </React.Fragment>
    )
  }

  render () {
    let content = null

    if (editStore.selected !== null) {
      content = this.renderBlocks()
    }

    return <div>{content}</div>
  }
}

EditModifyFiled.propTypes = {}

EditModifyFiled.deaultProps = {}

export default EditModifyFiled
