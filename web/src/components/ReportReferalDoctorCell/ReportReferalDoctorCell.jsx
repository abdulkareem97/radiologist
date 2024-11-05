import ReportReferal from '../ReportReferal/ReportReferal'

export const QUERY = gql`
  query FindReportReferalDoctorQuery(
    $id: Int!
    $startDate: String!
    $endDate: String!
  ) {
    reportReferalDoctor: reportReferalDoctor(
      id: $id
      startDate: $startDate
      endDate: $endDate
    ) {
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

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ reportReferalDoctor, startDate, endDate }) => {
  return (
    <ReportReferal
      reportReferalDoctor={reportReferalDoctor}
      startDate={startDate}
      endDate={endDate}
    />
    // <div className=''>
    //   hello
    // </div>
  )
}
