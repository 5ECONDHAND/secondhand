import { useEffect, useState } from 'react'
import { Box, Link, Typography } from '@mui/material'
import { LoginForm, RegisterForm } from '../../components/molecules/auth'
import { useLocation } from 'react-router-dom'
import splash from '../../assets/images/login-splash.png'
import Loader from '../../components/atoms/global/Loader'

const FormChange = ({ text, status }) => {
  return (
    <>
      <Box mt="3rem" sx={{ textAlign: 'center' }}>
        <p style={{ display: 'inline' }}>{text} punya akun?</p>
        <Link
          href={text === 'Belum' ? '/register' : '/login'}
          underline="none"
          sx={{ color: '#7126B5', fontWeight: 'bold' }}
        >
          {' '}
          {status} di sini
        </Link>
      </Box>
    </>
  )
}

const Auth = () => {
  const location = useLocation()
  const [status, setStatus] = useState('')
  const getLocation = () => {
    switch (location.pathname) {
      case '/login':
        return 'Masuk'
      case '/register':
        return 'Daftar'
      default:
        return 'Masuk'
    }
  }

  useEffect(() => {
    setStatus(getLocation())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      <Loader />
      <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <Box
          component="img"
          src={splash}
          alt=""
          sx={{
            width: { xs: '0', md: '50vw' },
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
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
          <Typography
            variant="h4"
            sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold', color: 'white' }}
          >
            Second <br /> Hand.
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', mx: 'auto', px: { xs: '1rem', md: '0' } }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                display: { xs: 'block', md: 'none' },
                fontWeight: 'bold',
                textAlign: 'center',
                mb: '3rem',
              }}
            >
              Second <br /> Hand.
            </Typography>
            <Typography variant="h4" sx={{ mb: '2rem', fontWeight: 700 }}>
              {status}
            </Typography>
            {status === 'Masuk' ? (
              <>
                <LoginForm />
                <FormChange text="Belum" status="Daftar" />
              </>
            ) : (
              <>
                <RegisterForm />
                <FormChange text="Sudah" status="Masuk" />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Auth
