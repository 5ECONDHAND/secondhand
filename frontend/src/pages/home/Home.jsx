import { Box, Button, Container, Grid, Skeleton, Typography } from '@mui/material'
import { Banner, Buttons } from '../../components/molecules/home'
import { Navbar, ProductCard } from '../../components/molecules/global'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/slices/authSlice'
import { useEffect, useState } from 'react'
import { productActions, selectProduct } from '../../redux/slices/productSlice'
import { useGetDataQuery } from '../../redux/services/productApi'

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
  const [out, setOut] = useState(false)
  const userData = localStorage.getItem('User')
  // const products = useSelector((state) => state.products.products)
  const products = useSelector(selectProduct)
  const { data: productData, isSuccess: isProductSuccess } = useGetDataQuery()

  const logout = () => {
    dispatch(authActions.clearCredentials())
    setOut(true)
    navigate('/login')
  }

  useEffect(() => {
    if (out) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, productData, products])

  return (
    <>
      <Navbar />
      <Banner />
      <Container maxWidth="xl" sx={{ my: 0, pb: '6rem', position: 'relative' }}>
        <Typography variant="h6" sx={{ fontSize: '16px' }}>
          Telusuri Kategori
        </Typography>
        <Buttons />
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
        {userData ? <h3>{userData}</h3> : null}

        <Grid
          container
          columns={{ xs: 2, sm: 3, md: 4, lg: 6 }}
          mt={{ xs: '20px', md: '30px' }}
          spacing={3}
        >
          {isProductSuccess ? (
            productData.data?.map((item, index) => (
              <Grid item xs={1} key={index}>
                <Box onClick={() => navigate(`/product/${item.id}`)}>
                  <ProductCard
                    productName={item.name}
                    productCategory={item.Categories[0]}
                    productPrice={item.price}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Grid item xs={1} key={index}>
                  <Skeleton animation="wave" variant="rectangular" width={210} height={140} />
                  <Box sx={{ pt: 1 }}>
                    <Skeleton animation="wave" width={210} height={20} />
                    <Skeleton animation="wave" width="70%" height={20} />
                  </Box>
                </Grid>
              ))}
            </>
          )}
        </Grid>
        <SellButton />
      </Container>
    </>
  )
}

export default Home
