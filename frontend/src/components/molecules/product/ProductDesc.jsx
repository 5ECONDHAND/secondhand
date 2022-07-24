import { Paper, Stack, Typography } from '@mui/material'

const ProductDesc = (props) => {
  const { productDesc } = props

  return (
    <>
      <Paper
        sx={{
          maxWidth: { md: 600, sm: 'auto', xs: '100%' },
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Stack direction="column" spacing={1} padding={2}>
          <Typography variant="body1" sx={{ fontWeight: '500' }}>
            {'Deskripsi'}
          </Typography>
          <Typography variant="body2" textAlign={'justify'} sx={{ color: '#8A8A8A' }}>
            {productDesc ? productDesc : 'product_desc'}
          </Typography>
        </Stack>
      </Paper>
    </>
  )
}

export default ProductDesc
