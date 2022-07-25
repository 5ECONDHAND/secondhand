import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Navbar from '../components/atoms/global/Navbar'
import { store } from '../redux/store'
import { SnackbarWrapper } from '../components/templates'

const MockNavbar = () => {
  return (
    <Provider store={store}>
      <SnackbarWrapper>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </SnackbarWrapper>
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
