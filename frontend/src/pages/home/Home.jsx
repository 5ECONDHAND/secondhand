import React from 'react'
import { Box, Container, Typography } from '@mui/material';
import Buttons from '../../components/buttons/Buttons';
const Home = () => {


  return (
    <>
      <Box sx={{ width: '100%', backgroundColor: 'red', height: '200px' }}>

      </Box>
      <Container maxWidth='xl' sx={{ marginTop: '40px' }}>
        <Typography variant='h6' sx={{ fontSize: '16px' }}>
          Telusuri Kategori
        </Typography>
        <Buttons />
      </Container>

    </>
  )
}

export default Home
