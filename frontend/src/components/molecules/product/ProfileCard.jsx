import { Avatar, Paper, Stack, Typography } from '@mui/material'

const ProfileCard = () => {
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
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          padding={2}
        >
          <Avatar alt="A" src={''} sx={{ width: 56, height: 56, borderRadius: '12px' }} />
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {'Nama Penjual'}
            </Typography>
            <Typography variant="body2">{'Kota'}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

export default ProfileCard
