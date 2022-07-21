import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import LoginForm from '../LoginForm'
import { store } from '../../../../redux/store'
import { SnackbarProvider } from "notistack"

const MockLoginForm = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <LoginForm />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  )
}

test('renders email placeholder string', async () => {
  render(<MockLoginForm />)
  const inputElement = screen.getByPlaceholderText('Contoh: johndee@gmail.com')
  expect(inputElement).toBeInTheDocument()
})
test('renders password placeholder string', async () => {
  render(<MockLoginForm />)
  const inputElement = screen.getByPlaceholderText('Masukkan password')
  expect(inputElement).toBeInTheDocument()
})
test('input login', () => {
  render(<MockLoginForm />)
  const emailElement = screen.getByPlaceholderText('Contoh: johndee@gmail.com')
  const passwordElement = screen.getByPlaceholderText('Masukkan password')
  const btnLogin = screen.getByRole('button', { name: 'Masuk' })
  fireEvent.click(emailElement)
  fireEvent.change(emailElement, { target: { value: 'ivan@gmail.com' } })
  fireEvent.click(passwordElement)
  fireEvent.change(passwordElement, { target: { value: '123123123' } })
  fireEvent.click(btnLogin)
  expect(emailElement).toBeInTheDocument()
})