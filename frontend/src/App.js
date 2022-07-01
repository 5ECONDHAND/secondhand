import './styles/App.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'
import Router from './routes/Router'
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material'
import { SnackbarWrapper } from './components/templates'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SnackbarWrapper>
          <Router />
        </SnackbarWrapper>
      </ThemeProvider>
    </div>
  )
}

export default App
