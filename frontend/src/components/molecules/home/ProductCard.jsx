import { Box, Stack, Typography } from '@mui/material'
import dummy from '../../../assets/images/dummy-image.jpg'

const ProductCard = (props) => {
  const { productName, productCategory, productPrice } = props

  return (
    <>
      <Box
        sx={{
          minWidth: 181,
          width: { xs: 181, sm: '100%' },
          height: { xs: 198, sm: '100%' },
          borderRadius: '0.25rem',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Stack direction="column" padding={1}>
          <Box
            component={'img'}
            src={dummy}
            alt=""
            sx={{
              width: '100%',
              height: { xs: 100, md: 132 },
              borderRadius: '0.25rem',
              objectFit: 'cover',
            }}
          />
          <Typography
            noWrap
            sx={{
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: '500',
              mt: '0.25rem',
            }}
          >
            {productName}
            Jam Tangan Casio
          </Typography>
          <Typography sx={{ fontSize: '0.625rem', color: '#8A8A8A', mt: '0.25rem', mb: '0.5rem' }}>
            {productCategory}
            Aksesoris
          </Typography>
          <Typography noWrap sx={{ fontSize: '0.875rem', fontWeight: '500' }}>
            {productPrice}
            Rp 250.000
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default ProductCard
