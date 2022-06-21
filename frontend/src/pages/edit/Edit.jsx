import { Box, Grid } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { EditProfile } from '../../components/molecules/edit'
import { useNavigate } from 'react-router-dom'
const Edit = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box mt="3rem" sx={{ textAlign: 'center' }}>
        <Grid container>
          <Grid item lg={2} md={2}>
            <ArrowBack sx={{ display: { xs: 'none', md: 'block', marginLeft: 'auto' }, cursor: 'pointer' }} onClick={() => navigate(-1)} />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <EditProfile />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Edit
