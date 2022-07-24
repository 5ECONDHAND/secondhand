import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { FiFrown } from 'react-icons/fi'
import { ProductCardMini } from '../../components/molecules/global'
import { useSelector } from 'react-redux'
import { selectProductWishlist } from '../../redux/slices/productSlice'

const Wishlist = () => {
  const productWishlist = useSelector(selectProductWishlist)

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: '2rem', pb: '1rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          Wishlist Saya
        </Typography>
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            width: '100%',
            borderRadius: '1rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {productWishlist.length !== 0 ? (
                productWishlist.map((product, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <ProductCardMini product={product?.wish} index={index} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        fontWeight: 500,
                        pr: 1,
                      }}
                    >
                      Belum ada produk yang tersimpan di wishlist
                    </Typography>
                    <FiFrown size={32} />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default Wishlist
