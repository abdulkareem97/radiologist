import { render } from '@redwoodjs/testing/web'

import ViewAllPage from './ViewAllPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ViewAllPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewAllPage />)
    }).not.toThrow()
  })
})
