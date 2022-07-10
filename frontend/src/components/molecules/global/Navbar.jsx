import {
  Container,
  Box,
  Button,
  FormControl,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { FiLogIn, FiSearch, FiMenu, FiList, FiBell, FiUser, FiLogOut, FiSettings, FiShoppingCart } from 'react-icons/fi'
import casio1 from '../../../assets/images/dummy-image.jpg'
import { useNavigate, useLocation } from 'react-router-dom'
// import { selectUser } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, userActions } from '../../../redux/slices/userSlice'
import { authActions } from '../../../redux/slices/authSlice'
import { productActions, selectProductNotifications } from '../../../redux/slices/productSlice'
import { useGetDataByIdQuery } from '../../../redux/services/productApi'

const SearchField = () => {
  const { pathname } = useLocation()
  return (
    <FormControl sx={{ minWidth: { xs: '30ch', md: '40ch', lg: '50ch' } }}>
      <OutlinedInput
        disabled={pathname !== '/' ? true : false}
        placeholder="Cari di sini..."
        // onChange={handleChange("nama")}
        sx={{ borderRadius: '16px', height: '48px', backgroundColor: '#EEEEEE', border: 'gray' }}
        endAdornment={
          <InputAdornment position="end" sx={{ mr: '0.5rem' }}>
            <IconButton edge="end">
              <FiSearch />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const LoginButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      sx={{
        borderRadius: '12px',
        backgroundColor: '#7126B5',
        color: 'white',
        padding: '8px 12px',
        ':hover': {
          bgcolor: '#631fa1',
          color: 'white',
        },
      }}
      startIcon={<FiLogIn />}
      onClick={() => navigate('/login')}
    >
      Masuk
    </Button>
  )
}

const UserButton = ({ userId }) => {
  const type = ['Menu', 'Notification', 'Account']
  const [active, setActive] = useState('')
  const [popup, setPopup] = useState(false)
  const [notif, setNotif] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const notificationProductAdd = useSelector(selectProductNotifications)
  const notifData = useGetDataByIdQuery(notificationProductAdd.id)
  console.log(notifData)

  const logout = () => {
    dispatch(authActions.clearCredentials())
    dispatch(userActions.clearCredentials())
    navigate('/login')
  }

  useEffect(() => {
    if (pathname === '/') setActive('')
    if (notificationProductAdd) setNotif(true)
  }, [pathname])

  const handleActive = (name) => {
    console.log(name)
    setActive(name)
    switch (name) {
      case 'Menu':
        return navigate('/sales')
      case 'Notification':
        // no notification route so direct to /sales if width < 900 (md to sm && xs)
        if (window.innerWidth < 900) return navigate('/sales')
        return setPopup(!popup), setNotif(!notif), setNotif(false)
      case 'Account':
        if (window.innerWidth < 900) return navigate(`/edit/${userId}`)
        return setShowProfile(!showProfile)
      default:
        break
    }
  }

  const handleNotifClick = () => {
    setNotif(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
        {type.map((item) => (
          <Box key={item} style={{ cursor: 'pointer' }} onClick={() => handleActive(item)}>
            <Box display={{ xs: 'none', md: 'block' }}>
              {item === 'Menu' ? (
                <FiList size="24px" style={{ color: `${active === item ? '#7126B5' : ''}` }} />
              ) : item === 'Notification' ? (
                <Box sx={{ position: 'relative' }}>
                  <FiBell size="24px" style={{ color: `${active === item ? '#7126B5' : ''}` }} />
                  {notif && (
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        borderRadius: '50px',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        border: '2px solid white',
                      }}
                    />
                  )}
                  {popup && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 30,
                        right: 10,
                        width: '450px',
                        zIndex: '10',
                      }}
                    >
                      {/* {notif ? 'ada konten' : 'tidak ada konten'} */}
                      <Box
                        p={2}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          backgroundColor: 'white',
                          height: '100%',
                          borderRadius: '12px',
                          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        {notifData ? [notifData]?.map(item => (
                          <Grid
                            container
                            sx={{
                              gap: '10px',
                              ':hover': { backgroundColor: '#f7f7f7' },
                              padding: '10px',
                              borderRadius: '12px',
                            }}
                            onClick={handleNotifClick}
                          >
                            <Grid>
                              <img src={`https://febesh5-dev.herokuapp.com/api/storages/${item.data.data[0].Photos[0].storageId}/preview`} alt="product-img" width="80px" height="80px" />
                            </Grid>
                            <Grid>
                              <Typography variant="body2">Berhasil Ditambahkan</Typography>
                              <Typography variant="subtitle1">{item.data.data[0].name}</Typography>
                              <Typography variant="subtitle1">Rp. {item.data.data[0].price}</Typography>
                              {/* <Typography variant="subtitle1">Ditawar Rp. 200.000</Typography> */}
                            </Grid>
                            <Grid sx={{ marginLeft: 'auto' }}>
                              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <Typography variant="body2">{new Date(item.data.data[0].createdAt).toISOString().substring(0, 10)}</Typography>
                                <Box
                                  sx={{
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: 'red',
                                    borderRadius: '50px',
                                  }}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        )) : 'kosong'}
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{ position: 'relative' }}>
                  <FiUser size="24px" style={{ color: `${active === item ? '#7126B5' : ''}` }} />
                  {showProfile && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 30,
                        right: 0,
                        padding: '10px',
                        width: '200px',
                        background: 'white',
                        zIndex: '10',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        borderRadius: '12px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <Box sx={{
                        display: 'flex', gap: '10px', alignItems: 'center', ':hover': {
                          color: '#7126B5',
                        }
                      }} onClick={() => navigate(`/edit/${userId}`)}>
                        <FiSettings />
                        <Typography>Edit Profile</Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex', gap: '10px', alignItems: 'center', ':hover': {
                          color: '#7126B5',
                        }
                      }}>
                        <FiShoppingCart />
                        <Typography>Whishlist</Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex', gap: '10px', alignItems: 'center', ':hover': {
                          color: '#7126B5',
                        }
                      }} onClick={logout}>
                        <FiLogOut />
                        <Typography>Logout</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            <Typography
              display={{ xs: 'block', md: 'none' }}
              sx={{
                textAlign: 'center',
                py: '5px',
                transition: '0.2s',
                borderRadius: '12px',
                ':hover': { backgroundColor: '#7126B5', color: 'white' },
                backgroundColor: `${active === item ? '#7126B5' : ''}`,
                color: `${active === item ? 'white' : ''}`,
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}
        <Button sx={{ display: { xs: 'block', md: 'none', backgroundColor: '#7126B5', color: 'white' } }} variant='contained' onClick={logout}>Logout</Button>
      </Box>
    </>
  )
}

