import { Container } from '@mui/material'
import { AddProduct } from '../../components/molecules/add'
import { BackButton } from '../../components/molecules/global'

const Add = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: '2rem' }}>
        <BackButton />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AddProduct />
        </div>
      </Container>
    </>
  )
}

export default Add
