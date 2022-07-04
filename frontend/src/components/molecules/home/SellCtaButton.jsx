import { Button } from '@mui/material'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const SellCtaButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      variant="contained"
      size="large"
      startIcon={<FiPlus />}
      onClick={() => navigate('/add')}
      sx={{
        position: 'fixed',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '0.75rem',
        textTransform: 'none',
        boxShadow: '0 0.25rem 1rem rgba(105, 2, 198, 0.63) !important',
        background: '#7126B5',
        '&:hover': {
          background: '#631fa1',
        },
      }}
    >
      Jual
    </Button>
  )
}

export default SellCtaButton
