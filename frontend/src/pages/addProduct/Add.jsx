import { Container } from '@mui/material'
import { AddProduct } from '../../components/molecules/add'
import { BackButton } from '../../components/molecules/global'

const Add = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: '2rem', textAlign: 'center' }}>
        <BackButton />
        <AddProduct />
      </Container>
    </>
  )
}

export default Add
