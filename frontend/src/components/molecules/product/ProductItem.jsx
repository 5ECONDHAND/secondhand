import { Button, Paper, Stack, Typography } from '@mui/material'

const ProductItem = () => {
  return (
    <>
      <Paper
        sx={{
          minWidth: { lg: 336, md: 'auto', xs: '100%' },
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Stack direction="column" justifyContent="flex-start" spacing={2} padding={2}>
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {'Jam Tangan Casio'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {'Aksesoris'}
            </Typography>
            <Typography variant="body1" sx={{ my: '1rem' }}>
              {'Rp 250.000'}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              size="large"
              disableElevation
              sx={{
                borderRadius: '1rem',
                textTransform: 'none',
                background: '#7126B5',
                border: '1px solid #7126B5',
                py: '10px',
                mb: '10px',
              }}
            >
              Terbitkan
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="large"
              disableElevation
              sx={{
                borderRadius: '1rem',
                textTransform: 'none',
                background: '#ffffff',
                color: '#000000',
                border: '1px solid #7126B5',
                py: '10px',
                '&:hover': { color: '#ffffff' },
              }}
            >
              Edit
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

export default ProductItem
