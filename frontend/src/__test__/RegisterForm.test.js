import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import RegisterForm from '../components/molecules/auth/RegisterForm'
import { store } from '../redux/store'
import { SnackbarProvider } from "notistack"

const MockRegisterForm = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <RegisterForm />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  )
}
test('renders fullname placeholder string', async () => {
  render(<MockRegisterForm />)
  const inputElement = screen.getByPlaceholderText('Nama Lengkap')
  expect(inputElement).toBeInTheDocument()
})
test('renders email placeholder string', async () => {
  render(<MockRegisterForm />)
  const inputElement = screen.getByPlaceholderText('Contoh: johndee@gmail.com')
  expect(inputElement).toBeInTheDocument()
})
test('renders password placeholder string', async () => {
  render(<MockRegisterForm />)
  const inputElement = screen.getByPlaceholderText('Masukkan password')
  expect(inputElement).toBeInTheDocument()
})
test('input login', () => {
  render(<MockRegisterForm />)
  const nameElement = screen.getByPlaceholderText('Nama Lengkap')
  const emailElement = screen.getByPlaceholderText('Contoh: johndee@gmail.com')
  const passwordElement = screen.getByPlaceholderText('Masukkan password')
  const btnDaftar = screen.getByRole('button', { name: 'Daftar' })
  fireEvent.click(nameElement)
  fireEvent.change(nameElement, { target: { value: 'ivan' } })
  fireEvent.click(emailElement)
  fireEvent.change(emailElement, { target: { value: 'ivan@gmail.com' } })
  fireEvent.click(passwordElement)
  fireEvent.change(passwordElement, { target: { value: '123123123' } })
  fireEvent.click(btnDaftar)
  expect(emailElement).toBeInTheDocument()
})