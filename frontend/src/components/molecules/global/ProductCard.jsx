import { Box, Chip, Fade, Skeleton, Stack, Typography } from '@mui/material'
import { toRupiah } from '../../../utils/functions'
import empty_image from '../../../assets/images/empty-product-image.png'
import { useState } from 'react'

const ProductCard = ({ product, status }) => {
  const image_storage_url = `https://febesh5-dev.herokuapp.com/api/storages/${product?.Photos[0]?.storageId}/preview`
  const [loading, setLoading] = useState(true)

  const isStatusPublished = (status) => {
    if (status === 'PUBLISH') {
      return true
    } else if (status === 'DRAFT') {
      return false
    }
  }

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
          <Fade in={!loading}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component={'img'}
                src={product?.Photos?.length !== 0 ? image_storage_url : empty_image}
                onLoad={() => setLoading(false)}
                alt=""
                sx={{
                  display: loading ? 'none' : 'block',
                  position: 'relative',
                  width: '100%',
                  height: { xs: 100, md: 120, lg: 132 },
                  borderRadius: '0.25rem',
                  objectFit: 'cover',
                }}
              />
              {isStatusPublished(status) ? null : (
                <Chip
                  label="Unpublished"
                  color="secondary"
                  variant="filled"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    margin: '0.5rem',
                  }}
                />
              )}
            </Box>
          </Fade>

          <Skeleton variant="rect" animation="wave" height="100%" width="100%">
            <Box
              sx={{
                display: loading ? 'block' : 'none',
                width: '100%',
                height: { xs: 100, md: 120, lg: 132 },
                borderRadius: '0.25rem',
                objectFit: 'cover',
              }}
            />
          </Skeleton>

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
            {loading ? (
              <Skeleton animation="wave" />
            ) : product?.name ? (
              product.name
            ) : (
              'product_name'
            )}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#8A8A8A', mt: '0.25rem', mb: '0.5rem' }}>
            {loading ? (
              <Skeleton width="50%" animation="wave" />
            ) : product?.Categories ? (
              product.Categories[0].Category.name
            ) : (
              'product_category'
            )}
          </Typography>
          <Typography noWrap sx={{ fontSize: '0.875rem', fontWeight: '500' }}>
            {loading ? (
              <Skeleton width="60%" animation="wave" />
            ) : (
              toRupiah(product?.price ? product.price : 'product_price')
            )}
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default ProductCard
