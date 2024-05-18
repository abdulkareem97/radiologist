import {
  functionHalls,
  functionHall,
  createFunctionHall,
  updateFunctionHall,
  deleteFunctionHall,
} from './functionHalls'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('functionHalls', () => {
  scenario('returns all functionHalls', async (scenario) => {
    const result = await functionHalls()

    expect(result.length).toEqual(Object.keys(scenario.functionHall).length)
  })

  scenario('returns a single functionHall', async (scenario) => {
    const result = await functionHall({ id: scenario.functionHall.one.id })

    expect(result).toEqual(scenario.functionHall.one)
  })

  scenario('creates a functionHall', async (scenario) => {
    const result = await createFunctionHall({
      input: {
        name: 'String',
        address: 'String',
        phone_no: 'String',
        no_of_slot: 9865314,
        slot_price: 5949445,
        slot_names: { foo: 'bar' },
        desc: 'String',
        status: 'String',
        imageUrl: { foo: 'bar' },
        updated_at: '2024-05-07T03:58:33.275Z',
        userId: scenario.functionHall.two.userId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.address).toEqual('String')
    expect(result.phone_no).toEqual('String')
    expect(result.no_of_slot).toEqual(9865314)
    expect(result.slot_price).toEqual(5949445)
    expect(result.slot_names).toEqual({ foo: 'bar' })
    expect(result.desc).toEqual('String')
    expect(result.status).toEqual('String')
    expect(result.imageUrl).toEqual({ foo: 'bar' })
    expect(result.updated_at).toEqual(new Date('2024-05-07T03:58:33.275Z'))
    expect(result.userId).toEqual(scenario.functionHall.two.userId)
  })

  scenario('updates a functionHall', async (scenario) => {
    const original = await functionHall({
      id: scenario.functionHall.one.id,
    })
    const result = await updateFunctionHall({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a functionHall', async (scenario) => {
    const original = await deleteFunctionHall({
      id: scenario.functionHall.one.id,
    })
    const result = await functionHall({ id: original.id })

    expect(result).toEqual(null)
  })
})
