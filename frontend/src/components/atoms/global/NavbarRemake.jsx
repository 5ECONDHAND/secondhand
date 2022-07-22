import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
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
} from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetDataQuery } from '../../../redux/services/productApi'
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
    <FormControl sx={{ display: 'flex' }}>
      <Box
        component="form"
        sx={{
          p: '2px 8px',
          display: 'flex',
          width: { xs: '100%', md: 400 },
          maxWidth: { xs: 'none', md: 400 },
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
          sx={{ ml: 1, flex: 1 }}
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
  // local states
  // const [anchorEl, setAnchorEl] = useState(null)
  const [popMenuNotif, setPopMenuNotif] = useState(null)
  const [popMenuUser, setPopMenuUser] = useState(null)
  const openNotif = Boolean(popMenuNotif)
  const openUser = Boolean(popMenuUser)
  // const open = Boolean(anchorEl)
  const [pageTitle, setPageTitle] = useState(null)
  // store states
  const userActive = useSelector(selectUser)
  const productActive = useSelector(selectProductActive)
  // local functions
  const handleLogout = () => {
    dispatch(authActions.clearCredentials())
    dispatch(userActions.clearCredentials())
    dispatch(productActions.clearCredentials())
    navigate('/login')
  }

  const handleCloseTooltip = () => {
    setPopMenuNotif(null)
    setPopMenuUser(null)
  }

  const handlePageTitle = (page) => {
    switch (page) {
      case `/edit/${userActive?.id}`:
        setPageTitle('Lengkapi Info Akun')
        break
      case '/wishlist':
        setPageTitle('Wishlist')
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

  useEffect(() => {
    handlePageTitle(pathname)
    console.log('pagetitle', pageTitle)
  }, [pathname])

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
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    width: 100,
                    height: 34,
                    backgroundColor: '#4B1979',
                    cursor: 'pointer',
                    mr: 2,
                  }}
                  onClick={() => navigate('/')}
                />
                <NavDrawer user={userActive} />
                {pageTitle ? null : <SearchField />}
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
                    <FiBell />
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
                      <Typography variant="subtitle2" sx={{ color: 'black' }}>
                        Notifikasi kosong
                      </Typography>
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
