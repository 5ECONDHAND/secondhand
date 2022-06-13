import React from 'react'
import splash from '../../assets/images/login-splash.png'
import Box from '@mui/material/Box'
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <>
      <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <img src={splash} alt="" style={{ width: '50vw', objectFit: 'cover' }} />
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: '50vw',
            background: 'linear-gradient(to top, #A06ECE 5%, rgba(160, 110, 206, 0) 80%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0%',
            ml: '4rem',
          }}
        >
          <h1 style={{ color: 'white' }}>
            Second <br /> Hand.
          </h1>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mx: 'auto' }}>
          <Box>
            <h1 style={{ marginBottom: '2rem' }}>Masuk</h1>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <FormControl sx={{ minWidth: '50ch' }}>
                <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                  Email
                </FormHelperText>
                <OutlinedInput
                  placeholder="Contoh: johndee@gmail.com"
                  sx={{ borderRadius: '1rem', mb: '1rem' }}
                />
              </FormControl>
              <FormControl sx={{ minWidth: '50ch', mb: '2rem' }}>
                <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                  Password
                </FormHelperText>
                <OutlinedInput
                  placeholder="Masukkan password"
                  sx={{ borderRadius: '1rem' }}
                  type={values.showPassword ? 'text' : 'password'}
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
                Masuk
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Login
