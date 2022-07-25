/* eslint-disable no-restricted-globals */
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
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/slices'
import { useNavigate } from 'react-router-dom'

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

const ProductMiniCard = ({ name, price, storageId }) => {
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
            src={`https://febesh5-dev.herokuapp.com/api/storages/${storageId}/preview`}
            sx={{ width: 56, height: 56, borderRadius: '12px' }}
          />
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {name}
            </Typography>
            <Typography variant="body2">{toRupiah(price)}</Typography>
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
  const navigate = useNavigate()
  const { handleClose, productId } = props
  const { enqueueSnackbar } = useSnackbar()
  const userActive = useSelector(selectUser)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateNegotiateAmount(values, setError)) {
      axios
        .post(
          'https://febesh5-dev.herokuapp.com/api/bids',
          {
            productId: productId,
            offeredPrice: values.amount,
          },
          {
            headers: {
              Authorization: `Bearer ${userActive.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log('from negotiate modal', response.data.data[0])
          enqueueSnackbar('Product offered', {
            variant: 'success',
            autoHideDuration: 1000,
          })
          navigate('/')
          // dispatch(productActions.setProductNotifs(response.data.data[0]))
          // dispatch(productActions.setProductNotifs({ notif: response.data.data[0] }))
          // dispatch(productActions.resetProductNotifs())
          // dispatch(
          //   productActions.setProductNotifications({
          //     error: false,
          //     message: 'Bid Created',
          //     data: response.data.data[0],
          //   })
          // )
        })
        .catch((e) => console.log(e))
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  useEffect(() => {
    if (error?.amount === '' && values.amount > 0) {
      handleClose()
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
            '&:hover': {
              background: '#631fa1',
            },
          }}
        >
          Kirim
        </Button>
      </Box>
    </>
  )
}

const NegotiateModal = (props) => {
  const { open, handleClose, productName, productPrice, storageId, productId } = props
  // console.log(productId)
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
          <ProductMiniCard name={productName} price={productPrice} storageId={storageId} />
          <NegotiateInput handleClose={handleClose} productId={productId} />
        </Box>
      </Modal>
    </>
  )
}

export default NegotiateModal
