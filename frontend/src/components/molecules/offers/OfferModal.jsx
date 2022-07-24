import { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { toRupiah } from '../../../utils/functions'
// import dummy from '../../../assets/images/dummy-image.jpg'

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
  borderRadius: '1rem',
  bgcolor: 'background.paper',
  p: 4,
}

const ProductMiniCard = (props) => {
  const { product, buyer } = props
  return (
    <>
      <Paper
        sx={{
          minWidth: { lg: 336, md: 'auto', xs: '100%' },
          borderRadius: '1rem',
          background: '#EEEEEE',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: '500', p: 2, pb: 0 }}>
          Product Match
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          padding={2}
          pb={0}
        >
          <Avatar
            alt=""
            src={`https://febesh5-dev.herokuapp.com/api/storages/${buyer?.user?.User?.Photos[0]?.storageId}/preview`}
            sx={{ width: 56, height: 56, borderRadius: '12px' }}
          />
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {buyer?.User?.fullname}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {buyer?.User?.city}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          padding={2}
        >
          <Avatar
            alt=""
            src={`https://febesh5-dev.herokuapp.com/api/storages/${product?.Photos[0]?.storageId}/preview`}
            sx={{ width: 56, height: 56, borderRadius: '12px' }}
          />
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500', mb: 0.5 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ textDecoration: 'line-through', mb: 0.5 }}>
              {toRupiah(product.price)}
            </Typography>
            <Typography variant="body2">Ditawar {toRupiah(buyer?.offeredPrice)}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

const OfferInput = (props) => {
  const { handleClose, handleAccept, phoneNum } = props
  const handleSubmit = (event) => {
    event.preventDefault()
    window.open(`https://wa.me/${phoneNum}`)
    handleAccept()
    handleClose()
  }

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(event) => handleSubmit(event)}
        sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disableElevation
          endIcon={<FaWhatsapp />}
          sx={{
            borderRadius: '1rem',
            textTransform: 'none',
            background: '#7126B5',
            border: '1px solid #7126B5',
            '&:hover': {
              background: '#631fa1',
            },
            py: '14px',
            mt: 2,
          }}
        >
          Hubungi Via Whatsapp
        </Button>
      </Box>
    </>
  )
}

const OfferModal = (props) => {
  const { open, handleClose, handleAccept, productData, buyerData } = props
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={ModalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FiX size={24} onClick={handleClose} />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: '500', mb: 2 }}>
            Yeay kamu berhasil mendapat harga yang sesuai
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A8A8A', mb: 2 }}>
            Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
          </Typography>
          {/* top modal with data */}
          <ProductMiniCard product={productData} buyer={buyerData} />
          {/* bottom modal button*/}
          <OfferInput
            handleClose={handleClose}
            handleAccept={handleAccept}
            phoneNum={buyerData?.User?.phoneNo}
          />
        </Box>
      </Modal>
    </>
  )
}

export default OfferModal
