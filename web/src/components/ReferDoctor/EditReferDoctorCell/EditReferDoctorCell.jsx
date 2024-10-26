import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReferDoctorForm from 'src/components/ReferDoctor/ReferDoctorForm'

export const QUERY = gql`
  query EditReferDoctorById($id: Int!) {
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
const UPDATE_REFER_DOCTOR_MUTATION = gql`
  mutation UpdateReferDoctorMutation(
    $id: Int!
    $input: UpdateReferDoctorInput!
  ) {
    updateReferDoctor(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ referDoctor }) => {
  const [updateReferDoctor, { loading, error }] = useMutation(
    UPDATE_REFER_DOCTOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReferDoctor updated')
        navigate(routes.referDoctors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateReferDoctor({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ReferDoctor {referDoctor?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReferDoctorForm
          referDoctor={referDoctor}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
