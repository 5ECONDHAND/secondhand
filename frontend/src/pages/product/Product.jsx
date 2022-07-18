/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Container, Grid, Skeleton } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Navbar, ProfileCard } from '../../components/molecules/global'
import { ProductDesc, ProductItem, ProductSlider } from '../../components/molecules/product'
import { useGetDataByIdQuery } from '../../redux/services/productApi'
import { useDispatch, useSelector } from 'react-redux'
import { productActions, selectProductActive } from '../../redux/slices'
import Loader from '../../components/atoms/global/Loader'

const Product = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const productActive = useSelector(selectProductActive)

  const { data: productData, isSuccess } = useGetDataByIdQuery({
    id: productId,
  })

  const fillProductActive = () => {
    dispatch(productActions.setProductActive(productData?.data[0]))
  }

  useEffect(() => {
    if (isSuccess) {
      fillProductActive()
    }
  }, [productData, isSuccess])

  const CustomSkeleton = ({ children, width, maxWidth, height, maxHeight }) => {
    return (
      <Skeleton
        variant="rect"
        animation="wave"
        sx={{
          borderRadius: 2,
          display: 'flex',
          width: width ? width : '100%',
          maxWidth: maxWidth ? maxWidth : '100%',
          height: height ? height : '100%',
          maxHeight: maxHeight ? maxHeight : '100%',
        }}
      >
        {children}
      </Skeleton>
    )
  }

  return (
    <>
      <Loader />
      <Navbar />
      <Container maxWidth="lg" sx={{ py: '1rem' }}>
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          {isSuccess && productData !== null && productActive !== null ? (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <ProductSlider product={productActive} />
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <ProductItem type="buyer" product={productData?.data[0]} />
                </Grid>
                <Grid item xs={12}>
                  <ProfileCard
                    sellerName={productActive?.User?.fullname}
                    sellerCity={productActive?.User?.city}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <ProductDesc productDesc={productActive?.description} />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <CustomSkeleton height={'436px'}>
                  <ProductSlider />
                </CustomSkeleton>
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <CustomSkeleton>
                    <ProductItem />
                  </CustomSkeleton>
                </Grid>
                <Grid item xs={12}>
                  <CustomSkeleton>
                    <ProfileCard />
                  </CustomSkeleton>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <CustomSkeleton>
                  <ProductDesc />
                </CustomSkeleton>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Product
