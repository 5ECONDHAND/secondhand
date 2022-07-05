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
            {productDesc ? productDesc : 'productDesc'}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum. */}
          </Typography>
        </Stack>
      </Paper>
    </>
  )
}

export default ProductDesc
