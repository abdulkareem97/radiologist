import { useEffect, useState } from 'react'
import { useMutation } from '@redwoodjs/web'

import { useLazyQuery, useQuery } from '@apollo/client'
import Multiselect from 'multiselect-react-dropdown'
import Select from 'react-select'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  TextField,
  NumberField,
  Submit,
  RadioField
} from '@redwoodjs/forms'

import 'react-js-dialog-box/dist/index.css'
import { ReactDialogBox } from 'react-js-dialog-box'
import { toast } from '@redwoodjs/web/dist/toast'

const FIND_PATIENT_BY_PHONE_NO = gql`
  query FindPatientByPhoneNoQuery($phone_no: String!) {
    patientByPhoneNo(phone_no: $phone_no) {
      id
      name
      phone_no
    }
  }
`

const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatientMutation($input: CreatePatientInput!) {
    createPatient(input: $input) {
      id
      name
    }
  }
`

const QUERY = gql`
  query FindInvestigations {
    investigations {
      id
      name
      amount
      perc
    }
    referDoctors {
      id
      name
    }
  }
`

// const patients = [
//   { value: '1', label: 'John Doe' },
//   { value: '2', label: 'Jane Smith' },
//   { value: '3', label: 'David Lee' },
// ]

// const investigationOptions = [
//   { name: 'Blood Test', amount: 100 },
//   { name: 'X-Ray', amount: 300 },
//   { name: 'MRI', amount: 1000 },
//   { name: 'CT Scan', amount: 500 },
// ]

const RecordForm = (props) => {
  const [start, setStart] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [patient, setPatient] = useState([])
  const [fetchPatients, { loading: loading1, data, error: error1 }] =
    useLazyQuery(FIND_PATIENT_BY_PHONE_NO)
  const { loading: loading2, data: d2, error: error2 } = useQuery(QUERY)
  const [investigationOptions, setInvestigationOption] = useState([])
  const [reffferalDoctorOptions, setReffferalDoctorOption] = useState([])
  const [amount,setAmount] = useState(0)
  useEffect(() => {
    if (d2) {
      let d = d2.investigations.map((ele)=>{
        return {
          ...ele,
          label:ele.name + ' - '+ele.amount
        }
      }
      )
      let rd = d2.referDoctors.map((item) => {
        const obj = { label: item.name, value: item.id }
        return obj
      })
      setInvestigationOption(d)
      setReffferalDoctorOption(rd)
    }
  }, [d2])
  const [phone, setPhone] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedInvestigations, setSelectedInvestigations] = useState([])

  // Handle patient selection
  const handlePatientChange = (option) => {
    // console.log(option)
    setSelectedPatient(option)
  }
  const handleReferalDoctorChange = (option) => {
    setSelectedDoctor(option)
  }

  // Handle investigation selection
  const handleInvestigationSelect = (selectedList) => {
    setSelectedInvestigations(selectedList)
    setAmount(selectedList.reduce((prev,ele)=>prev+ele.amount,0))
  }

  const handleInvestigationRemove = (selectedList) => {
    setSelectedInvestigations(selectedList)
    setAmount(selectedList.reduce((prev,ele)=>prev+ele.amount,0))
  }

  useEffect(() => {
    if (data) {
      const arrPat = data.patientByPhoneNo.map((item) => {
        const obj = { label: item.name, value: item.id }
        return obj
      })
      // // console.log(arrPat)
      setPatient(arrPat)
      setStart(false)
    }
  }, [data])

  const onSubmit = () => {
    let d = {
      info: {
        investigations:selectedInvestigations,
        amount:amount
      },
      status: 'Pending',
      patientId: selectedPatient.value,
      referDoctorId: selectedDoctor.value
    }
    // console.log(d)
    props.onSave(d, props?.record?.id)
  }

  const handleAddClick = () => {
    console.log('Phone number added:', phone)
    fetchPatients({ variables: { phone_no: phone } })
    // You can add more functionality here as needed
  }

  const addPatient = (input)=>{
    input['phone_no'] = phone
    console.log(input)
    createPatient({ variables: { input } })
  }

  const [createPatient, { loading, error }] = useMutation(
    CREATE_PATIENT_MUTATION,
    {
      onCompleted: ({createPatient}) => {
        const obj = { label: createPatient.name, value: createPatient.id }
        setSelectedPatient(obj)
        setPatient((ele)=>[obj,...ele])
        console.log(obj,patient)


        toast.success('Patient Added')
        setIsOpen(false)

        // navigate(routes.patients())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  return (
    <>

{isOpen && (
        <>
          <ReactDialogBox
            closeBox={() => {
              setIsOpen(false)
            }}
            modalWidth="50%"
            headerBackgroundColor="#2c2c2c"
            headerTextColor="white"
            headerHeight="60px"
            closeButtonColor="white"
            bodyBackgroundColor="white"
            bodyTextColor="black"
            bodyHeight="250px"
            headerText={
              <span className="flex h-14 items-end text-xl">
                Add Patient Details
              </span>
            }
          >
            <Form onSubmit={addPatient}>
              <div className="grid grid-cols-4 space-y-3">
                <div className="col-span-4 flex items-center space-x-3">
                  <Label
                    name="name"
                    className="rw-label  mt-0"
                    errorClassName="rw-label rw-label-error mt-0"
                  >
                    Name
                  </Label>

                  <TextField
                    name="name"
                    className="rw-input mt-0"
                    errorClassName="rw-input rw-input-error mt-0"
                    validation={{ required: true }}
                  />

                  <FieldError name="name" className="rw-field-error mt-0" />
                </div>

                <div className="col-span-2 flex items-center space-x-3">
                  <Label
                    name="age"
                    className="rw-label mt-0"
                    errorClassName="rw-label rw-label-error mt-0"
                  >
                    Age
                  </Label>

                  <NumberField
                    name="age"
                    className="rw-input mt-0"
                    errorClassName="rw-input rw-input-error mt-0"
                    validation={{ required: true }}
                  />

                  <FieldError name="age" className="rw-field-error mt-0" />
                </div>



              </div>
              <div className="flex items-center">
          <Label className="mr-4 inline-flex items-center">
            <RadioField
              name="gender"
              value="MALE"
              // defaultChecked={props.patient?.gender === 'MALE'}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Male</span>
          </Label>
          <Label className="inline-flex items-center">
            <RadioField
              name="gender"
              value="FEMALE"
              // defaultChecked={props.patient?.gender === 'FEMALE'}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Female</span>
          </Label>
        </div>

              <div className="rw-button-group">
                <Submit className="rw-button bg-gray-800 text-white">
                  Add Patient
                </Submit>
              </div>
            </Form>
          </ReactDialogBox>
        </>
      )}



      {start && (
        <>
          <div className="flex  items-center justify-center bg-gray-100">
            <div className="mx-auto my-4 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="px-6 py-4">
                <h1 className="mb-2 text-xl font-bold">Patient Information</h1>
                <div className="mb-4">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleAddClick}
                    className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Add Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!start && (
        <div className="rw-form-wrapper mx-auto my-4 max-w-lg space-y-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Patient Investigation Form
          </h2>

          <div className="space-y-4">
            {/* Patient Select */}
            <label className="block text-sm font-medium text-gray-600">
              Select Patient or {' '}
               <span className='bg-green-500 text-white p-2 rounded-md' onClick={()=>setIsOpen(true)}>Add Patient</span>
            </label>
            <Select
              options={patient}
              value={selectedPatient}
              onChange={handlePatientChange}
              placeholder="Select a patient..."
              className="basic-single"
              classNamePrefix="select"
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary25: '#e2e8f0',
                  primary: '#3b82f6',
                },
              })}
            />
            <label className="block text-sm font-medium text-gray-600">
              Select Refferal Dr
            </label>
            <Select
              options={reffferalDoctorOptions}
              value={selectedDoctor}
              onChange={handleReferalDoctorChange}
              placeholder="Select a Doctor..."
              className="basic-single"
              classNamePrefix="select"
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary25: '#e2e8f0',
                  primary: '#3b82f6',
                },
              })}
            />

            {/* Investigation Types */}
            <label className="block text-sm font-medium text-gray-600">
              Investigation Types
            </label>
            <Multiselect
              options={investigationOptions}
              selectedValues={selectedInvestigations}
              onSelect={handleInvestigationSelect}
              onRemove={handleInvestigationRemove}
              displayValue="label"
              placeholder="Select investigation types..."
              className="w-full"
              style={{
                chips: { background: '#3b82f6' },
                multiselectContainer: { color: '#111827' },
                searchBox: {
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                },
              }}
            />

                    {/* Total Amount Display */}
        <div className="flex justify-between items-center pt-4">
          <span className="text-lg font-medium text-gray-600">Total Amount</span>
          <span className="text-lg font-semibold text-gray-900">₹{amount}</span>
        </div>
          </div>


          {/* Submit Button */}
          <button
            // type="submit"
            onClick={onSubmit}
            className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      )}
    </>
  )
}

export default RecordForm
