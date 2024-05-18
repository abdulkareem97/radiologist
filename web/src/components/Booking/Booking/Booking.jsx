import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

const Booking = ({ booking }) => {
  const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking deleted')
      navigate(routes.bookings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete booking ' + id + '?')) {
      deleteBooking({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Booking {booking.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{booking.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{booking.name}</td>
            </tr>
            <tr>
              <th>Phone no</th>
              <td>{booking.phone_no}</td>
            </tr>
            <tr>
              <th>Slots</th>
              <td>{jsonDisplay(booking.slots)}</td>
            </tr>
            <tr>
              <th>Prize</th>
              <td>{jsonDisplay(booking.prize)}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(booking.date)}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{booking.desc}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{booking.status}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(booking.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(booking.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(booking.extra)}</td>
            </tr>
            <tr>
              <th>Function hall id</th>
              <td>{booking.functionHallId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBooking({ id: booking.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(booking.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Booking
