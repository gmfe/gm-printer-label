import React from 'react'
import { observer } from 'mobx-react'
import { pageTypeMap } from '../common/config'

@observer
class Page extends React.Component {
  render () {
    const {config: {type, customizeWidth, customizeHeight}, children} = this.props

    return (
      <div
        className='gm-printer-label-page'
        style={{
          width: type === '-1' ? customizeWidth + 'mm' : pageTypeMap[type].width,
          height: type === '-1' ? customizeHeight + 'mm' : pageTypeMap[type].height
        }}
      >
        {children}
      </div>
    )
  }
}

export default Page
