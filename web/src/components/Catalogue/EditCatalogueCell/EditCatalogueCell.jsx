import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CatalogueForm from 'src/components/Catalogue/CatalogueForm'

export const QUERY = gql`
  query EditCatalogueById($id: Int!) {
    catalogue: catalogue(id: $id) {
      id
      product_name
      product_code
      description
      price
      image_url
      created_at
      updated_at
      extra
      categoryId
      emp
      category{
        id
        category_name
      }
    }
    categories{
      id
      category_name
    }
  }
`
const UPDATE_CATALOGUE_MUTATION = gql`
  mutation UpdateCatalogueMutation($id: Int!, $input: UpdateCatalogueInput!) {
    updateCatalogue(id: $id, input: $input) {
      id
      product_name
      product_code
      description
      price
      image_url
      created_at
      updated_at
      extra
      categoryId
      emp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ catalogue,categories }) => {
  const [updateCatalogue, { loading, error }] = useMutation(
    UPDATE_CATALOGUE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Catalogue updated')
        navigate(routes.catalogues())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCatalogue({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Catalogue {catalogue?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CatalogueForm
          catalogue={catalogue}
          onSave={onSave}
          error={error}
          loading={loading}
          categories={categories}
        />
      </div>
    </div>
  )
}
