import Record from 'src/components/Record/Record'

export const QUERY = gql`
  query FindRecordById($id: Int!) {
    record: record(id: $id) {
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

export const Empty = () => <div>Record not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ record }) => {
  return <Record record={record} />
}
