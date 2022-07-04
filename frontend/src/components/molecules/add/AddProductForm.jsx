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
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../redux/slices/authSlice'

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
  const user = useSelector(selectAuth)
  const { productId } = useParams()

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

  const { data: productData, isSuccess: isProductSuccess } = useGetDataByIdQuery(productId)

  const handleSubmit = (event) => {
    if (productId) {
      handleUpdate(event)
    } else {
      handleAdd(event)
    }
  }

  const handleAdd = async (event) => {
    console.log('adding product...')
    event.preventDefault()
    if (validateProduct(values, setError)) {
      await postProduct({
        name: values.nama,
        price: values.harga,
        description: values.deskripsi,
        categoryId: values.kategori,
        token: user.token,
      })
      console.log('product updated')
    }
  }

  const handleUpdate = async (event) => {
    console.log('updating product...')
    event.preventDefault()
    if (validateProduct(values, setError)) {
      await putProduct({
        id: productId,
        name: values.nama,
        price: values.harga,
        description: values.deskripsi,
        categoryId: values.kategori,
        token: user.token,
      })
      console.log('product updated')
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
    // console.log(values)
  }

  const [files, setFiles] = useState([])
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 4,
    accept: {
      'image/*': [],
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
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                Nama Produk
              </FormHelperText>
              <OutlinedInput
                error={error.nama ? true : false}
                placeholder={
                  isProductSuccess && productId ? productData.data[0].name : 'Nama Produk'
                }
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
                placeholder={isProductSuccess && productId ? productData.data[0].price : 'Rp 0,00'}
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
                <MenuItem disabled value="">
                  <em>
                    {isProductSuccess && productId
                      ? productData?.data[0].Categories[0].Category.name
                      : 'Pilih Kategori'}
                  </em>
                </MenuItem>
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
                placeholder={
                  isProductSuccess && productId
                    ? productData.data[0].description
                    : 'Contoh: Jalan Ikan Hiu 33'
                }
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
                  <Alert severity="error">Maksimal 4 Gambar</Alert>
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
              <Button fullWidth variant="outlined" size="large" disableElevation sx={styles}>
                Preview
              </Button>
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
