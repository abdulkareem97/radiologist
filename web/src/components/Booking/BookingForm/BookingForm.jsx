import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const BookingForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.booking?.id)
  }

  return (
    <div className="rw-form-wrapper">
      {/* heelo */}
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
          defaultValue={props.booking?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="phone_no"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone no
        </Label>

        <TextField
          name="phone_no"
          defaultValue={props.booking?.phone_no}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phone_no" className="rw-field-error" />

        <Label
          name="slots"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slots
        </Label>

        <TextAreaField
          name="slots"
          defaultValue={JSON.stringify(props.booking?.slots)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="slots" className="rw-field-error" />

        <Label
          name="prize"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Prize
        </Label>

        <TextAreaField
          name="prize"
          defaultValue={JSON.stringify(props.booking?.prize)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="prize" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.booking?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="desc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Desc
        </Label>

        <TextField
          name="desc"
          defaultValue={props.booking?.desc}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="desc" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.booking?.status}
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
          defaultValue={JSON.stringify(props.booking?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" />

        <Label
          name="functionHallId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Function hall id
        </Label>

        <NumberField
          name="functionHallId"
          defaultValue={props.booking?.functionHallId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="functionHallId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookingForm
