import { useState } from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import NegotiateModal from './NegotiateModal'
import { toRupiah } from '../../../utils/functions'
import { useNavigate } from 'react-router-dom'

const ProductItem = (props) => {
  const { productName, productCategory, productPrice, type, productId } = props
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

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
              {productName ? productName : 'productName'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {productCategory ? productCategory : 'productCategory'}
            </Typography>
            <Typography variant="body1" sx={{ my: '1rem' }}>
              {toRupiah(productPrice) || toRupiah(250000)}
            </Typography>
            {type === 'seller' ? (
              <>
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
                    '&:hover': {
                      background: '#631fa1',
                    },
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
                    '&:hover': { color: '#ffffff', background: '#631fa1' },
                  }}
                  onClick={() => navigate(`/add/${productId}`)}
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleOpen}
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
                    '&:hover': {
                      background: '#631fa1',
                    },
                  }}
                >
                  Saya tertarik dan ingin nego
                </Button>
              </>
            )}
          </Stack>
        </Stack>
        <NegotiateModal open={open} handleClose={handleClose} />
      </Paper>
    </>
  )
}

export default ProductItem
