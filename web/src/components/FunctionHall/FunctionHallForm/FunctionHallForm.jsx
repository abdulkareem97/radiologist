



import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import JoditEditor from 'jodit-react'
import { useState } from 'react'
import ImageSelector from 'src/components/ImageSelector/ImageSelector'
import BarLoader from 'react-spinners/BarLoader'

import { storage } from "src/Utils/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { MdDeleteForever } from "react-icons/md";
import { toast } from '@redwoodjs/web/dist/toast'
import { useAuth } from 'src/auth'

const FunctionHallForm = (props) => {

  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const [noOfSlots, setNoOfSlots] = useState(props?.functionHall?.no_of_slot || '')
  const [slotNames, setSlotNames] = useState(props?.functionHall?.slot_names || [])
  const [desc, setDesc] = useState(props?.functionHall?.desc ||'')
  const [start, setStart] = useState(false)

  console.log(slotNames)

  const handleSlotNameChange = (e, index) => {
    const newSlotNames = [...slotNames]; // Create a copy of the slotNames array
    newSlotNames[index] = e.target.value; // Update the slot name at the specified index
    setSlotNames(newSlotNames); // Update the state with the new array of slot names
  };

  const onSubmit = async (data) => {
    setStart(true)

    let profileImage = url1

    if (url1 == '' || file1) {

      const storageRef = ref(storage, `functionhall/${data.name}/${data.phone_no}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file1);


      // Wrap uploadTask.on in a Promise
      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Track upload progress
            // You can use snapshot.bytesTransferred and snapshot.totalBytes
          },
          (error) => {
            console.error(error.message);
            reject(error);
          },
          async () => {


            // Handle successful upload
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setUrl1(downloadURL);
              profileImage = downloadURL

              resolve(downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error.message);
              reject(error);
            }
          }
        );
      });

      // Wait for the Promise to resolve before continuing
      await uploadPromise;
    }



    const uploadPromises = galleryFile.map(async (file, index) => {
      console.log('here', index);

      const storageRef = ref(storage, `functionhall/${data.name + data.phone_no}/gallery/${index}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Track upload progress
            // You can use snapshot.bytesTransferred and snapshot.totalBytes
          },
          (error) => {
            console.error(error.message);
            reject(error);
          },
          async () => {
            // Handle successful upload
            console.log("File uploaded successfully!");

            // Get the download URL
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Download URL:", downloadURL);
              galleryUrl.push(downloadURL);
              resolve(downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error.message);
              reject(error);
            }
          }
        );
      });
    });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(uploadPromises);
    console.log(galleryUrl)



    let d = {}
    d = { 'profileImage': profileImage, 'gallery': galleryUrl }

    console.log(slotNames)
    let input = {
      ...data,
      'slot_names': slotNames,
      'status': 'pending',
      'imageUrl':d,
      'desc':desc

    }
    props.onSave(input, props?.functionHall?.id)
    setStart(false)
  }


  // copient from tap to contact



  const [file1, setFile1] = useState(null);
  const [url1, setUrl1] = useState(props?.functionHall?.imageUrl?.profileImage || '')

  const [galleryFile, setGalleryFile] = useState([]);
  const [galleryUrl, setGalleryUrl] = useState([]);
  // let galleryUrl = []
  // const [url,setUrl] = useState([]);
  // const [galleryFile, setGalleryFile] = useState(null)
  // const [gallery]
  const [selectedImages, setSelectedImages] = useState(props?.clientInfo?.details?.gallery || []);
  const handleFileChange1 = (e) => {
    if (e.target.files[0]) {
      setFile1(e.target.files[0]);
    }
  };

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    console.log(selectedFiles)
    console.log(event.target.files[0])
    console.log(selectedFilesArray)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });



    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setGalleryFile((prev) => prev.concat(selectedFilesArray))

    // FOR BUG IN CHROME
    event.target.value = "";
    // console.log(sele)
  };

  function deleteHandler(index) {
    setSelectedImages(selectedImages.filter((e, i) => i !== index));
    setGalleryFile(galleryFile.filter((e, i) => i !== index))
    URL.revokeObjectURL(image);
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.functionHall?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="address"
          defaultValue={props.functionHall?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="address" className="rw-field-error" />

        <Label
          name="phone_no"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone no
        </Label>

        <TextField
          name="phone_no"
          defaultValue={props.functionHall?.phone_no}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phone_no" className="rw-field-error" />

        <Label
          name="no_of_slot"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          No of slot
        </Label>

        <NumberField
          name="no_of_slot"
          defaultValue={props.functionHall?.no_of_slot}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          value={noOfSlots}
          onChange={(e) => {
            // console.log('here')
            setNoOfSlots(e.target.value)
            setSlotNames(Array.from({ length: e.target.value }).fill(''))
          }}
        />

        <FieldError name="no_of_slot" className="rw-field-error" />



        <div className='flex flex-col mt-3  gap-x-4'>
          {noOfSlots && <Label
            name="slot_names"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Slot names
          </Label>}
          <div className='flex space-x-2 flex-wrap '>
            {Array.from({ length: noOfSlots }).map((_, index) => {



              return (
                <div key={index}>
                  <input type="text" className="border border-black p-2 w-24" placeholder={`Slot ${index + 1} Name`}
                    value={slotNames[index]}

                    onChange={(e) => handleSlotNameChange(e, index)}
                    required />
                </div>)
            }
            )}
          </div>

        </div>

        {/* <Label
          name="slot_names"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slot names
        </Label>

        <TextAreaField
          name="slot_names"
          defaultValue={JSON.stringify(props.functionHall?.slot_names)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="slot_names" className="rw-field-error" /> */}

        <Label
          name="slot_price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slot price
        </Label>

        <NumberField
          name="slot_price"
          defaultValue={props.functionHall?.slot_price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="slot_price" className="rw-field-error" />

        <div className='mt-4'>
          <JoditEditor

            value={desc}
            onChange={e => setDesc(e)}
          />
        </div>

        {/* <Label
          name="desc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Desc
        </Label>

        <TextField
          name="desc"
          defaultValue={props.functionHall?.desc}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="desc" className="rw-field-error" /> */}

        {/* <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.functionHall?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="status" className="rw-field-error" /> */}

        {/* <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>

        <TextAreaField
          name="imageUrl"
          defaultValue={JSON.stringify(props.functionHall?.imageUrl)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="imageUrl" className="rw-field-error" /> */}

        {/* <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.functionHall?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" /> */}


        <div className='p-3 mb-4 '>
          <ImageSelector id='logo' label='Profile Image' allowMultiple={false} url={url1} handleFileChange={handleFileChange1}
            setUrl={setUrl1}
          />

        </div>




        {/* mohammed */}
        <section>
          {/* <label>
                  + Add Images
                  <br />
                  <span>up to 10 images</span> */}
          <div>
            <h1>Add Gallery Images</h1>
          </div>
          <div className='flex justify-center items-center bg-black p-3 m-3'>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/*"
              className=" text-yellow-500"
            />
          </div>
          {/* </label> */}
          <br />





          <div className={`${selectedImages && 'bg-black flex space-x-2 flex-wrap p-3 mr-1 rounded-lg'} `}>
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className="flex flex-col items-center justify-center ">
                    <img src={image} height="100" className='h-36' alt="upload" />
                    <button onClick={() => deleteHandler(index)} className='p-2 bg-slate-900 text-white rounded-full mt-2'>
                      <MdDeleteForever />
                    </button>

                    {/* <p>{index + 1}</p> */}
                  </div>
                );
              })}
          </div>
        </section>

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          // defaultValue={props.functionHall?.userId}
          defaultValue={currentUser.id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />









        <div className="rw-button-group">
          <Submit  className="m-4 py-2 px-6  text-white bg-[#111827] rounded-full hover:bg-[#161f31] focus:outline-none focus:shadow-outline-indigo"
          disabled={start}
          >
             {start ? (
                <>
                  <BarLoader color="white" loading={start} height={10} />
                </>
              ) : (
                'Save Details'
              )}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FunctionHallForm
