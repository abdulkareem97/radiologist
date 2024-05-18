import Booking from 'src/components/Booking/Booking'

export const QUERY = gql`
  query FindBookingById($id: Int!) {
    booking: booking(id: $id) {
      id
      name
      phone_no
      slots
      prize
      date
      desc
      status
      created_at
      updated_at
      extra
      functionHallId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Booking not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ booking }) => {
  return <Booking booking={booking} />
}
