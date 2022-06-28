import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { validateRegister } from '../../../utils/validators'
import { useRegisterUserMutation } from '../../../redux/services/authApi'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const RegisterForm = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({})
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
  })
  const [
    registerUser,
    {
      data: registerData,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
    },
  ] = useRegisterUserMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateRegister(values, setError)) {
      await registerUser({ ...values })
    }
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

  useEffect(() => {
    if (isRegisterSuccess && registerData.data.length !== 0) {
      console.log('Data', registerData)
      enqueueSnackbar('Registration success', { variant: 'success', autoHideDuration: 1000 })
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } else if (isRegisterError || registerData?.error) {
      enqueueSnackbar(`${registerData.message}`, {
        variant: 'warning',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData, isRegisterSuccess, isRegisterLoading, isRegisterError])
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
        {isRegisterLoading ? (
          <Box sx={{ mx: 'auto' }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
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
        )}
      </Box>
    </>
  )
}

export default RegisterForm
