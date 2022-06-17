import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Banner, Buttons, CardItem } from '../../components/atoms/home';
import { FiPlus } from 'react-icons/fi';
import { Navbar } from '../../components/molecules';


const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Container maxWidth='xl' sx={{ marginY: '40px', position: 'relative' }}>
        <Typography variant='h6' sx={{ fontSize: '16px' }}>
          Telusuri Kategori
        </Typography>
        <Buttons />
        <Grid container columns={{ xs: 1, sm: 2, md: 4, lg: 6 }} mt={{ xs: '20px', md: '30px' }} spacing={2}>
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
        <Button sx={{
          backgroundColor: '#7126B5',
          color: 'white',
          position: 'fixed',
          bottom: '50px',
          left: '0',
          right: '0',
          margin: 'auto',
          zIndex: '10',
          borderRadius: '12px',
          padding: '8px 15px',
          ':hover': {
            bgcolor: '#631fa1',
            color: 'white'
          },
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
