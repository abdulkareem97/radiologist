import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvestigationForm from 'src/components/Investigation/InvestigationForm'

export const QUERY = gql`
  query EditInvestigationById($id: Int!) {
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
const UPDATE_INVESTIGATION_MUTATION = gql`
  mutation UpdateInvestigationMutation(
    $id: Int!
    $input: UpdateInvestigationInput!
  ) {
    updateInvestigation(id: $id, input: $input) {
      id
      name
      perc
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

export const Success = ({ investigation }) => {
  const [updateInvestigation, { loading, error }] = useMutation(
    UPDATE_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Investigation updated')
        navigate(routes.investigations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateInvestigation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Investigation {investigation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InvestigationForm
          investigation={investigation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
