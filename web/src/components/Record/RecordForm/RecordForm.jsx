import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const RecordForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.record?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="info"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Info
        </Label>

        <TextAreaField
          name="info"
          defaultValue={JSON.stringify(props.record?.info)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="info" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.record?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.record?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" />

        <Label
          name="patientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Patient id
        </Label>

        <NumberField
          name="patientId"
          defaultValue={props.record?.patientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="patientId" className="rw-field-error" />

        <Label
          name="referDoctorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Refer doctor id
        </Label>

        <NumberField
          name="referDoctorId"
          defaultValue={props.record?.referDoctorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="referDoctorId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RecordForm
