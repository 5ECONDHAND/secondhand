import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Alert,
  Button,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material'
import { validateProfile } from '../../../utils/validators'
import gambar from '../../../assets/images/Profile.png'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'
import { userActions } from '../../../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../redux/slices/authSlice'
import { selectUser } from '../../../redux/slices/userSlice'

import axios from 'axios'


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

const EditProfileForm = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  const [files, setFiles] = useState([])
  const [values, setValues] = useState({
    nama: '',
    kota: '',
    alamat: '',
    nomor: '',
  })
  const {userId} = useParams()
  const user = useSelector(selectAuth)
  const userActive = useSelector(selectUser)

  
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateProfile(values, setError)) {
      axios.put(`https://febesh5-dev.herokuapp.com/api/users/${userId}`, {
        fullname: values.nama,
        city: values.kota,
        address: values.alamat,
        phoneNo: values.nomor,
        files: files[0],
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        enqueueSnackbar('Profile updated', { variant: 'success', autoHideDuration: 1000 })
        dispatch(userActions.setUserActive(response.data.data[0]))
        console.log(response.data.data[0])
        setTimeout(() => {
          navigate('/sales')
        }, 2000)
      })
        .catch((e) => {
          console.log(e)
          enqueueSnackbar('Error occurred', { variant: 'error', autoHideDuration: 1000 })
        })
        
      // const editData = new FormData()
      // editData.append("files", files[0])
      // editData.append("fullname", values.nama)
      // editData.append("city", values.kota)
      // editData.append("address", values.alamat)
      // editData.append("phoneNo", values.nomor)
      // for (var t of editData.entries()){
      //   console.log(t[0] + ', ' + t[1]);
      // }
      // dispatch(updateUser({editData, userId}))
      // console.log(userId);

      // await editProfile({
      //   id: user.id,
      //   token: user.token,
      //   editData
      // })
    }
    
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
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
    if (userActive?.city === null) {
      enqueueSnackbar('You must first complete your profile', {
        variant: 'warning',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    }
    setValues({
      nama: userActive.fullname ? userActive.fullname : '',
      kota: userActive.city ? userActive.city : '',
      alamat: userActive.address ? userActive.address : '',
      nomor: userActive.phoneNo ? userActive.phoneNo : '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <div>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column">
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
                  <Alert severity="error">Maksimal 1 Gambar dan Ukuran 5MB</Alert>
                </Box>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Nama*</FormHelperText>
              <OutlinedInput
                error={error.nama ? true : false}
                placeholder="Nama"
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
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>Kota*</FormHelperText>
              <OutlinedInput
                error={error.kota ? true : false}
                placeholder="Isi Kota"
                type="text"
                value={values.kota}
                onChange={handleChange('kota')}
                sx={{ borderRadius: '1rem' }}
              />
              <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.kota}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                Alamat*
              </FormHelperText>
              <OutlinedInput
                error={error.alamat ? true : false}
                type="text"
                placeholder="Contoh: Jalan Ikan Hiu 33"
                value={values.alamat}
                onChange={handleChange('alamat')}
                sx={{ borderRadius: '1rem' }}
                multiline
                rows={4}
              />
              <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.alamat}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
              <FormHelperText sx={{ fontSize: '1rem', color: 'black', m: 0 }}>
                No Handphone*
              </FormHelperText>
              <OutlinedInput
                error={error.nomor ? true : false}
                type="number"
                placeholder="contoh: +628123456789"
                value={values.nomor}
                onChange={handleChange('nomor')}
                sx={{ borderRadius: '1rem' }}
              />
              <FormHelperText sx={{ m: 0, mb: '1rem' }}>{error.nomor}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: { xs: '30ch', sm: '50ch' } }}>
                {/* <Box sx={{ mx: 'auto' }}>
                  <CircularProgress color="secondary" />
                </Box> */}

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
                  Simpan
                </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default EditProfileForm
