import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { borderStyleList } from '../config'
import ReactDOM from 'react-dom'
import Clipboard from 'clipboard'
import { Flex, Tip } from '../../components'
import i18next from '../../../locales'
import { Request } from 'gm-util'

class IconAlign extends React.Component {
  render () {
    const style = {
      display: 'block',
      background: 'black',
      width: '100%',
      height: '1px',
      marginBottom: '1px'
    }

    return (
      <span style={{
        display: 'inline-flex',
        width: '1em',
        verticalAlign: 'middle',
        flexDirection: 'column',
        alignItems: ({left: 'flex-start', center: 'center', right: 'flex-end'})[this.props.textAlign]
      }}>
        <span style={{...style}}/>
        <span style={{...style, width: '60%'}}/>
        <span style={{...style}}/>
        <span style={{...style, width: '60%'}}/>
        <span style={{...style}}/>
      </span>
    )
  }
}

IconAlign.propTypes = {
  textAlign: PropTypes.string
}

IconAlign.defaultProps = {
  textAlign: 'left'
}

class Separator extends React.Component {
  render () {
    return (
      <span style={{
        display: 'inline-block',
        margin: '0 5px',
        borderLeft: '1px solid #c1c8cc',
        height: '1em',
        verticalAlign: 'middle'
      }}/>
    )
  }
}

class Text extends React.Component {
  handleChange = (e) => {
    const {onChange} = this.props
    onChange(e.target.value)
  }

  render () {
    const {value, placeholder, style} = this.props
    return (
      <input
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        style={style}
      />
    )
  }
}

Text.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

class Textarea extends React.Component {
  handleChange = (e) => {
    const {onChange} = this.props
    onChange(e.target.value)
  }

  render () {
    const {value, placeholder, style} = this.props
    return (
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        style={{
          width: '100%',
          ...style
        }}
      />
    )
  }
}

Textarea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

// 10px => 10  10% => 10%
class TextPX extends React.Component {
  handleChange = (value) => {
    const {onChange} = this.props
    if (value === '') {
      onChange('')
    } else if (value.endsWith('%')) {
      onChange(value)
    } else {
      onChange(value + 'px')
    }
  }

  render () {
    const {value = ''} = this.props

    let nValue = value
    if (value.endsWith('px')) {
      nValue = value.replace(/px/g, '')
    }

    return (
      <Text value={nValue} onChange={this.handleChange} style={{width: '35px'}}/>
    )
  }
}

TextPX.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

class Fonter extends React.Component {
  handleChange = (type, value) => {
    const {style, onChange} = this.props

    onChange({
      ...style,
      [type]: value
    })
  }

  render () {
    const {style} = this.props

    return (
      <span className='gm-printer-label-edit-fonter'>
        <TextPX value={style.fontSize} onChange={this.handleChange.bind(this, 'fontSize')}/>
        <Separator/>
        <span
          className={classNames('gm-printer-label-editor_compoents-btn', {
            active: style.fontWeight === 'bold'
          })}
          style={{fontWeight: 'bold'}}
          onClick={() => this.handleChange('fontWeight', style.fontWeight === 'bold' ? '' : 'bold')}
        >
          B
        </span>
        <span
          className={classNames('gm-printer-label-editor_compoents-btn', {active: style.fontStyle === 'italic'})}
          style={{fontStyle: 'italic'}}
          onClick={() => this.handleChange('fontStyle', style.fontStyle === 'italic' ? '' : 'italic')}
        >
          I
        </span>
        <span
          className={classNames('gm-printer-label-editor_compoents-btn', {active: style.textDecoration === 'underline'})}
          style={{textDecoration: 'underline'}}
          onClick={() => this.handleChange('textDecoration', style.textDecoration === 'underline' ? '' : 'underline')}
        >
          U
        </span>
      </span>
    )
  }
}

Fonter.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

class TextAlign extends React.Component {
  handleChange = (textAlign) => {
    const {style, onChange} = this.props
    onChange({
      ...style,
      textAlign
    })
  }

  render () {
    const {style: {textAlign}} = this.props

    // TODO icon
    return (
      <span className='gm-printer-label-edit-text-align'>
        <span
          className={classNames('gm-printer-label-editor_compoents-btn', {
            active: textAlign === 'left'
          })}
          onClick={() => this.handleChange('left')}
        ><IconAlign textAlign='left'/></span>
        <span
          className={classNames('gm-printer-label-editor_compoents-btn', {
            active: textAlign === 'center'
          })}
          onClick={() => this.handleChange('center')}
        ><IconAlign textAlign='center'/></span>
        <span
          className={classNames('gm-printer-label-editor_compoents-btn', {
            active: textAlign === 'right'
          })}
          onClick={() => this.handleChange('right')}
        ><IconAlign textAlign='right'/></span>
      </span>
    )
  }
}

TextAlign.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

class Position extends React.Component {
  handleChange = (type, value) => {
    const {style, onChange} = this.props

    onChange({
      ...style,
      [type]: value
    })
  }

  render () {
    const {style: {top, right, bottom, left}} = this.props

    return (
      <span>
        {i18next.t('上')} <TextPX value={top} onChange={this.handleChange.bind(this, 'top')}/>
        &nbsp;
        {i18next.t('左')} <TextPX value={left} onChange={this.handleChange.bind(this, 'left')}/>
        &nbsp;
        {i18next.t('下')} <TextPX value={bottom} onChange={this.handleChange.bind(this, 'bottom')}/>
        &nbsp;
        {i18next.t('右')} <TextPX value={right} onChange={this.handleChange.bind(this, 'right')}/>
      </span>
    )
  }
}

