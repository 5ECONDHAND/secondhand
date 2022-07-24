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
import { validateLogin } from '../../../utils/validators'
import { useLoginUserMutation } from '../../../redux/services/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../redux/slices/authSlice'
import { userActions } from '../../../redux/slices/userSlice'
import { useSnackbar } from 'notistack'

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({})
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [
    loginUser,
    {
      data: loginData,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
    },
  ] = useLoginUserMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateLogin(values, setError)) {
      await loginUser({ ...values })
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
    if (isLoginSuccess && !loginData?.error) {
      dispatch(
        authActions.setCredentials({
          id: loginData.data[0].id,
          name: loginData.data[0].fullname,
          city: loginData.data[0].city,
          token: loginData.data[0].accessToken,
        })
      )
      dispatch(userActions.setUserActive(loginData.data[0]))
      enqueueSnackbar('Login success', { variant: 'success', autoHideDuration: 1000 })
      navigate('/')
    } else if (isLoginError || loginData?.error) {
      enqueueSnackbar(`${loginData?.message}`, {
        variant: 'error',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData, isLoginLoading, isLoginSuccess, isLoginError])

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
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
            autoComplete="on"
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
        {isLoginLoading ? (
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
            Masuk
          </Button>
        )}
      </Box>
    </>
  )
}

export default LoginForm
