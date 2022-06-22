import styled from '@emotion/styled'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'

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

const OfferStatusInput = (props) => {
  // const [error, setError] = useState({})
  const [values, setValues] = useState('sold')

  const { handleClose } = props
  const { enqueueSnackbar } = useSnackbar()

  const fireAlert = (msg = 'Success', variant) => {
    enqueueSnackbar(msg, { variant })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleClose()
    fireAlert('Status produk berhasil diperbarui', 'success')

    console.log('FORM VALUES', values)
  }

  const handleChange = (event) => {
    setValues(event.target.value)
  }

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
        onSubmit={(event) => handleSubmit(event)}
        sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}
      >
        <FormControl>
          <RadioGroup value={values} onChange={handleChange}>
            <FormControlLabel
              control={<Radio sx={{ '&.Mui-checked': { color: '#7126B5' } }} />}
              label="Berhasil Terjual"
              value="sold"
            />
            <FormLabel>
              <Typography variant="body2" sx={{ color: '#8A8A8A', ml: 4, mb: 2 }}>
                Kamu telah sepakat menjual produk ini kepada pembeli
              </Typography>
            </FormLabel>
            <FormControlLabel
              control={<Radio sx={{ '&.Mui-checked': { color: '#7126B5' } }} />}
              label="Batalkan Transaksi"
              value="cancelled"
            />
            <FormLabel>
              <Typography variant="body2" sx={{ color: '#8A8A8A', ml: 4, mb: 2 }}>
                Kamu membatalkan transaksi produk ini dengan pembeli
              </Typography>
            </FormLabel>
          </RadioGroup>
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

const OfferStatusModal = (props) => {
  const { open, handleClose } = props
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={ModalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FiX size={24} onClick={handleClose} />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: '500', mb: 2 }}>
            Perbarui status penjualan produkmu
          </Typography>
          <OfferStatusInput handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  )
}

export default OfferStatusModal
