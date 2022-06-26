import { Container } from '@mui/material'
import { EditProfile } from '../../components/molecules/edit'
import { BackButton } from '../../components/molecules/global'

const Edit = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: '2rem' }}>
        <BackButton />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <EditProfile />
        </div>
      </Container>
    </>
  )
}

export default Edit
