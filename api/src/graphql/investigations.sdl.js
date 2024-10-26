export const schema = gql`
  type Investigation {
    id: Int!
    name: String!
    perc: Float!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    investigations: [Investigation!]! @requireAuth
    investigation(id: Int!): Investigation @requireAuth
  }

  input CreateInvestigationInput {
    name: String!
    perc: Float!
    extra: JSON
  }

  input UpdateInvestigationInput {
    name: String
    perc: Float
    extra: JSON
  }

  type Mutation {
    createInvestigation(input: CreateInvestigationInput!): Investigation!
      @requireAuth
    updateInvestigation(
      id: Int!
      input: UpdateInvestigationInput!
    ): Investigation! @requireAuth
    deleteInvestigation(id: Int!): Investigation! @requireAuth
  }
`
