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
import { useSnackbar } from 'notistack'
import axios from 'axios'

const Product = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const previewProduct = useSelector(selectProductPreview)
  // const { data: productData, isSuccess } = useGetDataByIdQuery(id)
  const user = useSelector(selectUser)
  let previewId = previewProduct?.data?.id
  let userToken = user?.accessToken

  const { data: productData, isSuccess } = useGetDataByIdQuery({ id: id, token: userToken }) //id from url
  const previewProductData = useGetDataByIdQuery({ id: previewId, token: userToken }) // id from product
  console.log(productData)

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
  // const productActive = useSelector(selectProductActive)

  const fillProductActive = () => {
    dispatch(productActions.setProductActive(productData?.data[0]))
  }

  useEffect(() => {
    if (isSuccess) {
      fillProductActive()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData, isSuccess])
  // console.log(productData?.data[0].Photos)

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: '1rem' }}>
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          {isSuccess && productData !== null ? (
            <>
              <Grid item xs={12} sm={6} md={6.4}>
                <ProductSlider productPhoto={productData?.data[0]?.Photos} />
                {/* <ProductSlider
                  productPhoto={
                    productData?.error
                      ? previewProductData?.data?.data[0]?.Photos
                      : productData?.data[0].Photos
                  }
                /> */}
              </Grid>
              <Grid item xs={12} sm={6} md={3.6}>
                <Grid item xs={12} sx={{ mb: '1rem' }}>
                  <ProductItem
                    type={checkType()}
                    productName={
                      productData?.error ? previewProduct?.data.name : productData?.data[0]?.name
                    }
                    productCategory={
                      productData?.error
                        ? previewProduct?.data.categoryId
                        : productData?.data[0]?.Categories[0].Category.name
                    }
                    productPrice={
                      productData?.error ? previewProduct?.data.price : productData?.data[0]?.price
                    }
                    productId={
                      productData?.error ? previewProduct?.data.id : productData?.data[0]?.id
                    }
                    storageId={
                      productData?.error
                        ? previewProduct?.files
                        : productData?.data[0]?.Photos[0]?.storageId
                    }
                    productDesc={
                      productData?.error
                        ? previewProduct?.data.description
                        : productData?.data[0]?.description
                    }
                    // type={
                    //   productData?.data[0].User.fullname === user?.fullname ? 'seller' : 'buyer'
                    // }
                    product={productData?.data[0]}
                    // type={productData?.data[0].User.fullname === user.fullname ? 'seller' : 'buyer'}
                    // productName={productData?.data[0].name}
                    // productCategory={productData?.data[0].Categories[0].Category.name}
                    // productPrice={productData?.data[0].price}
                    // productId={productData?.data[0].id}
                    // storageId={productData?.data[0]?.Photos[0]?.storageId}
                    // product={productData?.data[0]}
                    // productName={productData?.data[0].name}
                    // productCategory={productData?.data[0].Categories[0].Category.name}
                    // productPrice={productData?.data[0].price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProfileCard
                    sellerName={
                      productData?.error ? user.fullname : productData?.data[0]?.User.fullname
                    }
                    sellerCity={productData?.error ? user.city : productData?.data[0]?.User.city}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <ProductDesc
                  productDesc={
                    productData?.error
                      ? previewProduct.data.description
                      : productData?.data[0]?.description
                  }
                />
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
