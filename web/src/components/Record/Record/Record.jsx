import {
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaUserMd,
  FaFlask,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecordMutation($id: Int!) {
    deleteRecord(id: $id) {
      id
    }
  }
`
const UPDATE_RECORD_MUTATION = gql`
  mutation UpdateRecordMutation($id: Int!, $input: UpdateRecordInput!) {
    updateRecord(id: $id, input: $input) {
      id
      info
      status
      created_at
      updated_at
      extra
      patientId
      referDoctorId
    }
  }
`

const Record = ({ record }) => {
  const [updateRecord, { loading, error }] = useMutation(
    UPDATE_RECORD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Record updated')
        navigate(routes.records())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const investigations = record.info?.investigations || []
  const totalAmount = record.info?.amount || 0
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION, {
    onCompleted: () => {
      toast.success('Record deleted')
      navigate(routes.records())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete record ' + id + '?')) {
      deleteRecord({ variables: { id } })
    }
  }

  const updateStatus = (id) => {
    let input = { status: 'Completed' }
    updateRecord({ variables: { id, input } })
  }

  return (
    <>
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Record Details
          </h2>
        </header>

        <div className="grid gap-6 border-t border-gray-200 pt-4">
          {/* Record Info */}

          {/* Patient Info */}
          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-600">
              <FaUser className="mr-2" /> Patient Info
            </h3>
            <div className="mt-2 space-y-2">
              <p>
                <span className="font-semibold">Name:</span>{' '}
                {record.patient.name}
              </p>
              <p>
                <span className="font-semibold">Age:</span> {record.patient.age}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>{' '}
                {record.patient.gender}
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-2" />{' '}
                <span className="font-semibold">Phone:</span>{' '}
                {record.patient.phone_no}
              </p>
            </div>
          </div>

          {/* Refer Doctor Info */}
          {record.referDr && (
            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="flex items-center text-lg font-semibold text-gray-600">
                <FaUser className="mr-2" /> Refer Doctor
              </h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{' '}
                  {record.referDr.name}
                </p>
                <p>
                  <span className="font-semibold">ID:</span> {record.referDr.id}
                </p>
              </div>
            </div>
          )}

          {/* Investigations Info */}
          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-600">
              <FaFlask className="mr-2" /> Investigations
            </h3>
            <div className="mt-2 space-y-2">
              {investigations.length > 0 ? (
                investigations.map((investigation) => (
                  <div key={investigation.id} className="flex justify-between">
                    <span className="font-semibold">{investigation.label}</span>
                    <span>Amount: ₹{investigation.amount}</span>
                    <span>Percentage: {investigation.perc}%</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No investigations available.</p>
              )}
              <div className="mt-4 text-right font-semibold text-blue-600">
                Total Amount: ₹{totalAmount}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md bg-gray-50 p-4">
          <h3 className="text-lg font-semibold text-gray-600">Basic Info</h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-semibold">Status:</span> {record.status}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{' '}
              {new Date(record.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Modified At:</span>{' '}
              {new Date(record.updated_at).toLocaleString()}
            </p>
            {record.extra && (
              <p>
                <span className="font-semibold">Extra Info:</span>{' '}
                {record.extra}
              </p>
            )}
          </div>
        </div>
        <nav className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => updateStatus(record.id)}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FaEdit className="mr-2" /> Update Status
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={() => onDeleteClick(record.id)}
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </nav>
      </div>
    </>
  )
}

export default Record
