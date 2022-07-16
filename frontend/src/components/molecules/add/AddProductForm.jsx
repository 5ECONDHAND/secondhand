/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  OutlinedInput,
  Button,
  Alert,
  Box,
  Grid,
  Stack,
  CircularProgress,
} from '@mui/material'
import gambar from '../../../assets/images/add.png'
import { validateProduct } from '../../../utils/validators'
import {
  usePostProductMutation,
  usePutProductMutation,
  useGetDataByIdQuery,
} from '../../../redux/services/productApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../../../redux/slices/authSlice'
import { productActions, selectProduct } from '../../../redux/slices/productSlice'
import axios from 'axios'
import { selectUser } from '../../../redux/slices'
import { isProductMaxed } from '../../../utils/functions'

const styles = {
  '&.MuiButton-root': {
    borderColor: '#7126B5',
    borderRadius: '1rem',
    textTransform: 'none',
    py: '15px',
    color: 'black',
  },
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 10,
  marginTop: 10,
  width: 96,
  height: 96,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

const AddProductForm = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [values, setValues] = useState({
    nama: '',
    harga: '',
    kategori: '',
    deskripsi: '',
  })
  const [files, setFiles] = useState([])
  const user = useSelector(selectAuth)
  const userActive = useSelector(selectUser)
  let token = userActive.accessToken
  const productsData = useSelector(selectProduct)
  const { productId } = useParams()
  const dispatch = useDispatch()
  const sellerProductCount = productsData?.filter(
    (item) => item.User.fullname === userActive.fullname
  ).length

  useEffect(() => {
    if (isProductMaxed(sellerProductCount)) {
      enqueueSnackbar('Maximum Product Stock', {
        variant: 'error',
        autoHideDuration: 1000,
        preventDuplicate: true,
      })
      return navigate('/sales')
    }
  }, [sellerProductCount])

  const [
    postProduct,
    {
      data: postProductData,
      isLoading: isPostProductLoading,
      isSuccess: isPostProductSuccess,
      isError: isPostProductError,
    },
  ] = usePostProductMutation()

  const [
    putProduct,
    {
      data: putProductData,
      isLoading: isPutProductLoading,
      isSuccess: isPutProductSuccess,
      isError: isPutProductError,
    },
  ] = usePutProductMutation()

  const { data: productData, isSuccess: isProductSuccess } = useGetDataByIdQuery({
    id: productId,
    token: token,
  })
  // console.log(productData)

  const handleSubmit = (event, name = '') => {
    if (productId && name === '') {
      handleUpdate(event)
    } else if (name === 'preview') {
      handlePreview(event)
    } else {
      handleAdd(event)
    }
  }

  const handleAdd = async (event) => {
    event.preventDefault()

    if (validateProduct(values, setError)) {
      axios
        .post(
          'https://febesh5-dev.herokuapp.com/api/products',
          {
            name: values.nama,
            price: values.harga,
            description: values.deskripsi,
            categoryId: values.kategori,
            status: 'PUBLISH',
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
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
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    console.log('updating product...')
    if (validateProduct(values, setError)) {
      axios
        .put(
          `https://febesh5-dev.herokuapp.com/api/products/${productId}`,
          {
            name: values.nama,
            price: values.harga,
            description: values.deskripsi,
            categoryId: values.kategori,
            files: files[0],
            token: user.token,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(function (response) {
          enqueueSnackbar('Product updated', { variant: 'success', autoHideDuration: 1000 })
          dispatch(productActions.setProductNotifications(response.data.data[0]))
          setTimeout(() => {
            navigate('/sales')
          }, 2000)
        })
        .catch((e) => {
          console.log(e)
          enqueueSnackbar('Error occurred', { variant: 'error', autoHideDuration: 1000 })
        })
      console.log('product updated')
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handlePreview = (event) => {
    event.preventDefault()
    console.log(files)
    if (productId && validateProduct(values, setError)) {
      axios
        .put(
          `https://febesh5-dev.herokuapp.com/api/products/${productId}`,
          {
            name: values.nama,
            price: values.harga,
            description: values.deskripsi,
            categoryId: values.kategori,
            files: files[0],
            token: user.token,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(function (response) {
          dispatch(
            productActions.setProductPreview({
              data: response.data.data[0],
            })
          )
          navigate(`/preview/${response.data.data[0].id}`)
        })
        .catch((e) => {
          console.log(e)
          enqueueSnackbar('Preview error', { variant: 'error', autoHideDuration: 1000 })
        })
    } else if (validateProduct(values, setError)) {
      axios
        .post(
          'https://febesh5-dev.herokuapp.com/api/products',
          {
            name: values.nama,
            price: values.harga,
            description: values.deskripsi,
            categoryId: values.kategori,
            files: files[0],
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(function (response) {
          console.log(response.data)
          dispatch(
            productActions.setProductPreview({
              data: response.data.data[0],
            })
          )
          navigate(`/preview/${response.data.data[0]?.id}`)
        })
        .catch((e) => {
          console.log(e)
          enqueueSnackbar('Preview error', { variant: 'error', autoHideDuration: 1000 })
        })
    }
  }

  // Dropzone settings
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 4, // max number of files for upload
    maxSize: 5242880, // 5 mb
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'], // Allow only images with this extension
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
      console.log(acceptedFiles)
    },
  })

  const fileRejectionItems = fileRejections.map(() => {
    return <div></div>
  })

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
          alt=""
        />
      </div>
    </div>
  ))

  useEffect(() => {
    setValues({
      nama: productData?.data[0] ? productData.data[0].name : '',
      harga: productData?.data[0] ? productData.data[0].price : '',
      kategori: productData?.data[0] ? productData.data[0].Categories[0].Category.id : '',
      deskripsi: productData?.data[0] ? productData.data[0].description : '',
    })
  }, [productData])

  useEffect(() => {
    if (isPostProductSuccess || isPutProductSuccess) {
      if (productId) {
        console.log('Response', putProductData)
        enqueueSnackbar('Product updated', { variant: 'success', autoHideDuration: 1000 })
        setTimeout(() => {
          navigate('/sales')
        }, 2000)
      } else {
        console.log('Response', postProductData)
        enqueueSnackbar('Product added', { variant: 'success', autoHideDuration: 1000 })
        setTimeout(() => {
          navigate('/sales')
        }, 2000)
      }
    }
    if (isPostProductError || isPutProductError) {
      console.log('Response', isPostProductError)
      enqueueSnackbar('Error occurred', { variant: 'error', autoHideDuration: 1000 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostProductSuccess, isPutProductSuccess, isPostProductError, isPutProductError])

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <div className="Form">
      <Box component="form" autoComplete="off">
        <Grid container direction="column">
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                Nama Produk
              </FormHelperText>
              <OutlinedInput
                error={error.nama ? true : false}
                placeholder="Nama Produk"
                type="text"
                value={values.nama}
                onChange={handleChange('nama')}
                sx={{ borderRadius: '1rem' }}
              />
              <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.nama}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                Harga Produk
              </FormHelperText>
              <OutlinedInput
                error={error.harga ? true : false}
                placeholder="Rp 0,00"
                type="number"
                value={values.harga}
                onChange={handleChange('harga')}
                sx={{ borderRadius: '1rem' }}
              />
              <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.harga}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                Pilih Kategori
              </FormHelperText>
              <Select
                error={error.kategori ? true : false}
                value={values.kategori}
                placeholder="Pilih Kategori"
                onChange={handleChange('kategori')}
                sx={{ borderRadius: '1rem' }}
              >
                {/* <MenuItem disabled value="">
                  <em>
                    {isProductSuccess && productId
                      ? productData?.data[0].Categories[0].Category.id
                      : 'Pilih Kategori'}
                  </em>
                </MenuItem> */}
                <MenuItem value={1}>Hobi</MenuItem>
                <MenuItem value={2}>Kendaraan</MenuItem>
                <MenuItem value={3}>Baju</MenuItem>
                <MenuItem value={4}>Elektronik</MenuItem>
                <MenuItem value={5}>Kesehatan</MenuItem>
              </Select>
              <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.kategori}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                Deskripsi
              </FormHelperText>
              <OutlinedInput
                multiline
                error={error.deskripsi ? true : false}
                type="text"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                value={values.deskripsi}
                onChange={handleChange('deskripsi')}
                sx={{ borderRadius: '1rem' }}
                rows={4}
              />
              <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.deskripsi}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                Foto Produk
              </FormHelperText>
              <Box
                {...getRootProps()}
                sx={{
                  mb: '1rem',
                  maxWidth: { xs: '9ch', md: '9ch', lg: '9ch' },
                  cursor: 'pointer',
                }}
              >
                <input {...getInputProps()} />
                {files.length !== 0 ? (
                  <Box
                    sx={{
                      border: '1px dashed #D0D0D0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      minWidth: { xs: '30ch', md: '40ch', lg: '50ch' },
                    }}
                  >
                    {thumbs}
                  </Box>
                ) : (
                  <img src={gambar} alt="" />
                )}
              </Box>
              {fileRejectionItems[0] && (
                <Box sx={{ mb: '1rem' }}>
                  <Alert severity="error">Maksimal 4 Gambar dan Ukuran Maksimal 2mb </Alert>
                </Box>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} justifyContent={'center'}>
          {isPutProductLoading || isPostProductLoading ? (
            <Box sx={{ mx: 'auto' }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                size="large"
                disableElevation
                sx={styles}
                onClick={(e) => handleSubmit(e, 'preview')}
              >
                Preview
              </Button>
              <Button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disableElevation
                sx={{
                  borderRadius: '1rem',
                  textTransform: 'none',
                  background: '#7126B5',
                  py: '15px',
                }}
              >
                {productId ? 'Update' : 'Terbitkan'}
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </div>
  )
}

export default AddProductForm
