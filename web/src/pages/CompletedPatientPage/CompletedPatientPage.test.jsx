import { render } from '@redwoodjs/testing/web'

import CompletedPatientPage from './CompletedPatientPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CompletedPatientPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CompletedPatientPage />)
    }).not.toThrow()
  })
})
