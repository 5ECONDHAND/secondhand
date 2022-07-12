import { useState, useEffect } from 'react'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import NegotiateModal from './NegotiateModal'
import { toRupiah } from '../../../utils/functions'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { productActions, selectProductWishlist } from '../../../redux/slices/productSlice'
import { selectUser } from '../../../redux/slices/userSlice'

const ProductItem = ({ product, type }) => {
  const location = useLocation()
  console.log('LOCATION', location)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  // redux state
  const userActive = useSelector(selectUser)
  const productWishlist = useSelector(selectProductWishlist)
  // local state
  const [wishlist, setWishlist] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const checkWishlist = () => {
    if (productWishlist.length > 0) {
      for (const x of productWishlist) {
        if (x.wish.id === product?.id) {
          setWishlist(true)
          return true
        }
      }
    }
    return false
  }

  const addWishlist = () => {
    setWishlist(true)
    if (userActive && product !== null) {
      dispatch(productActions.addProductWishlist({ wish: product }))
      enqueueSnackbar('Wishlist Added', {
        variant: 'success',
        autoHideDuration: 1000,
      })
    }
  }

  const removeWishlist = () => {
    setWishlist(false)
    if (userActive && product !== null) {
      dispatch(productActions.removeProductWishlist({ id: product?.id }))
      enqueueSnackbar('Wishlist Removed', {
        variant: 'warning',
        autoHideDuration: 1000,
      })
    }
  }

  useEffect(() => {
    checkWishlist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist])

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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {product?.name ? product?.name : 'productName'}
              </Typography>
              {type === 'buyer' && userActive && userActive?.fullname !== product?.User.fullname ? (
                wishlist ? (
                  <IconButton onClick={removeWishlist} sx={{ color: '#FF5050' }}>
                    <FaHeart size={20} />
                  </IconButton>
                ) : (
                  <IconButton onClick={addWishlist}>
                    <FaHeart size={20} />
                  </IconButton>
                )
              ) : null}
            </Stack>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {product?.Categories[0].Category.name
                ? product?.Categories[0].Category.name
                : 'productCategory'}
            </Typography>
            <Typography variant="body1" sx={{ my: '1rem' }}>
              {toRupiah(product?.price) || toRupiah(0)}
            </Typography>
            {type === 'seller' &&  ? (
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
                  onClick={() => navigate(`/add/${product?.id}`)}
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
        <NegotiateModal
          open={open}
          handleClose={handleClose}
          productName={product?.name}
          productPrice={product?.price}
          storageId={product?.Photos[0]?.storageId}
        />
      </Paper>
    </>
  )
}

export default ProductItem
