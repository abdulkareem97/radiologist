import Investigation from 'src/components/Investigation/Investigation'

export const QUERY = gql`
  query FindInvestigationById($id: Int!) {
    investigation: investigation(id: $id) {
      id
      name
      amount
      perc
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Investigation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ investigation }) => {
  return <Investigation investigation={investigation} />
}