const Navbar = () => {
  const [show, setShow] = useState(false)
  const user = useSelector(selectUser)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [displayMenu, setDisplayMenu] = useState(false)
  useEffect(() => {
    if (user) {
      setDisplayMenu(true)
    }
  }, [user])

  return (
    <>
      <Box sx={{ paddingY: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}>
        <Container
          maxWidth="xl"
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100px',
                height: '34px',
                backgroundColor: '#4B1979',
                cursor: 'pointer',
                zIndex: 10,
              }}
              onClick={() => navigate('/')}
            />
            {pathname === '/add' ? (
              ''
            ) : pathname === `/edit/${user?.id}` ? (
              <Box
                sx={{
                  textAlign: 'center',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: 'auto',
                }}
              >
                <Typography variant="subtitle2">Lengkapi Info Akun</Typography>
              </Box>
            ) : pathname === '/offers' ? (<Box
              sx={{
                textAlign: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: 'auto',
              }}
            >
              <Typography variant="subtitle2">Info Penawar</Typography>
            </Box>) : (
              <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
                <SearchField />
              </Box>
            )}
          </Box>

          {/* login state */}
          {pathname === '/add' || pathname === `/edit/${user?.id}` || pathname === '/offers' ? (
            ''
          ) : (
            <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
              {displayMenu ? <UserButton userId={user?.id} /> : <LoginButton />}
            </Box>
          )}

          {/* under < 900px show box */}
          {pathname === '/add' || pathname === `/edit/${user?.id}` || pathname === '/offers' ? (
            ''
          ) : (
            <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
              <FiMenu style={{ cursor: 'pointer' }} size="30px" onClick={() => setShow(!show)} />
              {show && (
                <>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '73px',
                      left: 0,
                      right: 0,
                      margin: 'auto',
                      backgroundColor: '#f7f7f7',
                      height: '40vh',
                      width: '100vw',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '30px',
                      zIndex: 10,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                      <SearchField />
                      {displayMenu ? <UserButton userId={user?.id} /> : <LoginButton />}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}

export default Navbar
