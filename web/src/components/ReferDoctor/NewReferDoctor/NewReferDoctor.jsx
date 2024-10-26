import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReferDoctorForm from 'src/components/ReferDoctor/ReferDoctorForm'

const CREATE_REFER_DOCTOR_MUTATION = gql`
  mutation CreateReferDoctorMutation($input: CreateReferDoctorInput!) {
    createReferDoctor(input: $input) {
      id
    }
  }
`

const NewReferDoctor = () => {
  const [createReferDoctor, { loading, error }] = useMutation(
    CREATE_REFER_DOCTOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReferDoctor created')
        navigate(routes.referDoctors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createReferDoctor({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ReferDoctor</h2>
      </header>
      <div className="rw-segment-main">
        <ReferDoctorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewReferDoctor
