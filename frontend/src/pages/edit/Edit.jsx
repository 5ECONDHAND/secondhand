import { Box, Container, Grid } from '@mui/material'
import { EditProfile } from '../../components/molecules/edit'
import { BackButton } from '../../components/molecules/global'

const Edit = () => {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Container
          maxWidth="lg"
          sx={{ pt: { xs: "1rem", md: "2rem" }, pb: "1rem"}}
        >
        <BackButton />
        <Grid container spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <EditProfile />
          </Grid>
        </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Edit
