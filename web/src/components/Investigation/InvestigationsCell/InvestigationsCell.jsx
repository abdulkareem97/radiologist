import { Link, routes } from '@redwoodjs/router'

import Investigations from 'src/components/Investigation/Investigations'

export const QUERY = gql`
  query FindInvestigations {
    investigations {
      id
      name
      perc
      amount
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
      {'No investigations yet. '}
      <Link to={routes.newInvestigation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ investigations }) => {
  return <Investigations investigations={investigations} />
}
