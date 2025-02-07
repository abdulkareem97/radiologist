export const schema = gql`
  type Patient {
    id: Int!
    name: String!
    age: Int!
    phone_no: String
    gender: String
    address: String
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    Record: [Record]!
  }

  type Query {
    patients: [Patient!]! @requireAuth
    patient(id: Int!): Patient @requireAuth
    patientByPhoneNo(phone_no: String!): [Patient!]! @requireAuth
  }

  input CreatePatientInput {
    name: String!
    age: Int!
    phone_no: String
    gender: String
    address: String
    extra: JSON
  }

  input UpdatePatientInput {
    name: String
    age: Int
    phone_no: String
    gender: String
    address: String
    extra: JSON
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient! @requireAuth
    updatePatient(id: Int!, input: UpdatePatientInput!): Patient! @requireAuth
    deletePatient(id: Int!): Patient! @requireAuth
  }
`
