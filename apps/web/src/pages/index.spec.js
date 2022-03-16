import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import Docs from '../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Docs />)

    const heading = screen.getByRole('heading', {
      name: /web welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
