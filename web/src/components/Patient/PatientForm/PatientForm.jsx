import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  RadioField, // Import RadioField
  Submit,
} from '@redwoodjs/forms'

import { convertObjectValuesToUpper } from 'src/Utils/Utils'

const PatientForm = (props) => {
  const onSubmit = (data) => {
    data = convertObjectValuesToUpper(data)
    props.onSave(data, props?.patient?.id)
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.patient?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="age"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Age
        </Label>
        <NumberField
          name="age"
          defaultValue={props.patient?.age}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="age" className="rw-field-error" />

        <Label
          name="phone_no"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone No
        </Label>
        <TextField
          name="phone_no"
          defaultValue={props.patient?.phone_no}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="phone_no" className="rw-field-error" />

        <Label className="rw-label">Gender</Label>
        <div className="flex items-center">
          <Label className="mr-4 inline-flex items-center">
            <RadioField
              name="gender"
              value="Male"
              defaultChecked={props.patient?.gender === 'MALE'}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Male</span>
          </Label>
          <Label className="inline-flex items-center">
            <RadioField
              name="gender"
              value="Female"
              defaultChecked={props.patient?.gender === 'FEMALE'}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Female</span>
          </Label>
        </div>
        <FieldError name="gender" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>
        <TextField
          name="address"
          defaultValue={props.patient?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="address" className="rw-field-error" />

        <div className="mt-4">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PatientForm
