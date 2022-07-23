/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ProductCard, ProfileCard } from '../../components/molecules/global'
import { CategoryMenu, OfferCardMini } from '../../components/molecules/sales'
import empty from '../../assets/images/empty.png'
import { useDispatch, useSelector } from 'react-redux'
import { productActions, selectProduct } from '../../redux/slices/productSlice'
import { useGetProductsSellerQuery } from '../../redux/services/productApi'
import { selectUser } from '../../redux/slices/userSlice'
import { useSnackbar } from 'notistack'
import { isProductMaxed } from '../../utils/functions'
import { useGetUserQuery } from '../../redux/services/userApi'

const Sales = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userActive = useSelector(selectUser)
  const { data: productSellerData, isSuccess: isProductSellerSuccess } = useGetProductsSellerQuery(
    userActive.accessToken,
    { refetchOnMountOrArgChange: true }
  )
  const { data: userData } = useGetUserQuery(userActive.accessToken, {
    refetchOnMountOrArgChange: true,
  })
  const products = useSelector(selectProduct)
  const [displayData, setDisplayData] = useState()
  const [dataCategory, setDataCategory] = useState('Semua Produk')
  const { enqueueSnackbar } = useSnackbar()

  const dataSwitch = (dataCategory) => {
    switch (dataCategory) {
      case 'Semua Produk':
        setDisplayData(products?.filter((item) => item.User?.fullname === userActive?.fullname))
        break
      case 'Diminati':
        setDisplayData(
          products?.filter(
            (item) =>
              item.User?.fullname === userActive?.fullname &&
              item.Transaction?.status === 'DECIDING'
          )
        )
        break
      case 'Terjual':
        setDisplayData(
          products?.filter(
            (item) =>
              item.User?.fullname === userActive?.fullname &&
              item.Transaction?.status === 'ACCEPTED'
          )
        )
        break
      default:
        setDisplayData(products?.filter((item) => item.User?.fullname === userActive?.name))
        break
    }
  }

  const checkRender = (displayData) => {
    if (displayData.length === 0) {
      return <Empty dataCategory={dataCategory} />
    }
    if (displayData.length >= 1) {
      if (dataCategory === 'Semua Produk' || dataCategory === 'Terjual') {
        return displayData.map((item, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <Box onClick={() => navigate(`/preview/${item.id}`)}>
              <ProductCard product={item} status={item?.status} />
            </Box>
          </Grid>
        ))
      } else if (dataCategory === 'Diminati') {
        return displayData.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Box onClick={() => navigate(`/offers/${item.id}`)}>
              <OfferCardMini product={item} />
            </Box>
          </Grid>
        ))
      }
    }
  }

  useEffect(() => {
    dispatch(productActions.clearProducts())
    if (isProductSellerSuccess) {
      dispatch(productActions.setProducts(productSellerData?.data))
    }
  }, [products, productSellerData, isProductSellerSuccess])

  useEffect(() => {
    if (products) {
      dataSwitch(dataCategory)
    }
  }, [dataCategory, products])

  const sellerProductCount = products?.filter(
    (item) => item.User.fullname === userActive.fullname
  ).length

  const handleAddProduct = () => {
    if (isProductMaxed(sellerProductCount)) {
      enqueueSnackbar('Maximum Product Stock', {
        variant: 'error',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    } else {
      navigate('/add')
    }
  }

  const ProductAddArea = () => {
    return (
      <>
        <Grid item xs={6} sm={4} md={4}>
          <Box
            className="dropzone-border"
            sx={{
              borderRadius: '0.25rem',
              minWidth: 181,
              minHeight: 181,
              width: { xs: '100%' },
              height: { xs: 198, sm: '100%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8A8A8A',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f2f2f2',
              },
            }}
            onClick={handleAddProduct}
          >
            <FiPlus size={24} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Tambah Produk
            </Typography>
          </Box>
        </Grid>
      </>
    )
  }

  const Empty = ({ dataCategory }) => {
    const display = dataCategory === 'Semua Produk' ? 'none' : 'flex'
    return (
      <Box
        sx={{
          display: { display },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        mx="auto"
        pt={{ xs: '30px', sm: '30px', md: '' }}
      >
        <img src={empty} alt="img-empty" width="276px" height="auto" />
        <Box sx={{ width: '55%', textAlign: 'center' }}>
          <Typography variant="body1">
            Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: '2rem', pb: '1rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          Daftar Jual Saya
        </Typography>
        <ProfileCard
          profile={userData?.data[0]}
          display="sales"
          sellerName={userActive?.fullname}
          sellerCity={userActive?.city}
        />
        <Grid
          container
          spacing={2}
          mt={2}
          sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}
        >
          <Grid item xs={12} sm={12} md={3}>
            <CategoryMenu setDataCategory={setDataCategory} />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Grid container spacing={3}>
              {dataCategory === 'Diminati' || dataCategory === 'Terjual' ? null : (
                <ProductAddArea />
              )}
              {displayData ? (
                checkRender(displayData)
              ) : (
                <Grid item xs={6} sm={4} md={4}>
                  <Skeleton animation="wave" variant="rectangular" width="100%" height="100%">
                    <ProductCard />
                  </Skeleton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Sales
