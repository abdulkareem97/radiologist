import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useAuth } from 'src/auth'
import ImageSelector from 'src/components/ImageSelector';
import { storage } from "src/Utils/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from '@redwoodjs/web/dist/toast';

const CatalogueForm = (props) => {


  const [categoryArr, setCategoryArr] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [defaultCategory,setDefaultCategory] = useState({})
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()


  // select category logic
  useEffect(() => {
    let obj = props.categories.map((item) => {
      return {
        value: item.id, label: item.category_name
      }
    })
    setCategoryArr(obj)
    if(props.catalogue?.category){
      let obj2 = {
        value:props.catalogue?.category?.id,
        label:props.catalogue?.category?.category_name
      }
      setDefaultCategory(obj2)
      setCategoryId(props.catalogue?.category?.id)
      console.log(obj2)

    }

  }, [])


  const categoryChange = (item) => {
    setDefaultCategory(item)
    setCategoryId(item.value)
  }


  // image selector logic
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(props?.catalogue?.image_url || '')

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };




  const onSubmit = (data) => {
    data['categoryId'] = categoryId
    data['emp'] = currentUser.email
    // props.onSave(data, props?.catalogue?.id)
    if (file) {
      const storageRef = ref(storage, `catalogue/${data['product_name']}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          // You can use snapshot.bytesTransferred and snapshot.totalBytes
        },
        (error) => {
          console.error(error.message);
        },
        async () => {
          // Handle successful upload
          console.log("File uploaded successfully!");

          // Get the download URL
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Download URL:", downloadURL);
            setUrl(downloadURL)
            data['image_url'] = downloadURL
            props.onSave(data, props?.product?.id)
          } catch (error) {
            console.error("Error getting download URL:", error.message);
          }
        }
      );
    }
    else if (url) {
      // data['qty'] = checkedItems
      props.onSave(data, props?.catalogue?.id)
    }

    else {
      toast.error("No file selected!");
    }
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

        <div className='mt-2'>
          <div className='rw-label'>
            <span>Select Category</span>
          </div>
          <Select options={categoryArr} isClearable={true} required
          value={defaultCategory}
            onChange={categoryChange}
          />
        </div>

        <Label
          name="product_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product name
        </Label>

        <TextField
          name="product_name"
          defaultValue={props.catalogue?.product_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="product_name" className="rw-field-error" />

        <Label
          name="product_code"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product code
        </Label>

        <TextField
          name="product_code"
          defaultValue={props.catalogue?.product_code}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="product_code" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.catalogue?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>

        <TextField
          name="price"
          defaultValue={props.catalogue?.price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="price" className="rw-field-error" />
        {/*
        <Label
          name="image_url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>

        <TextField
          name="image_url"
          defaultValue={props.catalogue?.image_url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="image_url" className="rw-field-error" /> */}


        {/*
        <Label
          name="categoryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category id
        </Label>

        <NumberField
          name="categoryId"
          defaultValue={props.catalogue?.categoryId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="categoryId" className="rw-field-error" /> */}
        {/*
        <Label
          name="emp"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Emp
        </Label>

        <TextField
          name="emp"
          defaultValue={props.catalogue?.emp}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emp" className="rw-field-error" /> */}

        <div className='text-center'>
          <ImageSelector id='logo' Label='Product Image' allowMultiple={false} url={url} handleFileChange={handleFileChange}
            setUrl={setUrl}
          />

        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CatalogueForm
