import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Category/CategoriesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const CategoriesList = ({ categories }) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('Category deleted')
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
    if (confirm('Are you sure you want to delete category ' + id + '?')) {
      deleteCategory({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Category name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>Emp</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{truncate(category.id)}</td>
              <td>{truncate(category.category_name)}</td>
              <td>{timeTag(category.created_at)}</td>
              <td>{timeTag(category.updated_at)}</td>
              <td>{jsonTruncate(category.extra)}</td>
              <td>{truncate(category.emp)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.category({ id: category.id })}
                    title={'Show category ' + category.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCategory({ id: category.id })}
                    title={'Edit category ' + category.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete category ' + category.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(category.id)}
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

export default CategoriesList
