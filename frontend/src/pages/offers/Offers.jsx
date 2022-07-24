import { Container, Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { BackButton, ProfileCard } from '../../components/molecules/global'
import OfferCard from '../../components/molecules/offers/OfferCard'
import {
  useGetTransactionByIdQuery,
  useGetTransactionsQuery,
} from '../../redux/services/productApi'

const Offers = () => {
  const { id } = useParams()
  const { data: transactionData } = useGetTransactionByIdQuery({ id })
  const { data: transactionsData } = useGetTransactionsQuery()

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: { xs: '1rem', md: '2rem' }, pb: '1rem' }}>
        <BackButton />
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          <Grid item xs={12} sm={12} md={8}>
            <ProfileCard
              profile={transactionData?.data[0]?.Users[0]?.User}
              sellerName={transactionData?.data[0]?.Users[0]?.User?.fullname}
              sellerCity={transactionData?.data[0]?.Users[0]?.User?.city}
              // profile={buyerData.state.user.User}
              // sellerName={buyerData.state.user.User.fullname}
              // sellerCity={buyerData.state.user.User.city}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
              Daftar Produkmu yang Ditawar
            </Typography>
            <OfferCard
              productData={transactionData?.data[0]?.Product}
              buyerData={transactionData?.data[0]?.Users[0]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Offers
