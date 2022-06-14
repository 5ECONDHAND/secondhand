import { useEffect, useState } from 'react'
import splash from '../../assets/images/login-splash.png'
import Box from '@mui/material/Box'
import { Link } from '@mui/material'
import { LoginForm, RegisterForm } from '../../components/molecules'
import { useLocation } from 'react-router-dom'

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

const Login = () => {
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
            {status === 'Masuk' ? (
              <>
                <h1 style={{ marginBottom: '2rem' }}>{status}</h1>
                <LoginForm />
                <FormChange text="Belum" status="Daftar" />
              </>
            ) : (
              <>
                <h1 style={{ marginBottom: '2rem' }}>{status}</h1>
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

export default Login
