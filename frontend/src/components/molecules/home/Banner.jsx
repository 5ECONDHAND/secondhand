import { Box, Stack, Typography } from '@mui/material'
import bannerCover from '../../../assets/images/banner-image.png'
import bannerGift from '../../../assets/images/banner-gift.png'

const BannerAccent = ({ position }) => {
  const styles = {}
  if (position === 'left') {
    styles.background = '#B6D4A8'
    styles.borderRadius = '0 1.25rem 1.25rem 0'
  } else if (position === 'right') {
    styles.background = '#E2D4F0'
    styles.borderRadius = '1.25rem 0 0 1.25rem'
  }

  return (
    <>
      <Box
        my={3}
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: '100%',
          maxWidth: 220,
          height: 224,
          background: styles.background,
          borderRadius: styles.borderRadius,
        }}
      />
    </>
  )
}

const BannerMain = () => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: { xs: 244, sm: 288 },
          background: {
            xs: 'linear-gradient(to bottom, #FFE9CA 70%, transparent 100%)',
            sm: '#FFE9CA',
          },
          borderRadius: { xs: 0, sm: '1.25rem' },
          overflow: 'hidden',
          mx: { xs: 0, sm: 2 },
        }}
      >
        <Box
          sx={{
            width: { xs: '60%', sm: '50%' },
            my: { xs: 3, sm: 'auto' },
            mx: { xs: 2, md: 6, xl: 10 },
          }}
        >
          <Typography
            sx={{
              fontWeight: '700',
              lineHeight: '1.2',
              fontSize: { xs: '24px', sm: '32px', ml: '36px', xl: '42px' },
            }}
          >
            Bulan Ramadhan Banyak diskon!
          </Typography>
          <Typography variant="body1" pt={1}>
            Diskon Hingga
          </Typography>
          <Typography variant="h4" color="error">
            60%
          </Typography>
        </Box>
        <Box
          component="img"
          src={bannerCover}
          alt="banner-cover"
          sx={{
            display: { xs: 'none', sm: 'block' },
            ml: 'auto',
            width: '50%',
            height: 288,
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: 288,
            background: 'linear-gradient(to right, #FFE9CA 20%, transparent 80%)',
          }}
        />
        <Box
          component="img"
          src={bannerGift}
          alt="banner-gift"
          sx={{
            position: 'absolute',
            top: { xs: '40%', sm: '50%' },
            right: { xs: '30%', sm: '40%' },
            transform: { xs: 'translate(70%, -50%)', sm: 'translate(50%, -50%)' },
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Box>
    </>
  )
}

const Banner = () => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: { xs: 0, sm: 2 } }}
      >
        <BannerAccent position="left" />
        <BannerMain />
        <BannerAccent position="right" />
      </Stack>
    </>
  )
}

export default Banner
