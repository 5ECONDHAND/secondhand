import { Container, Box, Button, FormControl, FormHelperText, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { FiLogIn, FiSearch, FiMenu } from 'react-icons/fi'

const SearchField = () => {
  return (
    <FormControl
      sx={{ minWidth: { xs: "30ch", md: "40ch", lg: "50ch" } }}
    >
      <OutlinedInput
        placeholder="Cari di sini..."
        // onChange={handleChange("nama")}
        sx={{ borderRadius: "16px", height: '48px', backgroundColor: '#EEEEEE', border: 'gray' }}
        endAdornment={
          <InputAdornment position="end" sx={{ mr: '0.5rem' }}>
            <IconButton
              edge="end"
            >
              <FiSearch />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const LoginButton = () => {
  return (
    <Button sx={{
      borderRadius: '12px',
      backgroundColor: '#7126B5',
      color: 'white',
      padding: '8px 12px',
      ':hover': {
        bgcolor: '#631fa1',
        color: 'white'
      },
    }} startIcon={<FiLogIn />}>Masuk</Button>
  )
}

const Navbar = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Box sx={{ paddingY: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }} >
        <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Box sx={{ width: '100px', height: '34px', backgroundColor: '#4B1979' }} />
            <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
              <SearchField />
            </Box>
          </Box>
          <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
            <LoginButton />
          </Box>
          <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
            <FiMenu style={{ cursor: 'pointer' }} size='30px' onClick={() => setShow(!show)} />
            {show &&
              <>
                <Box sx={{ position: 'absolute', top: '77px', left: 0, right: 0, margin: 'auto', backgroundColor: '#f7f7f7', height: '40vh', width: '100vw', display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <SearchField />
                    <LoginButton />
                  </Box>
                </Box>
              </>}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Navbar