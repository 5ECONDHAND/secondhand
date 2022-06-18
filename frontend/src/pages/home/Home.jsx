import React from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { Banner, Buttons, CardItem } from '../../components/molecules/home'
import { FiPlus } from 'react-icons/fi'
import { Navbar } from '../../components/molecules'

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Container maxWidth="xl" sx={{ my: 0, position: 'relative' }}>
        <Typography variant="h6" sx={{ fontSize: '16px' }}>
          Telusuri Kategori
        </Typography>
        <Buttons />
        <Grid
          container
          columns={{ xs: 1, sm: 2, md: 4, lg: 6 }}
          mt={{ xs: '20px', md: '30px' }}
          spacing={2}
        >
          <Grid item xs={1}>
            <CardItem />
          </Grid>
          <Grid item xs={1}>
            <CardItem />
          </Grid>
          <Grid item xs={1}>
            <CardItem />
          </Grid>
          <Grid item xs={1}>
            <CardItem />
          </Grid>
          <Grid item xs={1}>
            <CardItem />
          </Grid>
          <Grid item xs={1}>
            <CardItem />
          </Grid>
          <Grid item xs={1}>
            <CardItem />
          </Grid>
          <Grid item xs={1}>
            <CardItem />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          size="large"
          sx={{
            position: 'fixed',
            bottom: '50px',
            left: '0',
            right: '0',
            zIndex: '10',
            margin: 'auto',
            width: '100px',
            borderRadius: '0.75rem',
            textTransform: 'none',
            background: '#7126B5',
            py: '10px',
            '&:hover': { bgcolor: '#631fa1' },
          }}
          startIcon={<FiPlus />}
        >
          Jual
        </Button>
      </Container>
    </>
  )
}

export default Home
