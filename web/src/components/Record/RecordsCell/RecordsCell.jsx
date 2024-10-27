import { Link, routes } from '@redwoodjs/router'

import Records from 'src/components/Record/Records'

export const QUERY = gql`
  query FindRecords($status: String!) {
    recordsByStatus(status: $status) {
      id
      info
      status
      created_at
      updated_at
      extra
      patientId
      patient {
        id
        name
        age
        phone_no
        gender
      }
      referDoctorId
      referDr {
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No records yet. '}
      <Link to={routes.newRecord()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ recordsByStatus, status }) => {
  return <Records records={recordsByStatus} status={status} />
}
