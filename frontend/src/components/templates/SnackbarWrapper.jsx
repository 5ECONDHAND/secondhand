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
        // sx={{
        //   '& .SnackbarContent-root': {
        //     color: '#ffffff',
        //     bgcolor: '#73CA5C',
        //     borderRadius: '12px',
        //   },
        // }}
        maxSnack={3}
        hideIconVariant
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={3000}
        action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      >
        {children}
      </SnackbarProvider>
    </>
  )
}

export default SnackbarWrapper
