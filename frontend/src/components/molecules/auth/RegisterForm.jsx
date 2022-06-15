import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { validateRegister } from '../../../utils/validators'

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({})
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    validateRegister(values, setError)
    console.log('FORM VALUES', values)
    console.log('ERROR STATE', error)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormControl sx={{ minWidth: { xs: '30ch', md: '40ch', lg: '50ch' } }}>
          <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Nama</FormHelperText>
          <OutlinedInput
            error={error.fullname ? true : false}
            placeholder="Nama Lengkap"
            type="text"
            value={values.fullname}
            onChange={handleChange('fullname')}
            sx={{ borderRadius: '1rem' }}
          />
          <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.fullname}</FormHelperText>
        </FormControl>
        <FormControl sx={{ minWidth: { xs: '30ch', md: '40ch', lg: '50ch' } }}>
          <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Email</FormHelperText>
          <OutlinedInput
            error={error.email ? true : false}
            placeholder="Contoh: johndee@gmail.com"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            sx={{ borderRadius: '1rem' }}
          />
          <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.email}</FormHelperText>
        </FormControl>
        <FormControl sx={{ minWidth: { xs: '30ch', md: '40ch', lg: '50ch' }, mb: '2rem' }}>
          <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Password</FormHelperText>
          <OutlinedInput
            error={error.password ? true : false}
            placeholder="Masukkan password"
            sx={{ borderRadius: '1rem' }}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" sx={{ mr: '0.5rem' }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText sx={{ m: 0 }}>{error.password}</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disableElevation
          sx={{
            borderRadius: '1rem',
            textTransform: 'none',
            background: '#7126B5',
            py: '15px',
          }}
        >
          Daftar
        </Button>
      </Box>
    </>
  )
}

export default RegisterForm
