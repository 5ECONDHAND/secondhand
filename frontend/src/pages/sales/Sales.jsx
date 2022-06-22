import { Box, Container, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ProductCard, ProfileCard } from '../../components/molecules/global'
import { CategoryMenu } from '../../components/molecules/sales'
import empty from '../../assets/images/empty.png'

const Sales = () => {
  const salesObj = {
    'Semua Produk': [2],
    Diminati: [],
    Terjual: [1, 2, 3]
  }
  const [dataCategory, setDataCategory] = useState('Semua Produk')
  let result = null
  for (const key in salesObj) {
    if (key === dataCategory) result = salesObj[key]
  }
  const navigate = useNavigate()
  const Empty = ({ dataCategory }) => {
    const display = dataCategory === 'Semua Produk' ? 'none' : 'flex'
    return (
      <Box sx={{ display: { display }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} mx='auto' mt={{ xs: '30px', sm: '30px', md: '0' }}>
        <img src={empty} alt="img-empty" width='276px' height='194px' />
        <Box sx={{ width: '55%', textAlign: 'center' }}>
          <Typography variant='body1'>Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok</Typography>
        </Box>
      </Box>
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
              {dataCategory === 'Diminati' || dataCategory === 'Terjual' ? '' : <Grid item xs={6} sm={4} md={4} >
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
              </Grid>}
              {result.length < 1 ? <Empty dataCategory={dataCategory} /> : result.map((item, index) => (
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
