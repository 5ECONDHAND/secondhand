import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      ml: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
