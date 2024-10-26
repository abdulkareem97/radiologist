export const schema = gql`
  type Record {
    id: Int!
    patient: Patient!
    referDr: ReferDoctor!
    info: JSON!
    status: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    patientId: Int!
    referDoctorId: Int!
  }

  type Query {
    records: [Record!]! @requireAuth
    record(id: Int!): Record @requireAuth
  }

  input CreateRecordInput {
    info: JSON!
    status: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    patientId: Int!
    referDoctorId: Int!
  }

  input UpdateRecordInput {
    info: JSON
    status: String
    created_at: DateTime
    updated_at: DateTime
    extra: JSON
    patientId: Int
    referDoctorId: Int
  }

  type Mutation {
    createRecord(input: CreateRecordInput!): Record! @requireAuth
    updateRecord(id: Int!, input: UpdateRecordInput!): Record! @requireAuth
    deleteRecord(id: Int!): Record! @requireAuth
  }
`
