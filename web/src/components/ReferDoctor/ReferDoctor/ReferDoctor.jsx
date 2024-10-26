import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_REFER_DOCTOR_MUTATION = gql`
  mutation DeleteReferDoctorMutation($id: Int!) {
    deleteReferDoctor(id: $id) {
      id
    }
  }
`

const ReferDoctor = ({ referDoctor }) => {
  const [deleteReferDoctor] = useMutation(DELETE_REFER_DOCTOR_MUTATION, {
    onCompleted: () => {
      toast.success('ReferDoctor deleted')
      navigate(routes.referDoctors())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm(`Are you sure you want to delete referDoctor ${id}?`)) {
      deleteReferDoctor({ variables: { id } })
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          ReferDoctor {referDoctor.id} Detail
        </h2>
      </header>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Id
            </th>
            <td className="px-4 py-2 text-sm text-gray-700">
              {referDoctor.id}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Name
            </th>
            <td className="px-4 py-2 text-sm text-gray-700">
              {referDoctor.name}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Phoneno
            </th>
            <td className="px-4 py-2 text-sm text-gray-700">
              {referDoctor.phoneno}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Hname
            </th>
            <td className="px-4 py-2 text-sm text-gray-700">
              {referDoctor.hname}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Haddress
            </th>
            <td className="px-4 py-2 text-sm text-gray-700">
              {referDoctor.haddress}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Created at
            </th>
            <td className="px-4 py-2 text-sm text-gray-700">
              {timeTag(referDoctor.created_at)}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Updated at
            </th>
            <td className="px-4 py-2 text-sm text-gray-700">
              {timeTag(referDoctor.updated_at)}
            </td>
          </tr>
        </tbody>
      </table>
      <nav className="mt-6 flex justify-center space-x-4">
        <Link
          to={routes.editReferDoctor({ id: referDoctor.id })}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Edit
        </Link>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={() => onDeleteClick(referDoctor.id)}
        >
          Delete
        </button>
      </nav>
    </div>
  )
}

export default ReferDoctor
