import {
  investigations,
  investigation,
  createInvestigation,
  updateInvestigation,
  deleteInvestigation,
} from './investigations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('investigations', () => {
  scenario('returns all investigations', async (scenario) => {
    const result = await investigations()

    expect(result.length).toEqual(Object.keys(scenario.investigation).length)
  })

  scenario('returns a single investigation', async (scenario) => {
    const result = await investigation({ id: scenario.investigation.one.id })

    expect(result).toEqual(scenario.investigation.one)
  })

  scenario('creates a investigation', async () => {
    const result = await createInvestigation({
      input: {
        name: 'String',
        perc: 3552003.124904226,
        updated_at: '2024-10-26T06:51:41.749Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.perc).toEqual(3552003.124904226)
    expect(result.updated_at).toEqual(new Date('2024-10-26T06:51:41.749Z'))
  })

  scenario('updates a investigation', async (scenario) => {
    const original = await investigation({
      id: scenario.investigation.one.id,
    })
    const result = await updateInvestigation({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a investigation', async (scenario) => {
    const original = await deleteInvestigation({
      id: scenario.investigation.one.id,
    })
    const result = await investigation({ id: original.id })

    expect(result).toEqual(null)
  })
})
