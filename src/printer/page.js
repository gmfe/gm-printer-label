import React from 'react'
import { observer } from 'mobx-react'
import { pageTypeMap } from '../common/config'

@observer
class Page extends React.Component {
  render () {
    const {config: {type}, children} = this.props

    return (
      <div className='gm-printer-label-page' style={{
        width: pageTypeMap[type].width,
        height: pageTypeMap[type].height
      }}>
        {children}
      </div>
    )
  }
}

export default Page
