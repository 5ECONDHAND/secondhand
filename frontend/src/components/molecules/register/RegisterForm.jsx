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

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
    console.log(values)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
    console.log(showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <>
      <Box component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl sx={{ minWidth: '50ch' }}>
          <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Nama</FormHelperText>
          <OutlinedInput
            placeholder="Nama Lengkap"
            type="text"
            value={values.fullname}
            onChange={handleChange('fullname')}
            sx={{ borderRadius: '1rem', mb: '1rem' }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: '50ch' }}>
          <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Email</FormHelperText>
          <OutlinedInput
            placeholder="Contoh: johndee@gmail.com"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            sx={{ borderRadius: '1rem', mb: '1rem' }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: '50ch', mb: '2rem' }}>
          <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Password</FormHelperText>
          <OutlinedInput
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
                  {values.showPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </InputAdornment>
            }
          />
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
