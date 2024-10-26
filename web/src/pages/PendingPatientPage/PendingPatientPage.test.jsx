import { render } from '@redwoodjs/testing/web'

import PendingPatientPage from './PendingPatientPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PendingPatientPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PendingPatientPage />)
    }).not.toThrow()
  })
})
