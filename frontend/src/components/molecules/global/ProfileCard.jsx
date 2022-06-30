import { Avatar, Button, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProfileCard = (props) => {
  const { display, sellerName, sellerCity } = props
  const navigate = useNavigate()
  return (
    <>
      <Paper
        sx={{
          minWidth: { lg: 336, md: 'auto', xs: '100%' },
          borderRadius: '1rem',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          padding={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt="A" src={''} sx={{ width: 56, height: 56, borderRadius: '12px' }} />
            <Stack direction="column">
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {sellerName ? sellerName : 'sellerName'}
              </Typography>
              <Typography variant="body2">{sellerCity ? sellerCity : 'sellerCity'}</Typography>
            </Stack>
          </Stack>
          {display === 'sales' ? (
            <>
              <Button
                variant="contained"
                disableElevation
                size="small"
                sx={{
                  borderRadius: '0.75rem',
                  textTransform: 'none',
                  border: '1px solid #7126B5',
                  background: '#ffffff',
                  color: '#000000',
                  '&:hover': {
                    background: '#7126B5',
                    color: '#ffffff',
                  },
                }}
                onClick={() => navigate('/edit')}
              >
                Edit
              </Button>
            </>
          ) : (
            ''
          )}
        </Stack>
      </Paper>
    </>
  )
}

export default ProfileCard
