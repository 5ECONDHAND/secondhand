import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { FiSearch } from 'react-icons/fi'

const CategoryFilter = ({ setDataCategory }) => {
  const [active, setActive] = useState('Semua')
  const type = ['Semua', 'Hobi', 'Kendaraan', 'Baju', 'Elektronik', 'Kesehatan']
  const handleActive = (name) => {
    setActive(name)
    setDataCategory(name)
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
        {type.map((item) => (
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
            startIcon={<FiSearch />}
            onClick={() => handleActive(item)}
            value={item}
          >
            {item}
          </Button>
        ))}
      </Box>
    </>
  )
}

export default CategoryFilter
