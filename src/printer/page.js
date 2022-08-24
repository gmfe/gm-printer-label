import React from 'react'
import { observer } from 'mobx-react'

@observer
class Page extends React.Component {
  render() {
    const {
      pageStyle: { width, height },
      children,
    } = this.props

    return (
      <div
        className='gm-printer-label-page'
        style={{
          width,
          height,
        }}
      >
        {children}
      </div>
    )
  }
}

export default Page
