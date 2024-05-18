export const schema = gql`
  type FunctionHall {
    id: Int!
    name: String!
    address: String!
    phone_no: String!
    no_of_slot: Int!
    slot_price: Int!
    slot_names: JSON!
    desc: String!
    status: String!
    imageUrl: JSON!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    user: User!
    Booking: [Booking]!
    userId: Int!
  }

  type Query {
    functionHalls: [FunctionHall!]! @requireAuth
    functionHall(id: Int!): FunctionHall @requireAuth
  }

  input CreateFunctionHallInput {
    name: String!
    address: String!
    phone_no: String!
    no_of_slot: Int!
    slot_price: Int!
    slot_names: JSON!
    desc: String!
    status: String!
    imageUrl: JSON!
    extra: JSON
    userId: Int!
  }

  input UpdateFunctionHallInput {
    name: String
    address: String
    phone_no: String
    no_of_slot: Int
    slot_price: Int
    slot_names: JSON
    desc: String
    status: String
    imageUrl: JSON
    extra: JSON
    userId: Int
  }

  type Mutation {
    createFunctionHall(input: CreateFunctionHallInput!): FunctionHall!
      @requireAuth
    updateFunctionHall(
      id: Int!
      input: UpdateFunctionHallInput!
    ): FunctionHall! @requireAuth
    deleteFunctionHall(id: Int!): FunctionHall! @requireAuth
  }
`
