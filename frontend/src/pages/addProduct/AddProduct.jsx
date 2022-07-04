import { Container } from '@mui/material'
import { AddProductForm } from '../../components/molecules/add'
import { BackButton, Navbar } from '../../components/molecules/global'

const AddProduct = () => {
  return (
    <>
      <Navbar />
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
