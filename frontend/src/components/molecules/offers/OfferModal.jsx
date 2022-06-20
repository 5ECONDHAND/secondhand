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
import dummy from '../../../assets/images/dummy-image.jpg'

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
          <Avatar alt="" src={''} sx={{ width: 56, height: 56, borderRadius: '12px' }} />
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {'Nama Pembeli'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {'kota'}
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
          <Avatar alt="" src={dummy} sx={{ width: 56, height: 56, borderRadius: '12px' }} />
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500', mb: 0.5 }}>
              {'Nama produk'}
            </Typography>
            <Typography variant="body2" sx={{ textDecoration: 'line-through', mb: 0.5 }}>
              {toRupiah(250000)}
            </Typography>
            <Typography variant="body2">Ditawar {toRupiah(200000)}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

const OfferInput = (props) => {
  // const [error, setError] = useState({})
  // const [values, setValues] = useState({
  //   amount: 0,
  // })

  const { handleClose, handleAccept } = props
  // const { enqueueSnackbar } = useSnackbar()

  // const fireAlert = (msg = 'Success', variant) => {
  //   enqueueSnackbar(msg, { variant })
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAccept()
    handleClose()
    // console.log('FORM VALUES', values)
    // console.log('ERROR STATE', error)
  }

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  // useEffect(() => {
  //   if (error?.amount === '' && values.amount > 0) {
  //     handleClose()
  //     fireAlert('Harga tawarmu berhasil dikirim ke penjual', 'success')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [error])

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(event) => handleSubmit(event)}
        sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}
      >
        {/* <FormControl sx={{ maxWidth: 'auto' }}>
          <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
            Harga Tawar
          </FormHelperText>
          <OutlinedInput
            error={error?.amount ? true : false}
            placeholder="Rp 0,00"
            type="number"
            value={values.amount === 0 ? '' : values.amount}
            onChange={handleChange('amount')}
            sx={{ borderRadius: '1rem' }}
          />
          <FormHelperText sx={{ m: 0 }}>{error?.amount}</FormHelperText>
        </FormControl> */}
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
  const { open, handleClose, handleAccept } = props
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
          <ProductMiniCard />
          <OfferInput handleClose={handleClose} handleAccept={handleAccept} />
        </Box>
      </Modal>
    </>
  )
}

export default OfferModal
