import { Button, Container, Grid, Typography } from '@mui/material'
import { Banner, Buttons } from '../../components/molecules/home'
import { ProductCard } from '../../components/molecules/global'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/slices/authSlice'
import { useEffect, useState } from 'react'

const SellButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      variant="contained"
      size="large"
      startIcon={<FiPlus />}
      onClick={() => navigate('/add')}
      sx={{
        position: 'fixed',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '0.75rem',
        textTransform: 'none',
        boxShadow: '0 0.25rem 1rem rgba(105, 2, 198, 0.63) !important',
        background: '#7126B5',
        '&:hover': {
          background: '#631fa1',
        },
      }}
    >
      Jual
    </Button>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.user)
  const [out, setOut] = useState(false)
  // const userData = localStorage.getItem('user')

  const logout = () => {
    dispatch(authActions.clearCredentials())
    setOut(true)
  }

  useEffect(() => {
    if (out) {
      navigate('/login')
    }
  }, [out])

  return (
    <>
      <Banner />
      <Container maxWidth="xl" sx={{ my: 0, position: 'relative' }}>
        <Typography variant="h6" sx={{ fontSize: '16px' }}>
          Telusuri Kategori
        </Typography>
        <Buttons />
        {/* <Button variant="contained" onClick={logout}>
          Logout
        </Button>
        {userData ? <h1>{userData}</h1> : null} */}
        <Grid
          container
          columns={{ xs: 2, sm: 3, md: 4, lg: 6 }}
          mt={{ xs: '20px', md: '30px' }}
          spacing={3}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <Grid item xs={1} key={index}>
              <ProductCard />
            </Grid>
          ))}
        </Grid>
        <SellButton />
      </Container>
    </>
  )
}

export default Home
