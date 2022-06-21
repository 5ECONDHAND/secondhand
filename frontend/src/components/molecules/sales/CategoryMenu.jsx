import { useState } from 'react'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { FiBox, FiDollarSign, FiHeart, FiChevronRight } from 'react-icons/fi'

const CategoryMenu = ({ setDataCategory }) => {
  const [active, setActive] = useState('Semua Produk')
  const type = ['Semua Produk', 'Diminati', 'Terjual']
  const icons = [<FiBox />, <FiHeart />, <FiDollarSign />]
  const handleActive = (name) => {
    setActive(name)
    setDataCategory(name)
  }

  return (
    <>
      {/* mobile */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: '10px', flexWrap: 'wrap' }}>
        {type.map((item, index) => (
          <Button
            key={item}
            sx={{
              borderRadius: '12px',
              backgroundColor: `${active === item ? '#7126B5' : '#E2D4F0'}`,
              color: `${active === item ? 'white' : 'black'}`,
              padding: '8px 12px',
              ':hover': {
                bgcolor: '#7126B5',
                color: 'white',
              },
              textTransform: 'none',
              fontSize: '14px',
            }}
            startIcon={icons[index]}
            onClick={() => handleActive(item)}
            value={item}
          >
            {item}
          </Button>
        ))}
      </Box>
      {/* desktop */}
      <Paper
        sx={{
          display: { xs: 'none', md: 'block' },
          p: 3,
          maxWidth: { xs: 268 },
          borderRadius: '1rem',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Kategori
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
          {type.map((item, index) => (
            <Box key={item}>
              <Button
                onClick={() => handleActive(item)}
                value={item}
                size="large"
                startIcon={icons[index]}
                endIcon={
                  <FiChevronRight
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 0,
                      transform: 'translate(0, -50%)',
                    }}
                  />
                }
                sx={{
                  position: 'relative',
                  textTransform: 'none',
                  width: '100%',
                  pr: 0,
                  pl: 1,
                  py: 1.5,
                  justifyContent: 'flex-start',
                  color: `${active === item ? '#7126B5' : '#8A8A8A'}`,
                }}
              >
                {item}
              </Button>
              {index !== type.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </Paper>
    </>
  )
}

export default CategoryMenu
