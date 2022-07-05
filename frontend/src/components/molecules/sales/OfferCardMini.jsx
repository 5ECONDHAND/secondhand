import { Avatar, Box, Grid, Stack, Typography } from '@mui/material'
import { toRupiah } from '../../../utils/functions'
import dummy from '../../../assets/images/dummy-image.jpg'

const OfferCardMini = ({ product }) => {
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
                <Avatar alt="" src={dummy} sx={{ width: 56, height: 56, borderRadius: '12px' }} />
                <Stack direction="column">
                  <Typography variant="body2" sx={{ color: '#8A8A8A', mb: 0.5 }}>
                    Penawaran Produk
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '500', mb: 0.5 }}>
                    {product.name ? product.name : 'Product Name'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '500', mb: 0.5 }}>
                    {product.price ? toRupiah(product.price) : 'Rp. 0'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    Ditawar {toRupiah(200000)}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
                {'20 Apr, 14:04'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default OfferCardMini
