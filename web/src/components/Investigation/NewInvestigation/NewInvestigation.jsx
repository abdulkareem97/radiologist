import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvestigationForm from 'src/components/Investigation/InvestigationForm'

const CREATE_INVESTIGATION_MUTATION = gql`
  mutation CreateInvestigationMutation($input: CreateInvestigationInput!) {
    createInvestigation(input: $input) {
      id
    }
  }
`

const NewInvestigation = () => {
  const [createInvestigation, { loading, error }] = useMutation(
    CREATE_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Investigation created')
        navigate(routes.investigations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createInvestigation({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Investigation</h2>
      </header>
      <div className="rw-segment-main">
        <InvestigationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInvestigation
