import { Link, routes } from '@redwoodjs/router'

import Catalogues from 'src/components/Catalogue/Catalogues'

export const QUERY = gql`
  query FindCatalogues {
    catalogues {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No catalogues yet. '}
      <Link to={routes.newCatalogue()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ catalogues }) => {
  return <Catalogues catalogues={catalogues} />
}
