/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  FiSearch,
  FiLogIn,
  FiList,
  FiBell,
  FiUser,
  FiLogOut,
  FiSettings,
  FiShoppingCart,
  FiArrowLeft,
} from 'react-icons/fi'
import logo from '../../../assets/svg/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetDataQuery, useGetNotificationsQuery } from '../../../redux/services/productApi'
import {
  authActions,
  productActions,
  selectProductActive,
  selectUser,
  userActions,
} from '../../../redux/slices'
import axios from 'axios'
import NavDrawer from './NavDrawer'
import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { toRupiah } from '../../../utils/functions'
import { selectProductNotifs } from '../../../redux/slices/productSlice'

// Local components
const SearchField = () => {
  const { pathname } = useLocation()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const { data: productData, isSuccess: isProductDataSuccess } = useGetDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )

  const handleSearch = async () => {
    if (search === '') {
      dispatch(productActions.setProductSearch(null))
      dispatch(productActions.setProducts(productData?.data))
    } else {
      axios
        .get(`https://febesh5-dev.herokuapp.com/api/products?search=${search}`)
        .then((response) => {
          // console.log({ error: false, message: 'Success', data: response.data.data })
          dispatch(productActions.setProductSearch(response?.data.data))
        })
        .catch((e) => console.log(e))
    }
  }

  return (
    <FormControl>
      <Box
        component="form"
        sx={{
          p: '2px 8px',
          display: 'flex',
          width: { xs: '100%', md: 400 },
          maxWidth: { xs: 'auto', md: 400 },
          borderRadius: '1rem',
          backgroundColor: '#EEEEEE',
        }}
      >
        <InputBase
          disabled={pathname !== '/' ? true : false}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault()
          }}
          placeholder="Cari di sini ..."
          sx={{
            ml: 1,
            flex: 1,
            display: 'flex',
            width: 'auto',
          }}
        />
        <IconButton
          disabled={pathname !== '/' ? true : false}
          onClick={handleSearch}
          sx={{ p: '10px' }}
        >
          <FiSearch />
        </IconButton>
      </Box>
    </FormControl>
  )
}

