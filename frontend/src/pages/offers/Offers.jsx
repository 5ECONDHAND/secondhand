import { Container, Grid, Typography } from '@mui/material'
import { BackButton, ProfileCard } from '../../components/molecules/global'
import OfferCard from '../../components/molecules/offers/OfferCard'

const Offers = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ pt: { xs: '1rem', md: '2rem' }, pb: '1rem' }}>
        <BackButton />
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          <Grid item xs={12} sm={12} md={8}>
            <ProfileCard />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
              Daftar Produkmu yang Ditawar
            </Typography>
            <OfferCard />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Offers