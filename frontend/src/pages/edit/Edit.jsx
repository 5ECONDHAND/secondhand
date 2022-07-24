import { Container } from '@mui/material'
import Loader from '../../components/atoms/global/Loader'
import { EditProfileForm } from '../../components/molecules/edit'
import { BackButton, Navbar } from '../../components/molecules/global'

const Edit = () => {
  return (
    <>
      <Loader />
      <Navbar />
      <Container maxWidth="lg" sx={{ py: '2rem' }}>
        <BackButton />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <EditProfileForm />
        </div>
      </Container>
    </>
  )
}

export default Edit
