export const schema = gql`
  type Catalogue {
    id: Int!
    product_name: String!
    product_code: String!
    description: String!
    price: Float!
    image_url: String!
    category: Category!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    categoryId: Int!
    emp: String!
  }

  type Query {
    catalogues: [Catalogue!]! @requireAuth
    catalogue(id: Int!): Catalogue @requireAuth
  }

  input CreateCatalogueInput {
    product_name: String!
    product_code: String!
    description: String!
    price: Float!
    image_url: String!
    extra: JSON
    categoryId: Int!
    emp: String!
  }

  input UpdateCatalogueInput {
    product_name: String
    product_code: String
    description: String
    price: Float
    image_url: String
    extra: JSON
    categoryId: Int
    emp: String
  }

  type Mutation {
    createCatalogue(input: CreateCatalogueInput!): Catalogue! @requireAuth
    updateCatalogue(id: Int!, input: UpdateCatalogueInput!): Catalogue!
      @requireAuth
    deleteCatalogue(id: Int!): Catalogue! @requireAuth
  }
`
