import { render } from '@redwoodjs/testing/web'

import ReportReferal from './ReportReferal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReportReferal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportReferal />)
    }).not.toThrow()
  })
})
