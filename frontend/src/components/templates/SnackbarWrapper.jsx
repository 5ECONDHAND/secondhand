import { SnackbarProvider, useSnackbar } from 'notistack'
import { IconButton } from '@mui/material'
import { FiX } from 'react-icons/fi'

const SnackbarCloseButton = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <FiX size={24} color="white" />
    </IconButton>
  )
}

const SnackbarWrapper = ({ children }) => {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        hideIconVariant
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={5000}
        action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      >
        {children}
      </SnackbarProvider>
    </>
  )
}

export default SnackbarWrapper
