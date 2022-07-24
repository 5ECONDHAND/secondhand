import { useState } from 'react'
import { Avatar, Box, Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../../redux/slices/userSlice'

const ProfileCard = (props) => {
  const { display, sellerName, sellerCity, profile } = props
  const navigate = useNavigate()
  const userActive = useSelector(selectUser)
  const [loading, setLoading] = useState(true)
  const image_storage_url = `https://febesh5-dev.herokuapp.com/api/storages/${profile?.Photos[0]?.storageId}/preview`

  const loadImage = () => {
    setLoading(false)
  }

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
            <Box>
              {profile?.Photos.length !== 0 ? (
                <>
                  <Avatar
                    alt="A"
                    onLoad={loadImage}
                    src={image_storage_url}
                    sx={{
                      display: loading ? 'none' : 'block',
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      display: loading ? 'block' : 'none',
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                    }}
                  />
                </>
              ) : (
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '12px',
                  }}
                />
              )}
            </Box>

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
                onClick={() => navigate(`/edit/${userActive.id}`)}
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
