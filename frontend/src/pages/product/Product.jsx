import { Container, Grid } from '@mui/material'
import React from 'react'
import {
  ProductDesc,
  ProductItem,
  ProductSlider,
  ProfileCard,
} from '../../components/molecules/product'

const Product = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: '1rem' }}>
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          <Grid item xs={12} sm={6} md={6.4}>
            <ProductSlider />
          </Grid>
          <Grid item xs={12} sm={6} md={3.6}>
            <Grid item xs={12} sx={{ mb: '1rem' }}>
              <ProductItem type="buyer" />
            </Grid>
            <Grid item xs={12}>
              <ProfileCard />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={10}>
            <ProductDesc />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Product
