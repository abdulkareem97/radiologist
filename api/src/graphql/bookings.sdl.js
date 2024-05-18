export const schema = gql`
  type Booking {
    id: Int!
    name: String!
    phone_no: String!
    slots: JSON!
    prize: JSON!
    date: DateTime!
    desc: String!
    status: String!
    function_hall: FunctionHall!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    functionHallId: Int!
  }

  type Query {
    bookings: [Booking!]! @requireAuth
    booking(id: Int!): Booking @requireAuth
  }

  input CreateBookingInput {
    name: String!
    phone_no: String!
    slots: JSON!
    prize: JSON!
    date: DateTime!
    desc: String!
    status: String!
    extra: JSON
    functionHallId: Int!
  }

  input UpdateBookingInput {
    name: String
    phone_no: String
    slots: JSON
    prize: JSON
    date: DateTime
    desc: String
    status: String
    extra: JSON
    functionHallId: Int
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking! @requireAuth
    updateBooking(id: Int!, input: UpdateBookingInput!): Booking! @requireAuth
    deleteBooking(id: Int!): Booking! @requireAuth
  }
`
