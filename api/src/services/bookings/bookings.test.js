import {
  bookings,
  booking,
  createBooking,
  updateBooking,
  deleteBooking,
} from './bookings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bookings', () => {
  scenario('returns all bookings', async (scenario) => {
    const result = await bookings()

    expect(result.length).toEqual(Object.keys(scenario.booking).length)
  })

  scenario('returns a single booking', async (scenario) => {
    const result = await booking({ id: scenario.booking.one.id })

    expect(result).toEqual(scenario.booking.one)
  })

  scenario('creates a booking', async (scenario) => {
    const result = await createBooking({
      input: {
        name: 'String',
        phone_no: 'String',
        slots: { foo: 'bar' },
        prize: { foo: 'bar' },
        date: '2024-05-07T03:50:06.271Z',
        desc: 'String',
        status: 'String',
        updated_at: '2024-05-07T03:50:06.271Z',
        functionHallId: scenario.booking.two.functionHallId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.phone_no).toEqual('String')
    expect(result.slots).toEqual({ foo: 'bar' })
    expect(result.prize).toEqual({ foo: 'bar' })
    expect(result.date).toEqual(new Date('2024-05-07T03:50:06.271Z'))
    expect(result.desc).toEqual('String')
    expect(result.status).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-05-07T03:50:06.271Z'))
    expect(result.functionHallId).toEqual(scenario.booking.two.functionHallId)
  })

  scenario('updates a booking', async (scenario) => {
    const original = await booking({ id: scenario.booking.one.id })
    const result = await updateBooking({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a booking', async (scenario) => {
    const original = await deleteBooking({
      id: scenario.booking.one.id,
    })
    const result = await booking({ id: original.id })

    expect(result).toEqual(null)
  })
})
