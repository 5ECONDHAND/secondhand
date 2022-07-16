/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import NegotiateModal from './NegotiateModal'
import { toRupiah } from '../../../utils/functions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../../redux/slices'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { selectUser } from '../../../redux/slices/userSlice'
import { useDeleteProductMutation } from '../../../redux/services'

const ProductItem = ({ product, type }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const userActive = useSelector(selectUser)

  // const [categoryNumber, setCategoryNumber] = useState('')
  // const productPreview = useSelector(selectProductPreview)
  // const data = {
  //   nama: productPreview?.name,
  //   harga: parseInt(productPreview?.price),
  //   deskripsi: productPreview?.description,
  //   kategori: parseInt(productPreview?.categoryId),
  //   token: productPreview?.token,
  // }

  const handleBack = () => {
    if (product?.id !== '') {
      return navigate(`/add/${product?.id}`)
    }
    return navigate(`/add/`)
  }

  const handleAdd = async () => {
    console.log('adding product...')
    axios
      .put(
        `https://febesh5-dev.herokuapp.com/api/products/${product?.id}`,
        {
          id: product?.id,
          name: product?.name,
          price: product?.price,
          description: product?.description,
          categoryId: product?.Categories?.categoryId,
          status: 'PUBLISH',
        },
        {
          headers: {
            Authorization: `Bearer ${userActive.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(function (response) {
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

  const [deleteProduct, { data: deleteProductData, isSuccess: isDeleteProductSuccess }] =
    useDeleteProductMutation()

  const handleDelete = async () => {
    deleteProduct({
      id: product?.id,
      token: userActive?.accessToken,
    })
  }

  useEffect(() => {
    if (isDeleteProductSuccess) {
      enqueueSnackbar(`${deleteProductData?.message}`, {
        variant: 'warning',
        autoHideDuration: 1000,
      })
      navigate('/sales')
    }
  }, [isDeleteProductSuccess, deleteProductData])

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
              {product ? product?.name : 'product_name'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {product ? product?.Categories[0]?.Category?.name : 'product_category'}
              {/* {typeof productCategory !== 'number' ? productCategory : categoryNumber} */}
            </Typography>
            <Typography variant="body1" sx={{ my: '1rem' }}>
              {product ? toRupiah(product?.price) : 'product_price'}
            </Typography>
            {type === 'seller' ? (
              product?.status === 'DRAFT' ? (
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
                    fullWidth
                    variant="contained"
                    size="large"
                    disableElevation
                    sx={{
                      borderRadius: '1rem',
                      textTransform: 'none',
                      background: '#ffffff',
                      color: '#FF0000',
                      border: '1px solid #FF0000',
                      py: '10px',
                      '&:hover': { color: '#ffffff', background: '#FF0000' },
                    }}
                    onClick={() => handleDelete(product?.id)}
                  >
                    Delete
                  </Button>
                </>
              )
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
