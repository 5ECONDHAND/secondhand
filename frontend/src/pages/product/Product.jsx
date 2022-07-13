import { useEffect, useState } from 'react'
import { Container, Grid, Skeleton } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar, ProfileCard } from '../../components/molecules/global'
import { ProductDesc, ProductItem, ProductSlider } from '../../components/molecules/product'
import { useGetDataByIdQuery } from '../../redux/services/productApi'
import { selectUser } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { productActions, selectProductPreview } from '../../redux/slices'
import { validateProduct } from '../../utils/validators'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const Product = () => {
  const { id } = useParams()
  const previewProduct = useSelector(selectProductPreview)
  const user = useSelector(selectUser)
  const [previewProductData, setPreviewProductData] = useState()
  let previewId = previewProduct?.data?.id
  let userToken = user?.accessToken

  const { data: productData, isSuccess } = useGetDataByIdQuery({ id: id, token: userToken }) //id from url
  const fetchData = useGetDataByIdQuery({ id: previewId, token: userToken }) // id from product
  console.log(user.accessToken)
  // console.log(previewProductData.data)

  // useEffect(() => {
  //   setPreviewProductData(fetchData)
  // }, [fetchData])

  function checkType() {
    if (productData.error) {
      return 'seller'
    } else {
      if (productData?.data[0]?.User.fullname === user.fullname) {
        return 'seller'
      } else {
        return 'buyer'
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData])
  // console.log(productData?.data[0].Photos)

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: '1rem' }}>
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          {isSuccess ? (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <ProductSlider productPhoto={productData?.error ? previewProductData?.data?.data[0]?.Photos : productData?.data[0].Photos} />
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <ProductItem
                    type={checkType()}
                    productName={productData?.error ? previewProduct?.data.name : productData?.data[0]?.name}
                    productCategory={productData?.error ? previewProduct?.data.categoryId : productData?.data[0]?.Categories[0].Category.name}
                    productPrice={productData?.error ? previewProduct?.data.price : productData?.data[0]?.price}
                    productId={productData?.error ? previewProduct?.data.id : productData?.data[0]?.id}
                    storageId={productData?.error ? previewProduct?.files : productData?.data[0]?.Photos[0]?.storageId}
                    productDesc={productData?.error ? previewProduct?.data.description : productData?.data[0]?.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProfileCard
                    sellerName={productData?.error ? user.fullname : productData?.data[0]?.User.fullname}
                    sellerCity={productData?.error ? user.city : productData?.data[0]?.User.city}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <ProductDesc productDesc={productData?.error ? previewProduct.data.description : productData?.data[0]?.description} />
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

export default Product
