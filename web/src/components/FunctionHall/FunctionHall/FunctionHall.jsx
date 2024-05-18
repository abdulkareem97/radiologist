import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_FUNCTION_HALL_MUTATION = gql`
  mutation DeleteFunctionHallMutation($id: Int!) {
    deleteFunctionHall(id: $id) {
      id
    }
  }
`

const FunctionHall = ({ functionHall }) => {
  const [deleteFunctionHall] = useMutation(DELETE_FUNCTION_HALL_MUTATION, {
    onCompleted: () => {
      toast.success('FunctionHall deleted')
      navigate(routes.functionHalls())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete functionHall ' + id + '?')) {
      deleteFunctionHall({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            FunctionHall {functionHall.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{functionHall.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{functionHall.name}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{functionHall.address}</td>
            </tr>
            <tr>
              <th>Phone no</th>
              <td>{functionHall.phone_no}</td>
            </tr>
            <tr>
              <th>No of slot</th>
              <td>{functionHall.no_of_slot}</td>
            </tr>
            <tr>
              <th>Slot price</th>
              <td>{functionHall.slot_price}</td>
            </tr>
            <tr>
              <th>Slot names</th>
              <td>{jsonDisplay(functionHall.slot_names)}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{functionHall.desc}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{functionHall.status}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{jsonDisplay(functionHall.imageUrl)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(functionHall.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(functionHall.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(functionHall.extra)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{functionHall.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFunctionHall({ id: functionHall.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(functionHall.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default FunctionHall
