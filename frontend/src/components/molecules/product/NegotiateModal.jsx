import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { FiX } from 'react-icons/fi'
import { validateNegotiateAmount } from '../../../utils/validators'
import { useSnackbar } from 'notistack'
import { toRupiah } from '../../../utils/functions'

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
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          padding={2}
        >
          <Avatar
            alt="A"
            src={'gambar produk'}
            sx={{ width: 56, height: 56, borderRadius: '12px' }}
          />
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {'Nama produk'}
            </Typography>
            <Typography variant="body2">{toRupiah(250000)}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

const NegotiateInput = (props) => {
  const [error, setError] = useState({})
  const [values, setValues] = useState({
    amount: 0,
  })

  const { handleClose } = props
  const { enqueueSnackbar } = useSnackbar()

  const fireAlert = (msg = 'Success', variant) => {
    enqueueSnackbar(msg, { variant })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    validateNegotiateAmount(values, setError)

    // console.log('FORM VALUES', values)
    // console.log('ERROR STATE', error)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  useEffect(() => {
    if (error?.amount === '' && values.amount > 0) {
      handleClose()
      fireAlert('Harga tawarmu berhasil dikirim ke penjual', 'success')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(event) => handleSubmit(event)}
        sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}
      >
        <FormControl sx={{ maxWidth: 'auto' }}>
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
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disableElevation
          sx={{
            borderRadius: '1rem',
            textTransform: 'none',
            background: '#7126B5',
            border: '1px solid #7126B5',
            py: '14px',
            mt: 2,
          }}
        >
          Kirim
        </Button>
      </Box>
    </>
  )
}

const NegotiateModal = (props) => {
  const { open, handleClose } = props
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={ModalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FiX size={24} onClick={handleClose} />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: '500', mb: 2 }}>
            Masukkan Harga Tawarmu
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A8A8A', mb: 2 }}>
            Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi
            penjual.
          </Typography>
          <ProductMiniCard />
          <NegotiateInput handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  )
}

export default NegotiateModal