const NavbarRemake = () => {
  // hook calls
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  // local states
  const [pageTitle, setPageTitle] = useState(null)
  const [popMenuNotif, setPopMenuNotif] = useState(null)
  const [popMenuUser, setPopMenuUser] = useState(null)
  const openNotif = Boolean(popMenuNotif)
  const openUser = Boolean(popMenuUser)
  // const [notifChange, setNotifChange] = useState(false)
  // store states
  const userActive = useSelector(selectUser)
  const productActive = useSelector(selectProductActive)
  const productNotifs = useSelector(selectProductNotifs)
  // local functions
  const handleLogout = () => {
    dispatch(authActions.clearCredentials())
    dispatch(userActions.clearCredentials())
    dispatch(productActions.clearCredentials())
    enqueueSnackbar('Logout success', { variant: 'warning', autoHideDuration: 1000 })
    navigate('/login')
  }

  const handleCloseTooltip = () => {
    setPopMenuNotif(null)
    setPopMenuUser(null)
  }

  const { data: notifData, isSuccess: isNotifDataSuccess } = useGetNotificationsQuery(
    userActive?.accessToken,
    { refetchOnMountOrArgChange: true }
  )

  const { data: productData, isSuccess: isProductDataSuccess } = useGetDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )

  // const checkNotifs = () => {
  //   if (productNotifs?.length > 0) {
  //     for (const x of productNotifs) {
  //       if (x?.id === notifData?.data?.id) {
  //         setNotifChange(true)
  //         return true
  //       }
  //     }
  //   }
  //   return false
  // }

  // useEffect(() => {
  //   checkNotifs()
  // }, [notifChange])

  // useEffect(() => {
  //   console.log('fired')
  //   if (notifChange === true) {
  //     setNotifChange(false)
  //   }
  // }, [notifChange])

  useEffect(() => {
    if (isNotifDataSuccess && isProductDataSuccess) {
      dispatch(productActions.setProductNotifs(notifData?.data))
      // console.log('Notif fetched', notifData?.data)
      // console.log('notif state', JSON.parse(productNotifs[0]?.data))
      // console.log('Products fetched', productData?.data)
    }
  }, [productNotifs, notifData, pathname])

  useEffect(() => {
    const handlePageTitle = (page) => {
      switch (page) {
        case `/edit/${userActive?.id}`:
          setPageTitle('Lengkapi Info Akun')
          break
        case '/add':
          setPageTitle('Lengkapi Detail Produk')
          break
        case `/add/${productActive?.id}`:
          setPageTitle('Lengkapi Detail Produk')
          break
        case `/offers/${productActive?.id}`:
          setPageTitle('Info Penawar')
          break
        default:
          setPageTitle(null)
          break
      }
    }
    handlePageTitle(pathname)
  }, [pathname, productActive, userActive])

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: pathname === '/login' || pathname === '/register' ? 'none' : 'block',
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: { xs: pathname === '/' ? '#FFE9CA' : 'white', sm: 'white' },
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ p: '0 !important', my: 1, justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={0} alignItems="center">
                <Box
                  component="img"
                  src={logo}
                  sx={{ display: { xs: 'none', md: 'block' }, pr: 2, cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                />
                {pageTitle ? (
                  <IconButton
                    sx={{ display: { xs: 'block', md: 'none' }, color: 'black', zIndex: 1 }}
                    onClick={() => navigate(-1)}
                  >
                    <FiArrowLeft />
                  </IconButton>
                ) : (
                  <>
                    <NavDrawer user={userActive} />
                    <SearchField />
                  </>
                )}
              </Stack>
              {pageTitle ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    margin: 'auto',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'black' }}>
                    {pageTitle}
                  </Typography>
                </Box>
              ) : userActive ? (
                <Stack
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  sx={{ display: { xs: 'none', md: 'block' } }}
                >
                  <IconButton
                    sx={{ color: pathname === '/sales' ? '#7126B5' : 'black' }}
                    onClick={() => navigate('/sales')}
                  >
                    <FiList />
                  </IconButton>
                  <IconButton
                    id="notification-btn"
                    sx={{ color: openNotif ? '#7126B5' : 'black' }}
                    onClick={(e) => {
                      setPopMenuNotif(e.currentTarget)
                    }}
                  >
                    {notifData?.data?.length > 0 ? (
                      <Badge variant="dot" color="warning">
                        <FiBell />
                      </Badge>
                    ) : (
                      <FiBell />
                    )}
                  </IconButton>
                  <Menu
                    id="notification-menu"
                    anchorEl={popMenuNotif}
                    open={openNotif}
                    onClose={handleCloseTooltip}
                    MenuListProps={{
                      'aria-labelledby': 'notification-btn',
                    }}
                  >
                    <MenuItem>
                      {notifData?.data?.length !== 0 ? (
                        <Stack direction="column" spacing={2}>
                          {notifData?.data.map((item, index) => (
                            <Grid
                              key={index}
                              container
                              sx={{
                                gap: '1rem',
                                p: 1,
                                ':hover': { backgroundColor: '#F2F2F2' },
                                borderRadius: '12px',
                              }}
                              onClick={() => {
                                navigate(`/product/${JSON.parse(item?.data)?.productId}`)
                                handleCloseTooltip()
                              }}
                            >
                              <Grid>
                                <img
                                  src={logo}
                                  // src={`https://febesh5-dev.herokuapp.com/api/storages/${
                                  //   JSON.parse(item?.data)?.productId ===
                                  //   productData?.data[index]?.id
                                  //     ? productData?.data[index]?.Photos[0].storageId
                                  //     : null
                                  // }/preview`}
                                  // src={`https://febesh5-dev.herokuapp.com/api/storages/${item?.data?.data[0]?.Photos[0]?.storageId}/preview`}
                                  alt="product-img"
                                  width="64px"
                                  height="64px"
                                  style={{ borderRadius: '0.5rem' }}
                                />
                              </Grid>
                              <Grid>
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                  {JSON.parse(item?.data)?.title}
                                </Typography>
                                <Typography variant="subtitle1">
                                  {JSON.parse(item?.data)?.productName}
                                </Typography>
                                <Typography variant="subtitle1">
                                  {toRupiah(JSON.parse(item?.data)?.realPrice)}
                                </Typography>
                                <Typography variant="subtitle1">
                                  Ditawar {toRupiah(JSON.parse(item?.data)?.offeredPrice)}
                                </Typography>
                              </Grid>
                              <Grid sx={{ marginLeft: 'auto' }}>
                                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  <Typography variant="body2">
                                    {new Date(item?.createdAt).toISOString().substring(0, 10)}
                                  </Typography>
                                  {item?.read === false ? (
                                    <Box
                                      sx={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'red',
                                        borderRadius: '100%',
                                      }}
                                    />
                                  ) : null}
                                </Box>
                              </Grid>
                              <Divider />
                            </Grid>
                          ))}
                        </Stack>
                      ) : (
                        <Typography variant="subtitle2" sx={{ color: 'black' }}>
                          Notifikasi kosong
                        </Typography>
                      )}
                    </MenuItem>
                  </Menu>

                  <IconButton
                    id="user-btn"
                    sx={{ color: openUser ? '#7126B5' : 'black' }}
                    onClick={(e) => {
                      setPopMenuUser(e.currentTarget)
                    }}
                  >
                    <FiUser />
                  </IconButton>
                  <Menu
                    id="user-menu"
                    anchorEl={popMenuUser}
                    open={openUser}
                    onClose={handleCloseTooltip}
                    MenuListProps={{
                      'aria-labelledby': 'user-btn',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate(`/edit/${userActive?.id}`)
                        handleCloseTooltip()
                      }}
                    >
                      <FiSettings />
                      <Box sx={{ pl: 1 }}>Edit Profile</Box>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate('/wishlist')
                        handleCloseTooltip()
                      }}
                    >
                      <FiShoppingCart />
                      <Box sx={{ pl: 1 }}>Wishlist</Box>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleLogout()
                        handleCloseTooltip()
                      }}
                    >
                      <FiLogOut />
                      <Box sx={{ pl: 1 }}>Logout</Box>
                    </MenuItem>
                  </Menu>
                </Stack>
              ) : (
                <Button
                  onClick={() => navigate('/login')}
                  variant="contained"
                  startIcon={<FiLogIn />}
                  disableElevation={true}
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    textTransform: 'none',
                    backgroundColor: '#7126B5',
                    borderRadius: '12px',
                    py: 1,
                    ':hover': {
                      bgcolor: '#631fa1',
                      color: 'white',
                    },
                  }}
                >
                  Masuk
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  )
}

export default NavbarRemake
