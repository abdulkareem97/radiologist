import {
  referDoctors,
  referDoctor,
  createReferDoctor,
  updateReferDoctor,
  deleteReferDoctor,
} from './referDoctors'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('referDoctors', () => {
  scenario('returns all referDoctors', async (scenario) => {
    const result = await referDoctors()

    expect(result.length).toEqual(Object.keys(scenario.referDoctor).length)
  })

  scenario('returns a single referDoctor', async (scenario) => {
    const result = await referDoctor({ id: scenario.referDoctor.one.id })

    expect(result).toEqual(scenario.referDoctor.one)
  })

  scenario('creates a referDoctor', async () => {
    const result = await createReferDoctor({
      input: {
        name: 'String',
        phoneno: 'String',
        hname: 'String',
        haddress: 'String',
        updated_at: '2024-10-26T07:56:41.008Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.phoneno).toEqual('String')
    expect(result.hname).toEqual('String')
    expect(result.haddress).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-10-26T07:56:41.008Z'))
  })

  scenario('updates a referDoctor', async (scenario) => {
    const original = await referDoctor({
      id: scenario.referDoctor.one.id,
    })
    const result = await updateReferDoctor({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a referDoctor', async (scenario) => {
    const original = await deleteReferDoctor({
      id: scenario.referDoctor.one.id,
    })
    const result = await referDoctor({ id: original.id })

    expect(result).toEqual(null)
  })
})
