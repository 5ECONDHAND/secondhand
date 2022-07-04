import { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
import { Banner, CategoryFilter, SellCtaButton } from '../../components/molecules/home'
import { Navbar, ProductCard } from '../../components/molecules/global'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/slices/authSlice'
import { productActions, selectProduct } from '../../redux/slices/productSlice'
import { useGetDataQuery } from '../../redux/services/productApi'
import empty from '../../assets/images/empty-product.png'
import { selectUser, userActions } from '../../redux/slices/userSlice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: productData, isSuccess: isProductSuccess } = useGetDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const userActive = useSelector(selectUser)
  const products = useSelector(selectProduct)
  const [displayData, setDisplayData] = useState(products)
  const [dataCategory, setDataCategory] = useState('Semua')

  const dataSwitch = (dataCategory) => {
    switch (dataCategory) {
      case 'Semua':
        setDisplayData(products)
        break
      case dataCategory:
        setDisplayData(
          products?.filter((item) => item.Categories[0].Category.name === dataCategory)
        )
        break
      default:
        setDisplayData(products)
    }
  }

  const displayLogin = () => {
    if (userActive) {
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
    dispatch(userActions.clearCredentials())
    navigate('/login')
  }

  const fillProducts = () => {
    dispatch(productActions.setProducts(productData?.data))
  }

  useEffect(() => {
    if (products) {
      dataSwitch(dataCategory)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCategory, products])

  useEffect(() => {
    if (isProductSuccess) {
      fillProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData, isProductSuccess, products])

  return (
    <>
      <Navbar />
      <Banner />
      <Container maxWidth="xl" sx={{ my: 0, pb: '6rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          {displayLogin()}
          {userActive ? <>{<h5>'Name',{userActive.fullname || 'null'}</h5>}</> : null}
        </div>

        {isProductSuccess ? (
          products?.length > 0 ? (
            <>
              <Typography variant="h6" sx={{ fontSize: '16px' }}>
                Telusuri Kategori
              </Typography>
              <CategoryFilter setDataCategory={setDataCategory} />
            </>
          ) : null
        ) : (
          <>
            <Typography variant="h6">
              <Skeleton width={200} />
            </Typography>
            <Stack direction={'row'} spacing={2}>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} width={100} height={64} />
              ))}
            </Stack>
          </>
        )}
        <Grid
          container
          columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          mt={{ xs: '20px', md: 0 }}
          spacing={3}
        >
          {isProductSuccess ? (
            displayData?.length === 0 ? (
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
              displayData?.map((item, index) => (
                <Grid item xs={1} key={index}>
                  <Box onClick={() => navigate(`/product/${item.id}`)}>
                    <ProductCard product={item} />
                  </Box>
                </Grid>
              ))
            )
          ) : (
            <>
              {[...Array(4)].map((_, index) => (
                <Grid item xs={1} key={index}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                      borderRadius: 2,
                      width: { xs: 181, sm: '100%' },
                      height: { xs: 198 },
                    }}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
        <SellCtaButton />
      </Container>
    </>
  )
}

export default Home
