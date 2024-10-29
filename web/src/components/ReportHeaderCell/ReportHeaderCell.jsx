import { useEffect, useState } from 'react'
import React from 'react'

import Select from 'react-select'

export const QUERY = gql`
  query FindReportHeaderQuery {
    referDoctors {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ referDoctors, changeId }) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    // Cleanup the timeout when the component unmounts

    // if (id == 1) {
    const obj = referDoctors.map((item) => {
      return { id: item.id, name: item.name, value: item.id, label: item.name }
    })
    setOptions(obj)
    // }

    // return () => setOptions([]);
  }, [])
  // const [data, setDatas] = useState(0)

  const modifyData = (name) => {
    if (name.length == 0) {
      changeId(0)
      return
    }
    changeId(name.id)
  }
  return (
    <>
      <div className="text-gray-950">
        <Select options={options} onChange={modifyData} isClearable={true} />
      </div>
    </>
  )
}
