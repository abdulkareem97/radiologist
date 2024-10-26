import {
  records,
  record,
  createRecord,
  updateRecord,
  deleteRecord,
} from './records'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('records', () => {
  scenario('returns all records', async (scenario) => {
    const result = await records()

    expect(result.length).toEqual(Object.keys(scenario.record).length)
  })

  scenario('returns a single record', async (scenario) => {
    const result = await record({ id: scenario.record.one.id })

    expect(result).toEqual(scenario.record.one)
  })

  scenario('creates a record', async (scenario) => {
    const result = await createRecord({
      input: {
        info: { foo: 'bar' },
        status: 'String',
        updated_at: '2024-10-26T06:53:07.183Z',
        patientId: scenario.record.two.patientId,
        referDoctorId: scenario.record.two.referDoctorId,
      },
    })

    expect(result.info).toEqual({ foo: 'bar' })
    expect(result.status).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-10-26T06:53:07.183Z'))
    expect(result.patientId).toEqual(scenario.record.two.patientId)
    expect(result.referDoctorId).toEqual(scenario.record.two.referDoctorId)
  })

  scenario('updates a record', async (scenario) => {
    const original = await record({ id: scenario.record.one.id })
    const result = await updateRecord({
      id: original.id,
      input: { info: { foo: 'baz' } },
    })

    expect(result.info).toEqual({ foo: 'baz' })
  })

  scenario('deletes a record', async (scenario) => {
    const original = await deleteRecord({
      id: scenario.record.one.id,
    })
    const result = await record({ id: original.id })

    expect(result).toEqual(null)
  })
})
