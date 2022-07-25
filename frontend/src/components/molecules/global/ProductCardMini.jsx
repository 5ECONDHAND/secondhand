import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import { toRupiah } from '../../../utils/functions'
import { useNavigate } from 'react-router-dom'
import dummy from '../../../assets/images/dummy-image.jpg'

const ProductCardMini = ({ product, index }) => {
  const image_storage_url = `https://febesh5-dev.herokuapp.com/api/storages/${product?.Photos[0]?.storageId}/preview`
  const navigate = useNavigate()
  return (
    <>
      <Box
        sx={{
          borderRadius: '0.25rem',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          p: 2,
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  alt=""
                  src={image_storage_url || dummy}
                  sx={{ width: 56, height: 56, borderRadius: '12px' }}
                />
                <Stack direction="column">
                  <Typography variant="body2" sx={{ color: '#8A8A8A', mb: 0.5 }}>
                    Product wishlist {index + 1}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '500', mb: 0.5 }}>
                    {product ? product?.name : 'product_name'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '500', mb: 0.5 }}>
                    {product ? toRupiah(product?.price) : 'product_price'}
                  </Typography>
                </Stack>
              </Stack>
              <Button
                variant="contained"
                disableElevation
                size="small"
                sx={{
                  borderRadius: '0.75rem',
                  textTransform: 'none',
                  border: '1px solid #7126B5',
                  background: '#ffffff',
                  color: '#000000',
                  '&:hover': {
                    background: '#7126B5',
                    color: '#ffffff',
                  },
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ProductCardMini
