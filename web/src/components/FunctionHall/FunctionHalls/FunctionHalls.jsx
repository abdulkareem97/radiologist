import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/FunctionHall/FunctionHallsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_FUNCTION_HALL_MUTATION = gql`
  mutation DeleteFunctionHallMutation($id: Int!) {
    deleteFunctionHall(id: $id) {
      id
    }
  }
`

const FunctionHallsList = ({ functionHalls }) => {
  const [deleteFunctionHall] = useMutation(DELETE_FUNCTION_HALL_MUTATION, {
    onCompleted: () => {
      toast.success('FunctionHall deleted')
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
    if (confirm('Are you sure you want to delete functionHall ' + id + '?')) {
      deleteFunctionHall({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone no</th>
            <th>No of slot</th>
            <th>Slot price</th>
            <th>Slot names</th>
            <th>Desc</th>
            <th>Status</th>
            <th>Image url</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {functionHalls.map((functionHall) => (
            <tr key={functionHall.id}>
              <td>{truncate(functionHall.id)}</td>
              <td>{truncate(functionHall.name)}</td>
              <td>{truncate(functionHall.address)}</td>
              <td>{truncate(functionHall.phone_no)}</td>
              <td>{truncate(functionHall.no_of_slot)}</td>
              <td>{truncate(functionHall.slot_price)}</td>
              <td>{jsonTruncate(functionHall.slot_names)}</td>
              <td>{truncate(functionHall.desc)}</td>
              <td>{truncate(functionHall.status)}</td>
              <td>{jsonTruncate(functionHall.imageUrl)}</td>
              <td>{timeTag(functionHall.created_at)}</td>
              <td>{timeTag(functionHall.updated_at)}</td>
              <td>{jsonTruncate(functionHall.extra)}</td>
              <td>{truncate(functionHall.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.functionHall({ id: functionHall.id })}
                    title={'Show functionHall ' + functionHall.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFunctionHall({ id: functionHall.id })}
                    title={'Edit functionHall ' + functionHall.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete functionHall ' + functionHall.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(functionHall.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FunctionHallsList
