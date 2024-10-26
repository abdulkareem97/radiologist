import { useEffect, useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ReferDoctor/ReferDoctorsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_REFER_DOCTOR_MUTATION = gql`
  mutation DeleteReferDoctorMutation($id: Int!) {
    deleteReferDoctor(id: $id) {
      id
    }
  }
`

const ReferDoctorsList = ({ referDoctors }) => {
  const [search_data, setSearch_data] = useState(referDoctors)
  useEffect(() => {
    setSearch_data(referDoctors)
  }, [referDoctors])
  const [rows_count, setRows_count] = useState(
    referDoctors.length <= 5 ? 5 : 10
  )
  const [deleteReferDoctor] = useMutation(DELETE_REFER_DOCTOR_MUTATION, {
    onCompleted: () => {
      toast.success('ReferDoctor deleted')
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
    if (confirm('Are you sure you want to delete referDoctor ' + id + '?')) {
      deleteReferDoctor({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = referDoctors.filter((val) => {
      return (
        val.name.toString().toLowerCase().includes(search_val.toLowerCase()) ||
        val.phoneno.toString().toLowerCase().includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length <= 5 ? 5 : 10)
    setSearch_data(filterData)
  }

  const columns = [
    {
      headerClassName: 'text-left',
      Header: 'SL. No',
      // accessor: 'id',
      Cell: ({ index }) => index + 1,
    },
    {
      headerClassName: 'text-left',
      Header: 'Name',
      accessor: 'name',
      Cell: ({ original }) => (
        <Link
          to={routes.referDoctor({ id: original.id })}
          title={'Show referDoctor ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          {original.name}
        </Link>
      ),
    },
    {
      headerClassName: 'text-left',
      Header: 'Phone no',
      accessor: 'phoneno',
    },
    {
      headerClassName: 'text-left',
      Header: 'Hospital Name',
      accessor: 'hname',
    },
    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          {/* <Link
            to={routes.referDoctor({ id: original.id })}
            title={'Show referDoctor ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link> */}
          <Link
            to={routes.editReferDoctor({ id: original.id })}
            title={'Edit referDoctor ' + original.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            title={'Delete referDoctor ' + original.id}
            className="rw-button rw-button-small rw-button-red"
            onClick={() => onDeleteClick(original.id)}
          >
            Delete
          </button>
        </nav>
      ),
    },
  ]

  return (
    <>
      {
        <SearchTable
          change={change}
          placeholder={'Search By Typing Doctor Name'}
          columns={columns}
          rows_count={rows_count}
          search_data={search_data}
        />
      }
    </>
  )
}

export default ReferDoctorsList
