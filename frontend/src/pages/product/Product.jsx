import { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Navbar, ProfileCard } from '../../components/molecules/global'
import { ProductDesc, ProductItem, ProductSlider } from '../../components/molecules/product'
import { useGetDataByIdQuery } from '../../redux/services/productApi'

const Product = () => {
  const { id } = useParams()
  const { data: productData, isSuccess } = useGetDataByIdQuery(id)

  useEffect(() => {
    if (isSuccess) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData])

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: '1rem' }}>
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          {isSuccess ? (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <ProductSlider />
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <ProductItem
                    type="buyer"
                    productName={productData?.data[0].name}
                    productCategory={productData?.data[0].Categories[0].Category.name}
                    productPrice={productData?.data[0].price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProfileCard
                    sellerName={productData?.data[0].User.fullname}
                    sellerCity={productData?.data[0].User.city}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <ProductDesc productDesc={productData?.data[0].description} />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                'LOADING'
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  'LOADING'
                </Grid>
                <Grid item xs={12}>
                  'LOADING'
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                'LOADING'
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Product
