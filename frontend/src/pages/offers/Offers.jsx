import { Container, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import Loader from '../../components/atoms/global/Loader'
import { BackButton, Navbar, ProfileCard } from '../../components/molecules/global'
import OfferCard from '../../components/molecules/offers/OfferCard'
import { selectUser } from '../../redux/slices/userSlice'
const Offers = () => {
  const user = useSelector(selectUser)
  return (
    <>
      <Loader />
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: { xs: '1rem', md: '2rem' }, pb: '1rem' }}>
        <BackButton />
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          <Grid item xs={12} sm={12} md={8}>
            <ProfileCard sellerName={user?.fullname} sellerCity={user?.city} />
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
