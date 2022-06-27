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
import { FiLogIn, FiSearch, FiMenu, FiList, FiBell, FiUser } from 'react-icons/fi'
import casio1 from '../../../assets/images/casio1.png'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchField = () => {
  return (
    <FormControl sx={{ minWidth: { xs: '30ch', md: '40ch', lg: '50ch' } }}>
      <OutlinedInput
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

const UserButton = () => {
  const type = ['Menu', 'Notification', 'Account']
  const [active, setActive] = useState('')
  const [popup, setPopup] = useState(false)
  const [notif, setNotif] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') setActive('')
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
        return setPopup(!popup), setNotif(!notif)
      default:
        break
    }
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
                        <Grid
                          container
                          sx={{
                            gap: '10px',
                            ':hover': { backgroundColor: '#f7f7f7' },
                            padding: '10px',
                            borderRadius: '12px',
                          }}
                          onClick={() => navigate('/product')}
                        >
                          <Grid>
                            <img src={casio1} alt="jam" width="80px" height="80px" />
                          </Grid>
                          <Grid>
                            <Typography variant="body2">Penawaran Produk</Typography>
                            <Typography variant="subtitle1">Jam Tangan Casio</Typography>
                            <Typography variant="subtitle1">Rp. 250.000</Typography>
                            <Typography variant="subtitle1">Ditawar Rp. 200.000</Typography>
                          </Grid>
                          <Grid sx={{ marginLeft: 'auto' }}>
                            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <Typography variant="body2">20 Apr, 14:04</Typography>
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
                        <Grid
                          container
                          sx={{
                            gap: '10px',
                            ':hover': { backgroundColor: '#f7f7f7' },
                            padding: '10px',
                            borderRadius: '12px',
                          }}
                          onClick={() => navigate('/product')}
                        >
                          <Grid>
                            <img src={casio1} alt="jam" width="80px" height="80px" />
                          </Grid>
                          <Grid>
                            <Typography variant="body2">Penawaran Produk</Typography>
                            <Typography variant="subtitle1">Jam Tangan Casio</Typography>
                            <Typography variant="subtitle1">Rp. 250.000</Typography>
                            <Typography variant="subtitle1">Ditawar Rp. 200.000</Typography>
                          </Grid>
                          <Grid sx={{ marginLeft: 'auto' }}>
                            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <Typography variant="body2">20 Apr, 14:04</Typography>
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
                        <Grid
                          container
                          sx={{
                            gap: '10px',
                            ':hover': { backgroundColor: '#f7f7f7' },
                            padding: '10px',
                            borderRadius: '12px',
                          }}
                          onClick={() => navigate('/product')}
                        >
                          <Grid>
                            <img src={casio1} alt="jam" width="80px" height="80px" />
                          </Grid>
                          <Grid>
                            <Typography variant="body2">Penawaran Produk</Typography>
                            <Typography variant="subtitle1">Jam Tangan Casio</Typography>
                            <Typography variant="subtitle1">Rp. 250.000</Typography>
                            <Typography variant="subtitle1">Ditawar Rp. 200.000</Typography>
                          </Grid>
                          <Grid sx={{ marginLeft: 'auto' }}>
                            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <Typography variant="body2">20 Apr, 14:04</Typography>
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
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <FiUser size="24px" style={{ color: `${active === item ? '#7126B5' : ''}` }} />
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
      </Box>
    </>
  )
}

const Navbar = () => {
  const [show, setShow] = useState(false)
  const user = true
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <Box sx={{ paddingY: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }} >
        <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', width: '100%', position: 'relative' }}>
            <Box sx={{ width: '100px', height: '34px', backgroundColor: '#4B1979', cursor: 'pointer', zIndex: 10 }} onClick={() => navigate('/')} />
            {pathname === '/add' ? '' : pathname === '/edit' ?
              <Box sx={{ textAlign: 'center', position: 'absolute', left: 0, right: 0, margin: 'auto' }}><Typography variant='subtitle2'>Lengkapi Info Akun</Typography>
              </Box> :
              <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
                <SearchField />
              </Box>}
          </Box>
          {pathname === '/add' || pathname === '/edit' ? '' :
            <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
              {user ? <UserButton /> : <LoginButton />}
            </Box>}
          {pathname === '/add' || pathname === '/edit' ? '' :
            <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
              <FiMenu style={{ cursor: 'pointer' }} size='30px' onClick={() => setShow(!show)} />
              {show &&
                <>
                  <Box sx={{ position: 'absolute', top: '73px', left: 0, right: 0, margin: 'auto', backgroundColor: '#f7f7f7', height: '40vh', width: '100vw', display: 'flex', justifyContent: 'center', paddingTop: '30px', zIndex: 10 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                      <SearchField />
                      {user ? <UserButton /> : <LoginButton />}
                    </Box>
                  </Box>
                </>}
            </Box>}
        </Container>
      </Box>
    </>
  )
}

export default Navbar
