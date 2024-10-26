import { Link, routes } from '@redwoodjs/router'

import ReferDoctors from 'src/components/ReferDoctor/ReferDoctors'

export const QUERY = gql`
  query FindReferDoctors {
    referDoctors {
      id
      name
      phoneno
      hname
      haddress
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No referDoctors yet. '}
      <Link to={routes.newReferDoctor()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ referDoctors }) => {
  return <ReferDoctors referDoctors={referDoctors} />
}
