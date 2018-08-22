import React from 'react'
import { observer } from 'mobx-react'
import printerStore from './store'

@observer
class Page extends React.Component {
  render () {
    const {children} = this.props
    const {paddingTop, paddingRight, paddingBottom, paddingLeft} = printerStore.gap

    return (
      <div className='gm-printer-page' style={{
        width: `calc(${printerStore.size.width} - ${paddingLeft} - ${paddingRight})`,
        height: `calc(${printerStore.size.height} - ${paddingTop} - ${paddingBottom})`,
        padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
      }}>
        <div className='gm-printer-page-inner' style={{
          width: `calc(${printerStore.size.width} - ${paddingLeft} - ${paddingRight})`,
          height: `calc(${printerStore.size.height} - ${paddingTop} - ${paddingBottom})`
        }}>
          {children}
        </div>
      </div>
    )
  }
}

export default Page
