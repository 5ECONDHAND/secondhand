import { Box, Stack, Typography } from '@mui/material'
import { toRupiah } from '../../../utils/functions'
import dummy from '../../../assets/images/dummy-image.jpg'

const ProductCard = ({ products }) => {
  return (
    <>
      <Box
        sx={{
          minWidth: 181,
          width: { xs: 181, sm: '100%' },
          height: { xs: 198, sm: '100%' },
          borderRadius: '0.25rem',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
        }}
      >
        <Stack direction="column" padding={1}>
          <Box
            component={'img'}
            src={dummy}
            alt=""
            sx={{
              width: '100%',
              height: { xs: 100, md: 120, lg: 132 },
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
              mt: '0.5rem',
            }}
          >
            {products.name ? products.name : 'Product Name'}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#8A8A8A', mt: '0.25rem', mb: '0.5rem' }}>
            {products.category ? products.category : 'Category'}
          </Typography>
          <Typography noWrap sx={{ fontSize: '0.875rem', fontWeight: '500' }}>
            {products.price ? toRupiah(products.price) : 'Rp. 0'}
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default ProductCard
