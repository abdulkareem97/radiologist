import Catalogue from 'src/components/Catalogue/Catalogue'

export const QUERY = gql`
  query FindCatalogueById($id: Int!) {
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Catalogue not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ catalogue }) => {
  return <Catalogue catalogue={catalogue} />
}
