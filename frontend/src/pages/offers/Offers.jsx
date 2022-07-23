import { Container, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { BackButton, ProfileCard } from '../../components/molecules/global'
import OfferCard from '../../components/molecules/offers/OfferCard'
import { selectProductActive } from '../../redux/slices/productSlice'
import { selectUser } from '../../redux/slices/userSlice'
const Offers = () => {
  const user = useSelector(selectUser)
  const productData = useSelector(selectProductActive)
  const buyerData = useLocation()
  console.log(productData)
  return (
    <>
      <Container maxWidth="lg" sx={{ pt: { xs: '1rem', md: '2rem' }, pb: '1rem' }}>
        <BackButton />
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          <Grid item xs={12} sm={12} md={8}>
            <ProfileCard sellerName={buyerData.state.user.User.fullname} sellerCity={buyerData.state.user.User.city} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
              Daftar Produkmu yang Ditawar
            </Typography>
            <OfferCard productData={productData} buyerData={buyerData.state} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Offers
