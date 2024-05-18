import FunctionHall from 'src/components/FunctionHall/FunctionHall'

export const QUERY = gql`
  query FindFunctionHallById($id: Int!) {
    functionHall: functionHall(id: $id) {
      id
      name
      address
      phone_no
      no_of_slot
      slot_price
      slot_names
      desc
      status
      imageUrl
      created_at
      updated_at
      extra
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>FunctionHall not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ functionHall }) => {
  return <FunctionHall functionHall={functionHall} />
}
