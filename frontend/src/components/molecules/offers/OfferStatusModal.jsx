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
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../../redux/slices/userSlice'

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
  const { buyerData, productData } = props
  const userActive = useSelector(selectUser)
  const navigate = useNavigate()
  const [values, setValues] = useState('sold')

  const { handleClose } = props
  const { enqueueSnackbar } = useSnackbar()

  const fireAlert = (msg = 'Success', variant) => {
    enqueueSnackbar(msg, { variant })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleClose()
    switch (values) {
      case 'sold':
        axios.post('https://febesh5-dev.herokuapp.com/api/bids/accept', {
          productId: productData.id,
          userId: buyerData.user.User.id
        }, {
          headers: {
            Authorization: `Bearer ${userActive.accessToken}`
          }
        }).then(
          fireAlert('Status produk berhasil diperbarui', 'success'),
          navigate('/sales')
        ).catch(e => console.log(e))
        break
      case 'cancelled':
        axios.delete(`https://febesh5-dev.herokuapp.com/api/bids/${productData.id}`, {
          headers: {
            Authorization: `Bearer ${userActive.accessToken}`
          }
        }).then(
          fireAlert('Status produk berhasil diperbarui', 'success'),
          navigate('/sales')
        ).catch(e => console.log(e))
        break
      default:
        break;
    }


    console.log('FORM VALUES', values)
  }

  const handleChange = (event) => {
    setValues(event.target.value)
  }

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
          <OfferStatusInput handleClose={handleClose} productData={props.productData} buyerData={props.buyerData} />
        </Box>
      </Modal>
    </>
  )
}

export default OfferStatusModal
