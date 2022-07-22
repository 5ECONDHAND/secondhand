import { useState, Fragment } from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { FiLogIn, FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions, productActions, userActions } from '../../../redux/slices'

const NavDrawer = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [state, setState] = useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  const handleLogout = () => {
    dispatch(authActions.clearCredentials())
    dispatch(userActions.clearCredentials())
    dispatch(productActions.clearCredentials())
    navigate('/login')
  }

  const listItemData = [
    {
      name: 'SeconHand',
      menus: [
        {
          name: 'Home',
          navigate: '/',
        },
      ],
    },
    {
      name: 'Akun Saya',
      menus: [
        {
          name: 'Daftar Jual',
          navigate: '/sales',
        },
        {
          name: 'Edit Profile',
          navigate: `/edit/${user?.id}`,
        },
        {
          name: 'Wishlist',
          navigate: '/wishlist',
        },
        {
          name: 'Logout',
          navigate: null,
        },
      ],
    },
  ]

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {user ? (
        <List>
          {listItemData.map((item, index) => (
            <div key={item.name}>
              <ListItem>
                <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: '700' }} />
                <ListItemButton onClick={() => navigate(item.navigate)}></ListItemButton>
              </ListItem>
              <Divider />
              {item.menus.map((menu, index) => (
                <Fragment key={menu.name}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => (menu.navigate ? navigate(menu.navigate) : handleLogout())}
                    >
                      <ListItemText primary={menu.name} />
                    </ListItemButton>
                  </ListItem>
                </Fragment>
              ))}
            </div>
          ))}
        </List>
      ) : (
        <List>
          <ListItem>
            <ListItemText primary={'SecondHand'} primaryTypographyProps={{ fontWeight: '700' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton variant="contained" onClick={() => navigate('/login')}>
              <FiLogIn />
              <ListItemText primary={'Masuk'} sx={{ pl: 1 }} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            sx={{
              p: 1.5,
              mr: 1,
              display: { xs: 'block', md: 'none' },
              color: 'black',
              backgroundColor: { xs: '#EEEEEE', sm: 'inherit' },
              borderRadius: '12px',
              '&:hover': {
                color: 'white',
                backgroundColor: '#7126B5',
              },
            }}
          >
            <FiMenu />
          </IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  )
}

export default NavDrawer
