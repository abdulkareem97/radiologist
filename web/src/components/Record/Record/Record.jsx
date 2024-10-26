import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecordMutation($id: Int!) {
    deleteRecord(id: $id) {
      id
    }
  }
`

const Record = ({ record }) => {
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION, {
    onCompleted: () => {
      toast.success('Record deleted')
      navigate(routes.records())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete record ' + id + '?')) {
      deleteRecord({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Record {record.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{record.id}</td>
            </tr>
            <tr>
              <th>Info</th>
              <td>{jsonDisplay(record.info)}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{record.status}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(record.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(record.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(record.extra)}</td>
            </tr>
            <tr>
              <th>Patient id</th>
              <td>{record.patientId}</td>
            </tr>
            <tr>
              <th>Refer doctor id</th>
              <td>{record.referDoctorId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRecord({ id: record.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(record.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Record
