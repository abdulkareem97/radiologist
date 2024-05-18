import { Link, routes } from '@redwoodjs/router'

import FunctionHalls from 'src/components/FunctionHall/FunctionHalls'

export const QUERY = gql`
  query FindFunctionHalls {
    functionHalls {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No functionHalls yet. '}
      <Link to={routes.newFunctionHall()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ functionHalls }) => {
  return <FunctionHalls functionHalls={functionHalls} />
}
