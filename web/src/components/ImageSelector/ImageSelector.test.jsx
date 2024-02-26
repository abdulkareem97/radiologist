import { render } from '@redwoodjs/testing/web'

import ImageSelector from './ImageSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageSelector />)
    }).not.toThrow()
  })
})
