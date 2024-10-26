export const schema = gql`
  type ReferDoctor {
    id: Int!
    name: String!
    phoneno: String!
    hname: String!
    haddress: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    Record: [Record]!
  }

  type Query {
    referDoctors: [ReferDoctor!]! @requireAuth
    referDoctor(id: Int!): ReferDoctor @requireAuth
  }

  input CreateReferDoctorInput {
    name: String!
    phoneno: String!
    hname: String!
    haddress: String!
    extra: JSON
  }

  input UpdateReferDoctorInput {
    name: String
    phoneno: String
    hname: String
    haddress: String
    extra: JSON
  }

  type Mutation {
    createReferDoctor(input: CreateReferDoctorInput!): ReferDoctor! @requireAuth
    updateReferDoctor(id: Int!, input: UpdateReferDoctorInput!): ReferDoctor!
      @requireAuth
    deleteReferDoctor(id: Int!): ReferDoctor! @requireAuth
  }
`
