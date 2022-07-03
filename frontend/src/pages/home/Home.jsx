import { useEffect } from 'react'
import { Box, Button, Container, Grid, Skeleton, Typography } from '@mui/material'
import { Banner, Buttons } from '../../components/molecules/home'
import { Navbar, ProductCard } from '../../components/molecules/global'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/slices/authSlice'
import { productActions, selectProduct } from '../../redux/slices/productSlice'
import { useGetDataQuery } from '../../redux/services/productApi'
import empty from '../../assets/images/empty-product.png'

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
  const userData = localStorage.getItem('User')
  const products = useSelector(selectProduct)
  const { data: productData, isSuccess: isProductSuccess } = useGetDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )

  const displayLogin = () => {
    if (userData) {
      return (
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      )
    } else {
      return (
        <Button variant="contained" onClick={login}>
          Login
        </Button>
      )
    }
  }

  const login = () => {
    navigate('/login')
  }

  const logout = () => {
    dispatch(authActions.clearCredentials())
    navigate('/login')
  }

  const fillProducts = () => {
    dispatch(productActions.setProducts(productData?.data))
  }

  useEffect(() => {
    fillProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData, isProductSuccess, products])

  return (
    <>
      <Navbar />
      <Banner />
      <Container maxWidth="xl" sx={{ my: 0, pb: '6rem', position: 'relative' }}>
        {displayLogin()}
        {userData ? <h5>{userData}</h5> : null}
        {isProductSuccess ? (
          products?.length > 0 ? (
            <>
              <Typography variant="h6" sx={{ fontSize: '16px' }}>
                Telusuri Kategori
              </Typography>
              <Buttons />
            </>
          ) : null
        ) : null}
        <Grid
          container
          columns={{ xs: 2, sm: 3, md: 4, lg: 6 }}
          mt={{ xs: '20px', md: '30px' }}
          spacing={3}
        >
          {isProductSuccess ? (
            products?.length === 0 ? (
              <Grid item xs={12} sx={{ mx: 'auto', textAlign: 'center' }}>
                <Box
                  component={'img'}
                  src={empty}
                  alt=""
                  sx={{ mx: 'auto', mb: '1rem', width: '180px', height: 'auto' }}
                />
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Looks like no one posted any products yet.
                </Typography>
                <Typography variant="body2">
                  Why don't you post one now? Click the button below.
                </Typography>
              </Grid>
            ) : (
              products?.map((item, index) => (
                <Grid item xs={1} key={index}>
                  <Box onClick={() => navigate(`/product/${item.id}`)}>
                    <ProductCard product={item} />
                  </Box>
                </Grid>
              ))
            )
          ) : (
            <>
              {[1, 2, 3].map((item, index) => (
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
