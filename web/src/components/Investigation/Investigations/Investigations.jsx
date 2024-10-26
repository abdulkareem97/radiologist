import { useEffect, useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Investigation/InvestigationsCell'
import SearchTable from 'src/components/SearchTable/SearchTable'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_INVESTIGATION_MUTATION = gql`
  mutation DeleteInvestigationMutation($id: Int!) {
    deleteInvestigation(id: $id) {
      id
    }
  }
`

const InvestigationsList = ({ investigations }) => {
  const [search_data, setSearch_data] = useState(investigations)
  useEffect(() => {
    setSearch_data(investigations)
  }, [investigations])
  const [rows_count, setRows_count] = useState(
    investigations.length <= 5 ? 5 : 10
  )
  const [deleteInvestigation] = useMutation(DELETE_INVESTIGATION_MUTATION, {
    onCompleted: () => {
      toast.success('Investigation deleted')
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
    if (confirm('Are you sure you want to delete investigation ' + id + '?')) {
      deleteInvestigation({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = investigations.filter((val) => {
      return val.name
        .toString()
        .toLowerCase()
        .includes(search_val.toLowerCase())
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
          to={routes.investigation({ id: original.id })}
          title={'Show investigation ' + original.id + ' detail'}
          className="rw-button rw-button-small"
        >
          {original.name}
        </Link>
      ),
    },

    {
      headerClassName: 'text-left',
      Header: 'Percentage',
      accessor: 'perc',
    },
    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          {/* <Link
            to={routes.investigation({ id: original.id })}
            title={'Show investigation ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link> */}
          <Link
            to={routes.editInvestigation({ id: original.id })}
            title={'Edit investigation ' + original.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            title={'Delete investigation ' + original.id}
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
          placeholder={'Search By Typing Investigation Type'}
          columns={columns}
          rows_count={rows_count}
          search_data={search_data}
        />
      }
    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Name</th>
    //         <th>Perc</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>Extra</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {investigations.map((investigation) => (
    //         <tr key={investigation.id}>
    //           <td>{truncate(investigation.id)}</td>
    //           <td>{truncate(investigation.name)}</td>
    //           <td>{truncate(investigation.perc)}</td>
    //           <td>{timeTag(investigation.created_at)}</td>
    //           <td>{timeTag(investigation.updated_at)}</td>
    //           <td>{jsonTruncate(investigation.extra)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.investigation({ id: investigation.id })}
    //                 title={'Show investigation ' + investigation.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editInvestigation({ id: investigation.id })}
    //                 title={'Edit investigation ' + investigation.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete investigation ' + investigation.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(investigation.id)}
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

export default InvestigationsList
