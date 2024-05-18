import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FunctionHallForm from 'src/components/FunctionHall/FunctionHallForm'

export const QUERY = gql`
  query EditFunctionHallById($id: Int!) {
    functionHall: functionHall(id: $id) {
      id
      name
      address
      phone_no
      no_of_slot
      slot_price
      slot_names
      desc
      status
      imageUrl
      created_at
      updated_at
      extra
      userId
    }
  }
`
const UPDATE_FUNCTION_HALL_MUTATION = gql`
  mutation UpdateFunctionHallMutation(
    $id: Int!
    $input: UpdateFunctionHallInput!
  ) {
    updateFunctionHall(id: $id, input: $input) {
      id
      name
      address
      phone_no
      no_of_slot
      slot_price
      slot_names
      desc
      status
      imageUrl
      created_at
      updated_at
      extra
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ functionHall }) => {
  const [updateFunctionHall, { loading, error }] = useMutation(
    UPDATE_FUNCTION_HALL_MUTATION,
    {
      onCompleted: () => {
        toast.success('FunctionHall updated')
        navigate(routes.functionHalls())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateFunctionHall({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit FunctionHall {functionHall?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FunctionHallForm
          functionHall={functionHall}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
