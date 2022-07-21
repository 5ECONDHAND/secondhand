import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Navbar from '../Navbar'
import { store } from '../../../../redux/store'

const MockNavbar = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  )
}

test('renders placeholder string', async () => {
  render(<MockNavbar />)
  const inputElement = screen.getByPlaceholderText('Cari di sini ...')
  expect(inputElement).toBeInTheDocument()
})

test('onchange input', () => {
  render(<MockNavbar />)
  const inputElement = screen.getByPlaceholderText('Cari di sini ...')
  fireEvent.change(inputElement, { target: { value: 'jam tangan' } })
  expect(inputElement).toBeInTheDocument()

})