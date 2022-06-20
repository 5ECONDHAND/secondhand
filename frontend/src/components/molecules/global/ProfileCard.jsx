import { Avatar, Button, Paper, Stack, Typography } from '@mui/material'

const ProfileCard = (props) => {
  const { display } = props

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
                {'Nama Penjual'}
              </Typography>
              <Typography variant="body2">{'Kota'}</Typography>
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