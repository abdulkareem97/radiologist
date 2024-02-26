import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_CATALOGUE_MUTATION = gql`
  mutation DeleteCatalogueMutation($id: Int!) {
    deleteCatalogue(id: $id) {
      id
    }
  }
`

const Catalogue = ({ catalogue }) => {
  const [deleteCatalogue] = useMutation(DELETE_CATALOGUE_MUTATION, {
    onCompleted: () => {
      toast.success('Catalogue deleted')
      navigate(routes.catalogues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete catalogue ' + id + '?')) {
      deleteCatalogue({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Catalogue {catalogue.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{catalogue.id}</td>
            </tr>
            <tr>
              <th>Product name</th>
              <td>{catalogue.product_name}</td>
            </tr>
            <tr>
              <th>Product code</th>
              <td>{catalogue.product_code}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{catalogue.description}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{catalogue.price}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{catalogue.image_url}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(catalogue.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(catalogue.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(catalogue.extra)}</td>
            </tr>
            <tr>
              <th>Category id</th>
              <td>{catalogue.categoryId}</td>
            </tr>
            <tr>
              <th>Emp</th>
              <td>{catalogue.emp}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCatalogue({ id: catalogue.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(catalogue.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Catalogue
