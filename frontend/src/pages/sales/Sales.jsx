import { Box, Container, Grid, Typography } from '@mui/material'
import { FiPlus } from 'react-icons/fi'
import { ProductCard, ProfileCard } from '../../components/molecules/global'
import { CategoryMenu } from '../../components/molecules/sales'

const Sales = () => {
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
            <CategoryMenu />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Grid container spacing={3}>
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
                >
                  <FiPlus size={24} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Tambah Produk
                  </Typography>
                </Box>
              </Grid>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <Grid item xs={6} sm={4} md={4} key={index}>
                  <ProductCard />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Sales
