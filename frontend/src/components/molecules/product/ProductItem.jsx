import { useEffect, useState } from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import NegotiateModal from './NegotiateModal'
import { toRupiah } from '../../../utils/functions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productActions, selectProductPreview } from '../../../redux/slices'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { selectUser } from '../../../redux/slices/userSlice'
import { validateProduct } from '../../../utils/validators'

const ProductItem = (props) => {
  const { productName, productCategory, productPrice, type, productId, storageId, productDesc } = props
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  const [categoryNumber, setCategoryNumber] = useState('')
  const category = ['Hobi', 'Kendaraan', 'Baju', 'Elektronik', 'Kesehatan']
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const userLogin = useSelector(selectUser)

  const productPreview = useSelector(selectProductPreview)
  const data = {
    nama: productPreview?.name,
    harga: parseInt(productPreview?.price),
    deskripsi: productPreview?.description,
    kategori: parseInt(productPreview?.categoryId),
    token: productPreview?.token
  }

  useEffect(() => {
    if (typeof productCategory === 'number') setCategoryNumber(category[productCategory])
  })

  const handleBack = () => {
    if (productId !== '') {
      return navigate(`/add/${productId}`)
    }
    return navigate(`/add/`)
  }

  // console.log(typeof data.price)

  const handleAdd = async () => {
    console.log('adding product...')
    axios.put(`https://febesh5-dev.herokuapp.com/api/products/${productId}`, {
      id: productId,
      name: productName,
      price: productPrice,
      description: productDesc,
      categoryId: productCategory,
      status: 'PUBLISH'
    }, {
      headers: {
        'Authorization': `Bearer ${userLogin.accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      enqueueSnackbar('Product added', { variant: 'success', autoHideDuration: 1000 })
      dispatch(productActions.setProductNotifications(response.data.data[0]))
      setTimeout(() => {
        navigate('/sales')
      }, 2000)
    })
      .catch((e) => {
        console.log(e)
        enqueueSnackbar('Error occurred', { variant: 'error', autoHideDuration: 1000 })
      })
    console.log('product created')
    setTimeout(() => {
      navigate('/sales')
    }, 2000)
    // e.preventDefault()
    // if (validateProduct(data, setError)) {
    //   const fd = new FormData()
    //   fd.append('name', data.nama)
    //   fd.append('harga', data.harga)
    //   fd.append('deskripsi', data.deskripsi)
    //   fd.append('kategori', data.kategori)
    //   await axios.post('https://febesh5-dev.herokuapp.com/api/products', {
    //     name: fd.get('name'),
    //     price: fd.get('harga'),
    //     description: fd.get('deskripsi'),
    //     categoryId: fd.get('kategori'),
    //     // files: files[0],
    //   }, {
    //     headers: {
    //       'Authorization': `Bearer ${data.token}`,
    //       'Content-Type': 'multipart/form-data',
    //     }
    //   }).then(function (response) {
    //     console.log(response)
    //     enqueueSnackbar('Product added', { variant: 'success', autoHideDuration: 1000 })
    //     dispatch(productActions.setProductNotifications(response.data.data[0]))
    //     // console.log(response.data.data[0])
    //     setTimeout(() => {
    //       navigate('/sales')
    //     }, 2000)
    //   })
    //     .catch((e) => {
    //       console.log(e)
    //       enqueueSnackbar('Error occurred', { variant: 'error', autoHideDuration: 1000 })
    //     })
    //   console.log('product created')
    // }
  }
  // console.log(error)

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
              {typeof productCategory !== 'number' ? productCategory : categoryNumber}
            </Typography>
            <Typography variant="body1" sx={{ my: '1rem' }}>
              {toRupiah(productPrice) || toRupiah(250000)}
            </Typography>
            {type === 'seller' ? (
              <>
                <Button
                  onClick={() => handleAdd()}
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
                  onClick={() => handleBack()}
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
        <NegotiateModal open={open} handleClose={handleClose} productName={productName} productPrice={productPrice} storageId={storageId} />
      </Paper>
    </>
  )
}

export default ProductItem
