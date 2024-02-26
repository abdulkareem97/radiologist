import {
  catalogues,
  catalogue,
  createCatalogue,
  updateCatalogue,
  deleteCatalogue,
} from './catalogues'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('catalogues', () => {
  scenario('returns all catalogues', async (scenario) => {
    const result = await catalogues()

    expect(result.length).toEqual(Object.keys(scenario.catalogue).length)
  })

  scenario('returns a single catalogue', async (scenario) => {
    const result = await catalogue({ id: scenario.catalogue.one.id })

    expect(result).toEqual(scenario.catalogue.one)
  })

  scenario('creates a catalogue', async (scenario) => {
    const result = await createCatalogue({
      input: {
        product_name: 'String',
        product_code: 'String',
        description: 'String',
        price: 8601373.058531838,
        image_url: 'String',
        updated_at: '2024-02-26T16:07:22.980Z',
        categoryId: scenario.catalogue.two.categoryId,
        emp: 'String',
      },
    })

    expect(result.product_name).toEqual('String')
    expect(result.product_code).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.price).toEqual(8601373.058531838)
    expect(result.image_url).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-02-26T16:07:22.980Z'))
    expect(result.categoryId).toEqual(scenario.catalogue.two.categoryId)
    expect(result.emp).toEqual('String')
  })

  scenario('updates a catalogue', async (scenario) => {
    const original = await catalogue({
      id: scenario.catalogue.one.id,
    })
    const result = await updateCatalogue({
      id: original.id,
      input: { product_name: 'String2' },
    })

    expect(result.product_name).toEqual('String2')
  })

  scenario('deletes a catalogue', async (scenario) => {
    const original = await deleteCatalogue({
      id: scenario.catalogue.one.id,
    })
    const result = await catalogue({ id: original.id })

    expect(result).toEqual(null)
  })
})
