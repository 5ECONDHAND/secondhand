/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import NegotiateModal from './NegotiateModal'
import { toRupiah } from '../../../utils/functions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productActions, selectProductWishlist, selectUser } from '../../../redux/slices'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useDeleteProductMutation } from '../../../redux/services'
import { FaHeart } from 'react-icons/fa'

const ProductItem = ({ product, type }) => {
  // hook calls
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  // redux state selectors
  const userActive = useSelector(selectUser)
  const productWishlist = useSelector(selectProductWishlist)

  // local state
  const [open, setOpen] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  // rtk queries
  const [deleteProduct, { data: deleteProductData, isSuccess: isDeleteProductSuccess }] =
    useDeleteProductMutation()

  // local handlers
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

  const handleBack = () => {
    if (product?.id !== '') {
      return navigate(`/add/${product?.id}`)
    }
    return navigate(`/add/`)
  }

  const handleEdit = () => {
    if (product?.id !== '') {
      return navigate(`/product/edit/${product?.id}`)
    }
    return console.log('no product id found')
  }

  const handleDelete = async () => {
    deleteProduct({
      id: product?.id,
      token: userActive?.accessToken,
    })
  }

  const handleAdd = async () => {
    console.log('publishing product...')
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
  // console.log(error)publishing

  // useEffect calls when component mounts
  // check if product is deleted
  useEffect(() => {
    if (isDeleteProductSuccess) {
      enqueueSnackbar(`${deleteProductData?.message}`, {
        variant: 'warning',
        autoHideDuration: 1000,
      })
      navigate('/sales')
    }
  }, [isDeleteProductSuccess, deleteProductData])
  // check current wishlist state
  useEffect(() => {
    checkWishlist()
  }, [wishlist])
  // check if user is not logged in & tries to offer products
  useEffect(() => {
    if (open && userActive === null) {
      navigate('/login')
    } else if (open && userActive?.phoneNo === null) {
      navigate(`/edit/${userActive?.id}`)
    }
  }, [open])

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
                {product ? product?.name : 'product_name'}
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
              {product ? product?.Categories[0]?.Category?.name : 'product_category'}
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
                      color: '#000000',
                      border: '1px solid #7126B5',
                      py: '10px',
                      mb: '10px',
                      '&:hover': { color: '#ffffff', background: '#631fa1' },
                    }}
                    onClick={() => handleEdit(product?.id)}
                  >
                    Edit
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
                {product?.User?.id === userActive?.id || userActive === null ? null : (
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
                )}
              </>
            )}
          </Stack>
        </Stack>
        <NegotiateModal
          open={open}
          handleClose={handleClose}
          productName={product?.name}
          productPrice={product?.price}
          productId={product?.id}
          storageId={product?.Photos[0]?.storageId}
        />
      </Paper>
    </>
  )
}

export default ProductItem
