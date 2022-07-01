import { useState, useEffect } from 'react'
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Button,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material'
import { validateProfile } from '../../../utils/validators'
import gambar from '../../../assets/images/Profile.png'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useEditProfileMutation } from '../../../redux/services/userApi'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../redux/slices/authSlice'
import { selectUser } from '../../../redux/slices/userSlice'
import { userActions } from '../../../redux/slices/userSlice'

const EditProfileForm = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState({})
  const [values, setValues] = useState({
    nama: '',
    kota: '',
    alamat: '',
    nomor: '',
  })
  const user = useSelector(selectAuth)
  const userActive = useSelector(selectUser)

  const [
    editProfile,
    {
      data: editProfileData,
      isLoading: isEditProfileLoading,
      isSuccess: isEditProfileSuccess,
      isError: isEditProfileError,
    },
  ] = useEditProfileMutation()
  // const { data: userData, isSuccess: isUserSuccess } = useGetUserByIdQuery({
  //   id: user.id,
  //   token: user.token,
  // })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateProfile(values, setError)) {
      await editProfile({
        id: user.id,
        token: user.token,
        fullname: values.nama,
        city: values.kota,
        address: values.alamat,
        phoneNo: values.nomor,
      })
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleImage = (e) => {
    const selected = e.target.files[0]
    const types = ['image/png', 'image/jpeg', 'image/jpg']
    if (selected && types.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selected)
    }
  }

  useEffect(() => {
    setValues({
      nama: userActive.fullname,
      kota: userActive.city,
      alamat: userActive.address,
      nomor: userActive.phoneNo,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isEditProfileSuccess) {
      console.log('Response', editProfileData)
      dispatch(userActions.setUserActive(editProfileData.data[0]))
      enqueueSnackbar('Profile updated', { variant: 'success', autoHideDuration: 1000 })
      setTimeout(() => {
        navigate('/sales')
      }, 1000)
    } else if (isEditProfileError || editProfileData?.error) {
      enqueueSnackbar(`${editProfileData.message}`, {
        variant: 'warning',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProfileData, isEditProfileSuccess, isEditProfileLoading, isEditProfileError])

  return (
    <div>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              {!preview && (
                <Button
                  variant="contained"
                  component="label"
                  onChange={handleImage}
                  disableElevation
                  sx={{
                    background: '#E2D4F0',
                    border: 'none',
                    borderRadius: '12px',
                    ':hover': { background: '#E2D4F0' },
                    width: '96px',
                    height: '96px',
                  }}
                >
                  <img src={gambar} alt="" />
                  <input type="file" hidden />
                </Button>
              )}
            </Box>
            {preview ? (
              <>
                <Button
                  variant="contained"
                  component="label"
                  onChange={handleImage}
                  disableElevation
                  sx={{
                    background: 'transparent',
                    border: 'none',
                    ':hover': { background: '#ebebeb' },
                  }}
                >
                  <img
                    src={preview}
                    alt=""
                    style={{
                      width: '96px',
                      height: '96px',
                    }}
                  />
                  <input type="file" hidden />
                </Button>
              </>
            ) : (
              ''
            )}
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
              {isEditProfileLoading ? (
                <Box sx={{ mx: 'auto' }}>
                  <CircularProgress color="secondary" />
                </Box>
              ) : (
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
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default EditProfileForm
