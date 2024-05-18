import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FunctionHallForm from 'src/components/FunctionHall/FunctionHallForm'

const CREATE_FUNCTION_HALL_MUTATION = gql`
  mutation CreateFunctionHallMutation($input: CreateFunctionHallInput!) {
    createFunctionHall(input: $input) {
      id
    }
  }
`

const NewFunctionHall = () => {
  const [createFunctionHall, { loading, error }] = useMutation(
    CREATE_FUNCTION_HALL_MUTATION,
    {
      onCompleted: () => {
        toast.success('FunctionHall created')
        navigate(routes.functionHalls())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createFunctionHall({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New FunctionHall</h2>
      </header>
      <div className="rw-segment-main">
        <FunctionHallForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFunctionHall
