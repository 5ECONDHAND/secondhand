import { useState, useEffect } from 'react'
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Navbar, ProductCard, ProfileCard } from '../../components/molecules/global'
import { CategoryMenu, OfferCardMini } from '../../components/molecules/sales'
import empty from '../../assets/images/empty.png'
import { useDispatch, useSelector } from 'react-redux'
import { productActions, selectProduct } from '../../redux/slices/productSlice'
import { useGetDataQuery } from '../../redux/services/productApi'
import { selectUser } from '../../redux/slices/userSlice'

const Sales = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: productData, isSuccess: isProductSuccess } = useGetDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const user = useSelector(selectUser)
  const products = useSelector(selectProduct)
  const [displayData, setDisplayData] = useState()
  const [dataCategory, setDataCategory] = useState('Semua Produk')

  const dataSwitch = (dataCategory) => {
    switch (dataCategory) {
      case 'Semua Produk':
        setDisplayData(products?.filter((item) => item.User.fullname === user.fullname))
        break
      case 'Diminati':
        setDisplayData(
          products?.filter(
            (item) => item.User.fullname === user.fullname && item.Transaction.status === 'DECIDING'
          )
        )
        break
      case 'Terjual':
        setDisplayData(
          products?.filter(
            (item) => item.User.fullname === user.fullname && item.Transaction.status === 'ACCEPTED'
          )
        )
        break
      default:
        setDisplayData(products?.filter((item) => item.User.fullname === user.name))
        break
    }
  }

  const fillProducts = () => {
    dispatch(productActions.setProducts(productData?.data))
  }

  useEffect(() => {
    if (isProductSuccess) {
      fillProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  useEffect(() => {
    if (products) {
      dataSwitch(dataCategory)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCategory, products])

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
            }}
            onClick={() => navigate('/add')}
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

  const checkRender = (displayData) => {
    if (displayData.length === 0) {
      return <Empty dataCategory={dataCategory} />
    }
    if (displayData.length >= 1) {
      if (dataCategory === 'Semua Produk' || dataCategory === 'Terjual') {
        return displayData.map((item, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <Box onClick={() => navigate(`/product/${item.id}`)}>
              <ProductCard product={item} />
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

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: '2rem', pb: '1rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          Daftar Jual Saya
        </Typography>
        <ProfileCard display="sales" sellerName={user?.fullname} sellerCity={user?.city} />
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
                  <Skeleton animation="wave" variant="rectangular" width={210} height={140} />
                  <Box sx={{ pt: 1 }}>
                    <Skeleton animation="wave" width={210} height={20} />
                    <Skeleton animation="wave" width="70%" height={20} />
                  </Box>
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
