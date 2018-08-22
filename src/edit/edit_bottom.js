import React from 'react'
import { observer } from 'mobx-react/index'
import editStore from './store'
import { Separator, Fonter, Position, TextAlign, Textarea, Line, Size } from './component'

@observer
class EditBottom extends React.Component {
  handleChangeBlock = (who, value) => {
    if (editStore.selected === null) {
      return
    }

    editStore.setConfigBlockBy(who, value)
  }

  handleRemove = () => {
    editStore.removeConfig()
  }

  renderBlocks () {
    const {type, text, style, link} = editStore.config.blocks[editStore.selected]

    return (
      <React.Fragment>
        <div>
          <button onClick={this.handleRemove}>移除</button>
        </div>
        <hr/>
        <div>
          <Position style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
        </div>
        {(!type || type === 'text') && (
          <div>
            <Fonter style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <Separator/>
            <TextAlign style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <br/>
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
        {type === 'image' && (
          <div>
            <Size style={style} onChange={this.handleChangeBlock.bind(this, 'style')}/>
            <br/>
            <Textarea
              value={link}
              placeholder='请输入链接'
              onChange={this.handleChangeBlock.bind(this, 'link')}
            />
          </div>
        )}
      </React.Fragment>
    )
  }

  render () {
    let content = '单击选中内容编辑，或拖动内容以摆放位置'

    if (editStore.selected !== null) {
      content = this.renderBlocks()
    }

    return <div className='gm-printer-edit-header-bottom'>{content}</div>
  }
}

EditBottom.propTypes = {}

EditBottom.deaultProps = {}

export default EditBottom
