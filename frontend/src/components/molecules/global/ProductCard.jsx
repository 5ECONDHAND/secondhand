import { Box, Stack, Typography } from '@mui/material'
import { toRupiah } from '../../../utils/functions'
import empty_image from '../../../assets/images/empty-product-image.png'

const ProductCard = ({ product }) => {
  const image_storage_url = `https://febesh5-dev.herokuapp.com/api/storages/${product?.Photos[0]?.storageId}/preview`

  return (
    <>
      <Box
        sx={{
          minWidth: 181,
          width: { xs: '100%' },
          height: { xs: '100%' },
          borderRadius: '0.25rem',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
        }}
      >
        <Stack direction="column" padding={1}>
          <Box
            component={'img'}
            src={product?.Photos?.length !== 0 ? image_storage_url : empty_image}
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
            {product?.name ? product.name : 'Product Name'}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#8A8A8A', mt: '0.25rem', mb: '0.5rem' }}>
            {product?.Categories ? product.Categories[0].Category.name : 'Category'}
          </Typography>
          <Typography noWrap sx={{ fontSize: '0.875rem', fontWeight: '500' }}>
            {product?.price ? toRupiah(product.price) : 'Rp. 0'}
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default ProductCard
