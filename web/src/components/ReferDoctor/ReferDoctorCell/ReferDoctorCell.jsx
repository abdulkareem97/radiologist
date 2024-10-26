import ReferDoctor from 'src/components/ReferDoctor/ReferDoctor'

export const QUERY = gql`
  query FindReferDoctorById($id: Int!) {
    referDoctor: referDoctor(id: $id) {
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

export const Empty = () => <div>ReferDoctor not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ referDoctor }) => {
  return <ReferDoctor referDoctor={referDoctor} />
}
