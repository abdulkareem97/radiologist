import {
  categories,
  category,
  createCategory,
  updateCategory,
  deleteCategory,
} from './categories'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('categories', () => {
  scenario('returns all categories', async (scenario) => {
    const result = await categories()

    expect(result.length).toEqual(Object.keys(scenario.category).length)
  })

  scenario('returns a single category', async (scenario) => {
    const result = await category({ id: scenario.category.one.id })

    expect(result).toEqual(scenario.category.one)
  })

  scenario('creates a category', async () => {
    const result = await createCategory({
      input: {
        category_name: 'String',
        updated_at: '2024-02-26T16:06:56.537Z',
        emp: 'String',
      },
    })

    expect(result.category_name).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-02-26T16:06:56.537Z'))
    expect(result.emp).toEqual('String')
  })

  scenario('updates a category', async (scenario) => {
    const original = await category({
      id: scenario.category.one.id,
    })
    const result = await updateCategory({
      id: original.id,
      input: { category_name: 'String2' },
    })

    expect(result.category_name).toEqual('String2')
  })

  scenario('deletes a category', async (scenario) => {
    const original = await deleteCategory({
      id: scenario.category.one.id,
    })
    const result = await category({ id: original.id })

    expect(result).toEqual(null)
  })
})
