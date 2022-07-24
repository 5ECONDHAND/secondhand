import { useState } from 'react'
import { Avatar, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { toRupiah } from '../../../utils/functions'
import { FaWhatsapp } from 'react-icons/fa'
import OfferModal from './OfferModal'
import OfferStatusModal from './OfferStatusModal'
import dummy from '../../../assets/images/dummy-image.jpg'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/slices/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const OfferCard = (props) => {
  const { productData, buyerData } = props
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const userActive = useSelector(selectUser)
  const [accept, setAccept] = useState(false)
  const [open, setOpen] = useState(false)

  const handleAccept = () => {
    setAccept(true)
  }

  const handleDecline = () => {
    axios
      .delete(`https://febesh5-dev.herokuapp.com/api/bids/${productData?.id}`, {
        headers: {
          Authorization: `Bearer ${userActive?.accessToken}`,
        },
      })
      .then(() => {
        enqueueSnackbar('Tawaran ditolak', {
          variant: 'warning',
          autoHideDuration: 1000,
          preventDuplicate: true,
        })
        navigate('/sales')
      })
      .catch((e) => console.log(e))
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleCall = () => {
    window.open(`https://wa.me/${buyerData?.User?.phoneNo}`)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                alt=""
                src={
                  `https://febesh5-dev.herokuapp.com/api/storages/${productData?.Photos[0]?.storageId}/preview` ||
                  dummy
                }
                sx={{ width: 56, height: 56, borderRadius: '12px' }}
              />
              <Stack direction="column">
                <Typography variant="body2" sx={{ color: '#8A8A8A', mb: 0.5 }}>
                  Penawaran Produk
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500', mb: 0.5 }}>
                  {productData?.name}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500', mb: 0.5 }}>
                  {toRupiah(productData?.price)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Ditawar {toRupiah(buyerData?.offeredPrice)}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {/* {productData?.createdAt} */}
              {new Date(productData?.updatedAt).toISOString().substring(0, 10)}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Stack direction="row" spacing={2} justifyContent={mobile ? 'center' : 'flex-end'}>
            <Button
              onClick={accept ? handleOpen : handleDecline}
              fullWidth={mobile ? true : false}
              variant="contained"
              size="large"
              disableElevation
              sx={{
                width: mobile ? null : 158,
                borderRadius: '1.25rem',
                textTransform: 'none',
                background: '#ffffff',
                color: '#000000',
                border: '1px solid #7126B5',
                py: '0.5rem',
                '&:hover': { color: '#ffffff', background: '#631fa1' },
              }}
            >
              {accept ? 'Status' : 'Tolak'}
            </Button>
            <Button
              onClick={accept ? handleCall : handleOpen}
              fullWidth={mobile ? true : false}
              variant="contained"
              size="large"
              disableElevation
              endIcon={accept ? <FaWhatsapp /> : null}
              sx={{
                width: mobile ? null : 158,
                borderRadius: '1.25rem',
                textTransform: 'none',
                background: '#7126B5',
                border: '1px solid #7126B5',
                py: '0.5rem',
                '&:hover': {
                  background: '#631fa1',
                },
              }}
            >
              {accept ? 'Hubungi di' : 'Terima'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {accept ? (
        // modification product transaction state
        <OfferStatusModal
          open={open}
          handleClose={handleClose}
          buyerData={buyerData}
          productData={productData}
        />
      ) : (
        // reach to customer
        <OfferModal
          open={open}
          handleClose={handleClose}
          handleAccept={handleAccept}
          buyerData={buyerData}
          productData={productData}
        />
      )}
    </>
  )
}

export default OfferCard
