import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from '../pages/home/Home'
import { store } from '../redux/store'

const MockHome = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  )
}

test('renders sell button string', async () => {
  render(<MockHome />)
  const inputElement = screen.getByText('Jual')
  expect(inputElement).toBeInTheDocument()
})
