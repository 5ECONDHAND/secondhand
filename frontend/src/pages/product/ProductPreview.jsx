import { useEffect } from 'react'
import { Container, Grid, Skeleton } from '@mui/material'
import { Navbar, ProfileCard } from '../../components/molecules/global'
import { ProductDesc, ProductItem, ProductSlider } from '../../components/molecules/product'
import { useGetDataByIdQuery } from '../../redux/services/productApi'
import { selectUser } from '../../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import { selectProductPreview } from '../../redux/slices'

const ProductPreview = () => {
  // const { id } = useParams()
  // const dispatch = useDispatch()
  const previewProduct = useSelector(selectProductPreview)
  const user = useSelector(selectUser)
  let previewId = previewProduct?.data?.id
  let userToken = user?.accessToken

  const { data: previewProductData, isSuccess } = useGetDataByIdQuery({
    id: previewId,
    token: userToken,
  })

  useEffect(() => {
    console.log('from preview page: ', previewProductData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewProductData, isSuccess])

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: '1rem' }}>
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          {isSuccess && previewProductData !== null ? (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <ProductSlider productPhoto={previewProductData?.data[0]?.Photos} />
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <ProductItem type="seller" product={previewProductData?.data[0]} />
                </Grid>
                <Grid item xs={12}>
                  <ProfileCard
                    sellerName={previewProductData?.data[0]?.User.fullname}
                    sellerCity={previewProductData?.data[0]?.User.city}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <ProductDesc productDesc={previewProductData?.data[0]?.description} />
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
