import { Box, Container, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ProductCard, ProfileCard } from '../../components/molecules/global'
import { CategoryMenu, OfferCardMini } from '../../components/molecules/sales'
import empty from '../../assets/images/empty.png'
import { useGetProductDataQuery } from '../../redux/services/productApi'

const Sales = () => {

  const { data: productData, isSuccess: isProductSuccess } = useGetProductDataQuery()
  const [allProduct, setAllProduct] = useState()
  const [wantedProduct, setWantedProduct] = useState()
  const [soldProduct, setSoldProduct] = useState()

  // console.log(productData);
  const userSeller = JSON.parse(localStorage.getItem('user')).user
  useEffect(() => {
    if (isProductSuccess) {
      setAllProduct(productData.data.filter(item => item.User.fullname === userSeller))
      setWantedProduct(productData.data.filter(item => item.User.fullname === userSeller && item.Transaction.status === 'DECIDING'))
      setSoldProduct(productData.data.filter(item => item.User.fullname === userSeller && item.Transaction.status === 'ACCEPTED'))
    }
  }, [userSeller, productData, isProductSuccess])
  // console.log(productData.data[0].User.fullname === userSeller);


  const salesObj = {
    'Semua Produk': allProduct,
    Diminati: wantedProduct,
    Terjual: soldProduct,
  }

  const [dataCategory, setDataCategory] = useState('Semua Produk')
  const navigate = useNavigate()

  // mengambil key dari object dan storing value ke result
  let result = null
  for (const key in salesObj) {
    if (key === dataCategory) result = salesObj[key]
  }
  console.log(result);

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
        mt={{ xs: '30px', sm: '30px', md: '0' }}
      >
        <img src={empty} alt="img-empty" width="276px" height="194px" />
        <Box sx={{ width: '55%', textAlign: 'center' }}>
          <Typography variant="body1">
            Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
          </Typography>
        </Box>
      </Box>
    )
  }

  const checkRender = (result) => {
    if (result.length >= 1) {
      if (dataCategory !== 'Diminati') {
        return (
          result.map((item, index) => (
            <Grid item xs={6} sm={4} md={4} key={index}>
              <ProductCard
                productName={item.name}
                productCategory={item.Categories[0]}
                productPrice={item.price} />
            </Grid>
          ))
        )
      }
      return (
        result.map((item, index) => (
          <Grid item xs={12} key={index}>
            <OfferCardMini
              productName={item.name}
              productCategory={item.Categories[0]}
              productPrice={item.price} />
          </Grid>
        ))
      )
    }
    return (
      <Empty dataCategory={dataCategory} />
    )

  }

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: '2rem', pb: '1rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          Daftar Jual Saya
        </Typography>
        <ProfileCard display="sales" />
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
              {/* tambah produck card */}
              {dataCategory === 'Diminati' || dataCategory === 'Terjual' ? (
                ''
              ) : (
                <Grid item xs={6} sm={4} md={4}>
                  <Box
                    className="dropzone-border"
                    sx={{
                      borderRadius: '0.25rem',
                      minWidth: 181,
                      minHeight: 181,
                      width: { xs: 181, sm: '100%' },
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
              )}
              {/* images when empty */}
              {result ? checkRender(result) : <Grid item xs={6} sm={4} md={4}>Loading</Grid>}
              {/* {result.length < 1 ? (<Empty dataCategory={dataCategory} />) :
                (
                  <>
                    {dataCategory === 'Diminati' ? (
                      <Grid item xs={12}>
                        <OfferCardMini />
                      </Grid>
                    ) : (
                      result.map((item, index) => (
                        <Grid item xs={6} sm={4} md={4} key={index}>
                          <ProductCard />
                        </Grid>
                      ))
                    )}
                  </>
                )} */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Sales
