import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from 'src/auth'

const CategoryForm = (props) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const onSubmit = (data) => {
    data['emp'] = currentUser.email
    props.onSave(data, props?.category?.id)
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
          name="category_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category name
        </Label>

        <TextField
          name="category_name"
          defaultValue={props.category?.category_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="category_name" className="rw-field-error" />

        {/* <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.category?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" /> */}

        {/* <Label
          name="emp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Emp
        </Label>

        <TextField
          name="emp"
          defaultValue={props.category?.emp}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emp" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CategoryForm
