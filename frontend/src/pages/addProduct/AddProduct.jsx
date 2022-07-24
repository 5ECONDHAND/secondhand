import { Container } from '@mui/material'
import { AddProductForm } from '../../components/molecules/add'
import { BackButton } from '../../components/molecules/global'

const AddProduct = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: '2rem' }}>
        <BackButton />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AddProductForm />
        </div>
      </Container>
    </>
  )
}

export default AddProduct
