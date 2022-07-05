import { Box } from '@mui/material'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <FiArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
      </Box>
    </>
  )
}

export default BackButton
