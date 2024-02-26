import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Catalogue/CataloguesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_CATALOGUE_MUTATION = gql`
  mutation DeleteCatalogueMutation($id: Int!) {
    deleteCatalogue(id: $id) {
      id
    }
  }
`

const CataloguesList = ({ catalogues }) => {
  const [deleteCatalogue] = useMutation(DELETE_CATALOGUE_MUTATION, {
    onCompleted: () => {
      toast.success('Catalogue deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete catalogue ' + id + '?')) {
      deleteCatalogue({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product name</th>
            <th>Product code</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image url</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>Category id</th>
            <th>Emp</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {catalogues.map((catalogue) => (
            <tr key={catalogue.id}>
              <td>{truncate(catalogue.id)}</td>
              <td>{truncate(catalogue.product_name)}</td>
              <td>{truncate(catalogue.product_code)}</td>
              <td>{truncate(catalogue.description)}</td>
              <td>{truncate(catalogue.price)}</td>
              <td>{truncate(catalogue.image_url)}</td>
              <td>{timeTag(catalogue.created_at)}</td>
              <td>{timeTag(catalogue.updated_at)}</td>
              <td>{jsonTruncate(catalogue.extra)}</td>
              <td>{truncate(catalogue.categoryId)}</td>
              <td>{truncate(catalogue.emp)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.catalogue({ id: catalogue.id })}
                    title={'Show catalogue ' + catalogue.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCatalogue({ id: catalogue.id })}
                    title={'Edit catalogue ' + catalogue.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete catalogue ' + catalogue.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(catalogue.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CataloguesList
