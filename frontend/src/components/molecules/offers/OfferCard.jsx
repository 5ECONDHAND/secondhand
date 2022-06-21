import { useEffect, useState } from 'react'
import { Avatar, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { toRupiah } from '../../../utils/functions'
import { FaWhatsapp } from 'react-icons/fa'
import OfferModal from './OfferModal'
import dummy from '../../../assets/images/dummy-image.jpg'

const OfferCard = (props) => {
  const [accept, setAccept] = useState(false)
  const [open, setOpen] = useState(false)
  const handleAccept = () => setAccept(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    console.log('accept', accept)
  }, [accept])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar alt="" src={dummy} sx={{ width: 56, height: 56, borderRadius: '12px' }} />
              <Stack direction="column">
                <Typography variant="body2" sx={{ color: '#8A8A8A', mb: 0.5 }}>
                  Penawaran Produk
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500', mb: 0.5 }}>
                  {'Nama Produk'}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500', mb: 0.5 }}>
                  {toRupiah(250000)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Ditawar {toRupiah(200000)}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="body2" sx={{ color: '#8A8A8A' }}>
              {'20 Apr, 14:04'}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Stack direction="row" spacing={2} justifyContent={mobile ? 'center' : 'flex-end'}>
            <Button
              fullWidth={mobile ? true : false}
              variant="contained"
              size="large"
              disableElevation
              sx={{
                width: mobile ? null : 158,
                borderRadius: '1.25rem',
                textTransform: 'none',
                background: '#ffffff',
                color: '#000000',
                border: '1px solid #7126B5',
                py: '0.5rem',
                '&:hover': { color: '#ffffff', background: '#631fa1' },
              }}
            >
              {accept ? 'Status' : 'Tolak'}
            </Button>
            <Button
              onClick={handleOpen}
              fullWidth={mobile ? true : false}
              variant="contained"
              size="large"
              disableElevation
              endIcon={accept ? <FaWhatsapp /> : null}
              sx={{
                width: mobile ? null : 158,
                borderRadius: '1.25rem',
                textTransform: 'none',
                background: '#7126B5',
                border: '1px solid #7126B5',
                py: '0.5rem',
                '&:hover': {
                  background: '#631fa1',
                },
              }}
            >
              {accept ? 'Hubungi di' : 'Terima'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <OfferModal open={open} handleClose={handleClose} handleAccept={handleAccept} />
    </>
  )
}

export default OfferCard
