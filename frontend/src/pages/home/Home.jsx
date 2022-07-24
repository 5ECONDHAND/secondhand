/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Box, Container, Grid, Pagination, Skeleton, Stack, Typography } from '@mui/material'
import { Banner, CategoryFilter, SellCtaButton } from '../../components/molecules/home'
import { ProductCard } from '../../components/molecules/global'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetDataQuery } from '../../redux/services/productApi'
import { productActions, selectProduct, selectProductSearch, selectUser } from '../../redux/slices'
import { GiCardboardBox } from 'react-icons/gi'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [page, setPage] = useState(1)
  // const [count, setCount] = useState('')
  const { data: productData, isSuccess: isProductSuccess } = useGetDataQuery({
    refetchOnMountOrArgChange: true,
  })
  const userActive = useSelector(selectUser)
  const products = useSelector(selectProduct)
  const searchResult = useSelector(selectProductSearch)
  const [displayData, setDisplayData] = useState(products)
  const [dataCategory, setDataCategory] = useState('Semua')

  // const handlePage = (event, value) => {
  //   setPage(value)
  // }

  // const paginate = (page) => {
  //   switch (page) {
  //     case 1:
  //       setCount('skip=0&take=12')
  //       break
  //     case 2:
  //       setCount('skip=12&take=12')
  //       break
  //     case 3:
  //       setCount('skip=24&take=12')
  //       break
  //     case 4:
  //       setCount('skip=36&take=12')
  //       break
  //     case 5:
  //       setCount('skip=48&take=12')
  //       break
  //     default:
  //       break
  //   }
  // }

  const dataSwitch = (dataCategory) => {
    switch (dataCategory) {
      case 'Semua':
        setDisplayData(products.filter((item) => item.Transaction.status !== 'ACCEPTED'))
        break
      case dataCategory:
        setDisplayData(
          products?.filter(
            (item) =>
              item.Categories[0].Category.name === dataCategory &&
              item.Transaction.status !== 'ACCEPTED'
          )
        )
        break
      default:
        setDisplayData(products)
    }
  }

  const fillProducts = () => {
    dispatch(productActions.setProducts(productData?.data))
  }

  // useEffect(() => {
  //   if (products) {
  //     dataSwitch(dataCategory)
  //   }
  //   paginate(page)
  // }, [dataCategory, products, paginate])

  useEffect(() => {
    if (products) {
      dataSwitch(dataCategory)
    }
  }, [dataCategory, products])

  useEffect(() => {
    if (searchResult) {
      dispatch(productActions.setProducts(searchResult))
    } else {
      fillProducts()
    }
  }, [productData, isProductSuccess, products, searchResult])

  return (
    <>
      {/* <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Typography variant="base1">
          {userActive ? `Logged in as: ${userActive?.fullname}` : 'userNotActive'}
        </Typography>
      </Box> */}
      <Banner />
      <Container maxWidth="xl" sx={{ my: 0, pb: '6rem', position: 'relative' }}>
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
                <GiCardboardBox size={48} style={{ margin: '1rem auto' }} />
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Produk tidak ditemukan.
                </Typography>
                <Typography variant="body2">
                  Ingin menjual barang? Klik tombol di bawah ini.
                </Typography>
              </Grid>
            ) : (
              displayData?.map((item, index) => (
                <Grid item xs={1} key={index}>
                  <Box onClick={() => navigate(`/product/${item.id}`)}>
                    <ProductCard product={item} status={item.status} />
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
      {/* <Pagination
        count={5}
        color="primary"
        page={page}
        onChange={handlePage}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      /> */}
    </>
  )
}

export default Home
