import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import { convertObjectValuesToUpper } from 'src/Utils/Utils'

const InvestigationForm = (props) => {
  const onSubmit = (data) => {
    data = convertObjectValuesToUpper(data)
    props.onSave(data, props?.investigation?.id)
  }

  return (
    <div className="mx-auto my-4 max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
        Investigation Form
      </h2>

      <Form onSubmit={onSubmit} error={props.error} className="space-y-4">
        <FormError
          error={props.error}
          wrapperClassName="p-4 mb-4 bg-red-100 text-red-700 rounded-lg"
          titleClassName="font-bold"
          listClassName="list-disc list-inside"
        />

        <div>
          <Label
            name="name"
            className="mb-1 block text-sm font-medium text-gray-700"
            errorClassName="text-red-500"
          >
            Investigation Name
          </Label>
          <TextField
            name="name"
            defaultValue={props.investigation?.name}
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            errorClassName="border-red-500"
            validation={{ required: true }}
          />
          <FieldError name="name" className="mt-1 text-sm text-red-500" />
        </div>

        <div>
          <Label
            name="amount"
            className="mb-1 block text-sm font-medium text-gray-700"
            errorClassName="text-red-500"
          >
            Amount
          </Label>
          <TextField
            name="amount"
            defaultValue={props.investigation?.amount}
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            errorClassName="border-red-500"
            validation={{ valueAsNumber: true, required: true }}
          />
          <FieldError name="amount" className="mt-1 text-sm text-red-500" />
        </div>
        <div>
          <Label
            name="perc"
            className="mb-1 block text-sm font-medium text-gray-700"
            errorClassName="text-red-500"
          >
            Percentage
          </Label>
          <TextField
            name="perc"
            defaultValue={props.investigation?.perc}
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            errorClassName="border-red-500"
            validation={{ valueAsNumber: true, required: true }}
          />
          <FieldError name="perc" className="mt-1 text-sm text-red-500" />
        </div>

        <div className="mt-6 text-center">
          <Submit
            disabled={props.loading}
            className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 disabled:opacity-50"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default InvestigationForm
