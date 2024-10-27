import { useEffect, useState } from 'react'

import {
  FaUser,
  FaPhone,
  FaDollarSign,
  FaCalendarAlt,
  FaRupeeSign,
} from 'react-icons/fa'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Record/RecordsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecordMutation($id: Int!) {
    deleteRecord(id: $id) {
      id
    }
  }
`

const RecordsList = ({ records, status }) => {
  const [search_data, setSearch_data] = useState(records)
  useEffect(() => {
    setSearch_data(records)
  }, [records])
  const [rows_count, setRows_count] = useState(records.length <= 5 ? 5 : 10)
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION, {
    onCompleted: () => {
      toast.success('Record deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete record ' + id + '?')) {
      deleteRecord({ variables: { id } })
    }
  }
  const change = (search) => {
    // console.log(search.target.value)
    const search_val = search.target.value

    let filterData = records.filter((val) => {
      return (
        val.patient.name
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase()) ||
        val.patient.phone_no
          .toString()
          .toLowerCase()
          .includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 10)
    setSearch_data(filterData)
  }

  return (
    <>
      <div className="flex justify-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          {status} Records
        </h2>
      </div>
      <div className=" col-span-6 mx-6  my-5 rounded-lg p-3 font-bold">
        <div className="flex ">
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-blue-800 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="focus:border-red-00 block w-full rounded-lg border border-blue-800 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={'Search By Typing Patient Name and Phone No'}
                onChange={change}
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div className="grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {search_data.map((record) => {
          const { name, age, phone_no } = record.patient
          const totalAmount = record.info?.amount || 0

          return (
            <Link
              to={routes.record({ id: record.id })}
              key={record.id}
              className="block rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <h3 className="mb-2 flex items-center text-lg font-semibold text-gray-800">
                <FaUser className="mr-2 text-blue-600" />
                {name + ' ( age : ' + age + ' )'}
              </h3>
              {/* <p className="text-sm text-gray-600">
                <span className="font-medium">Age:</span> {age}
              </p> */}
              <p className="flex items-center text-sm text-gray-600">
                <FaPhone className="mr-2 text-green-600" /> {phone_no}
              </p>
              <p className="mt-2 flex items-center font-semibold text-gray-800">
                <FaRupeeSign className="mr-2 text-yellow-500" />
                Total Amount: ₹{totalAmount}
              </p>
              <p className="mt-2 flex items-center text-xs text-gray-500">
                <FaCalendarAlt className="mr-2" />
                Updated At: {new Date(record.updated_at).toLocaleString()}
              </p>
            </Link>
          )
        })}
      </div>
    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Info</th>
    //         <th>Status</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Extra</th>
    //         <th>Patient id</th>
    //         <th>Refer doctor id</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {records.map((record) => (
    //         <tr key={record.id}>
    //           <td>{truncate(record.id)}</td>
    //           <td>{jsonTruncate(record.info)}</td>
    //           <td>{truncate(record.status)}</td>
    //           <td>{timeTag(record.created_at)}</td>
    //           <td>{timeTag(record.updated_at)}</td>
    //           <td>{jsonTruncate(record.extra)}</td>
    //           <td>{truncate(record.patientId)}</td>
    //           <td>{truncate(record.referDoctorId)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.record({ id: record.id })}
    //                 title={'Show record ' + record.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editRecord({ id: record.id })}
    //                 title={'Edit record ' + record.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete record ' + record.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(record.id)}
    //               >
    //                 Delete
    //               </button>
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default RecordsList