Position.propTypes = {
  style: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

class Line extends React.Component {
  handleChange = (type, value) => {
    const {style, onChange} = this.props

    onChange({
      ...style,
      [type]: value
    })
  }

  render () {
    const {style: {borderTopWidth, borderTopStyle, width}} = this.props

    return (
      <span>
        {i18next.t('宽')} <TextPX value={width} onChange={this.handleChange.bind(this, 'width')} style={{width: '35px'}}/>
        &nbsp;
        {i18next.t('粗细')} <TextPX value={borderTopWidth} onChange={this.handleChange.bind(this, 'borderTopWidth')}/>
        &nbsp;
        <select value={borderTopStyle} onChange={e => this.handleChange('borderTopStyle', e.target.value)}>
          {_.map(borderStyleList, v => <option key={v.value} value={v.value}>{v.text}</option>)}</select>
      </span>
    )
  }
}

Line.propTypes = {
  style: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

class Size extends React.Component {
  handleChange = (type, value) => {
    const {onChange, style} = this.props

    onChange({
      ...style,
      [type]: value
    })
  }

  render () {
    const {style, withoutWidth} = this.props
    return (
      <React.Fragment>
        {i18next.t('高')} <TextPX value={style.height} onChange={this.handleChange.bind(this, 'height')}/>
        &nbsp;
        {withoutWidth ? null
          : <React.Fragment>{i18next.t('宽')}{<TextPX value={style.width} onChange={this.handleChange.bind(this, 'width')}/>}</React.Fragment>
        }
      </React.Fragment>
    )
  }
}

Size.propTypes = {
  style: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

class Copy extends React.Component {
  componentDidMount () {
    this.clipboard = new Clipboard(ReactDOM.findDOMNode(this), {
      text: () => this.props.text
    })

    this.clipboard.on('success', () => {
    })

    this.clipboard.on('error', () => {
    })
  }

  componentWillUnmount () {
    this.clipboard.destroy()
  }

  render () {
    return this.props.children
  }
}

const Title = ({ title, text }) => <Flex alignCenter className='gm-printer-label-edit-title'>
  <span>{title}</span>
  <span className='gm-font-12'>{text}</span>
</Flex>

const Gap = ({ width = '100%', height = '3px' }) => <div style={{ width, height }}/>

const TipInfo = ({ text }) => <Flex alignCenter className='gm-padding-top-5 gm-text-red'>{text}</Flex>

const FieldBtn = ({ name, onClick }) => (
  <Flex alignCenter style={{ width: '50%', margin: '3px 0' }}>
    <span className='gm-printer-label-edit-plus-btn' onClick={onClick}>
      +
    </span>
    <span className='gm-padding-left-5'>{name}</span>
  </Flex>
)

const SubTitle = ({ text }) => (
  <div style={{ backgroundColor: '#eee', height: '1px', margin: '10px 0 13px 0', position: 'relative' }}>
    <span style={{
      position: 'absolute',
      top: '-8px',
      left: '20px',
      padding: '0 5px',
      backgroundColor: '#fff',
      color: '#848586'
    }}>{text}</span>
  </div>
)

class ImageUploader extends React.Component {
  constructor () {
    super()
    this.input = React.createRef()
  }

  handleUpload = event => {
    event.preventDefault()
    // 只上传单张图片
    const droppedFiles = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files
    const file = droppedFiles[0]

    if (file.size > 512 * 1024) {
      Tip.warning(i18next.t('图片大小不能超过500Kb'))
      return
    }
    if (this.props.uploadQiniuImage) {
      this.props.uploadQiniuImage(file).then((json) => {
        this.props.onSuccess(json.data.url)
      })
      return
    }
    const STATION_URL = {
      reqUrl: '/station/image/upload',
      imgUrl: 'http://img.guanmai.cn/station_pic'
    }

    const MANAGE_URL = {
      reqUrl: '/gm_account/image/upload',
      imgUrl: 'http://img.guanmai.cn/report_pic'
    }

    const { hostname } = window.location
    const isStation = /station/g.test(hostname)
    const url = isStation ? STATION_URL : MANAGE_URL

    Request(url.reqUrl)
      .data({
        image_file: file
      })
      .post()
      .then(json => {
        const imgURL = `${url.imgUrl}/${json.data.img_path_id}`
        this.props.onSuccess(imgURL)
      })
  }

  handleClick = () => {
    this.input.current.value = null
    this.input.current.click()
  }

  render () {
    return (
      <React.Fragment>
        <div onClick={this.handleClick} onDrop={this.handleUpload}>
          {this.props.text}
        </div>
        <input
          style={{ display: 'none' }}
          type='file'
          ref={this.input}
          accept='image/*'
          onChange={this.handleUpload}
        />
      </React.Fragment>
    )
  }
}

ImageUploader.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  uploadTengXunFile: PropTypes.func
}

export {
  Copy,
  Text,
  Textarea,
  TextPX,
  TextAlign,
  Separator,
  Fonter,
  Position,
  Line,
  Size,
  Title,
  Gap,
  TipInfo,
  FieldBtn,
  SubTitle,
  ImageUploader
}
