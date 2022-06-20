import { Box, Grid } from '@mui/material'
import { AddProduct } from '../../components/molecules/add'
import ArrowBack from '@mui/icons-material/ArrowBack'

const Add = () => {
  return (
    <>
      <Box mt="3rem" sx={{ textAlign: 'center' }}>
        <Grid container>
          <Grid item lg={2} md={2}>
            <ArrowBack sx={{ display: { xs: 'none', md: 'block', marginLeft: 'auto' } }} />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <AddProduct />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Add
