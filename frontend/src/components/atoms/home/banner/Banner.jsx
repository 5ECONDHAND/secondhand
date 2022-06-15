import { Box, Typography } from '@mui/material'
import React from 'react'
import banner from '../../../../assets/images/banner-image.png'
const Banner = () => {
  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', gap: '16px' }}>
        <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }} sx={{ width: '236px', height: '224px', backgroundColor: '#B6D4A8', borderRadius: '0 20px 20px 0' }}></Box>
        <Box sx={{ width: '100%', height: '288px', backgroundColor: '#FFE9CA', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: { xs: '10px', sm: '10px', md: '10px', lg: '80px' } }}>
          <Box sx={{ width: { xs: '100%', md: '100%', lg: '50%' } }}>
            <Typography variant='h3'>Bulan Ramadhan  Banyak diskon!</Typography>
            <Typography variant='body1'>Diskon Hingga</Typography>
            <Typography variant='h4' color='error'>60%</Typography>
          </Box>
          <Box sx={{ width: '50%', display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, justifyContent: 'flex-end', position: 'relative' }}>
            <img src={banner} alt='banner' width='100%' height='288px' />
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                height: '100%',
                width: '37vw',
                background: 'linear-gradient(to right, #FFE9CA 5%, rgba(160, 110, 206, 0) 80%)',
              }}
            />
          </Box>
        </Box>
        <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }} sx={{ width: '236px', height: '224px', backgroundColor: '#E2D4F0', borderRadius: '20px 0 0 20px' }}></Box>
      </Box>
    </>
  )
}

export default Banner