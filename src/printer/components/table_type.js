import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Table = (props) => {
  const { data, style } = props

  return (
    <div style={style} data-name={props['data-name']}>
      <div style={{textAlign: 'center'}}>{data.title}</div>
      <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
        <thead style={{border: '1px solid black'}}>
          <tr>
            {_.map(data.tHeadInfo, (th) => {
              return (
                <th data-name={props['data-name']} key={th}>
                  {th}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {_.map(data.tBodyInfo, (tr) => {
            return (
              <tr key={tr}>
                {_.map(tr, (td) => (
                  <td data-name={props['data-name']} key={td}>
                    {td}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  // data:[tHeadInfo: [th, th,...], tBodyInfo: [[td, td,..],[],...]
  data: PropTypes.object.isRequired
}

export default Table
