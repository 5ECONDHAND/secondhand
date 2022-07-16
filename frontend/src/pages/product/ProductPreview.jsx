import { useEffect } from 'react'
import { Container, Grid, Skeleton } from '@mui/material'
import { Navbar, ProfileCard } from '../../components/molecules/global'
import { ProductDesc, ProductItem, ProductSlider } from '../../components/molecules/product'
import { useGetDataByIdQuery } from '../../redux/services/productApi'
import { selectUser } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { productActions, selectProductPreview } from '../../redux/slices'
import { useParams } from 'react-router-dom'

const ProductPreview = () => {
  const { productId } = useParams()
  console.log(productId)
  const dispatch = useDispatch()
  const previewProduct = useSelector(selectProductPreview)
  const userActive = useSelector(selectUser)

  const { data: previewProductData, isSuccess } = useGetDataByIdQuery({
    id: productId,
    token: userActive.accessToken,
  })

  useEffect(() => {
    dispatch(productActions.clearProductPreview()) // clears persist data
    console.log('from preview page FIRST TIME: ', previewProduct)
    if (isSuccess) {
      dispatch(productActions.setProductPreview(previewProductData)) // sets persist data
    }
    if (previewProduct !== null) {
      console.log('from preview page SECOND TIME: ', previewProduct)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewProductData, isSuccess])

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: '1rem' }}>
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          {previewProduct !== null ? (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <ProductSlider productPhoto={previewProduct?.data[0]?.Photos} />
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <ProductItem type="seller" product={previewProductData?.data[0]} />
                </Grid>
                <Grid item xs={12}>
                  <ProfileCard
                    sellerName={previewProduct?.data[0]?.User.fullname}
                    sellerCity={previewProduct?.data[0]?.User.city}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <ProductDesc productDesc={previewProduct?.data[0]?.description} />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={'100%'}
                  sx={{ borderRadius: 2 }}
                >
                  <ProductSlider />
                </Skeleton>
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={'100%'}
                    sx={{ borderRadius: 2 }}
                  >
                    <ProductItem />
                  </Skeleton>
                </Grid>
                <Grid item xs={12}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={'100%'}
                    sx={{ borderRadius: 2 }}
                  >
                    <ProfileCard />
                  </Skeleton>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={'100%'}
                  sx={{ borderRadius: 2 }}
                >
                  <ProductDesc />
                </Skeleton>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default ProductPreview
