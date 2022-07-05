import { Alert, IconButton, Snackbar } from '@mui/material'
import { FiX } from 'react-icons/fi'

const CustomAlert = (props) => {
  const { snackState, handleCloseSnack } = props
  const { vertical, horizontal, openSnack } = snackState

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
        <FiX size={24} />
      </IconButton>
    </>
  )
  // const [snackState, setSnackState] = useState({
  //   openSnack: false,
  //   vertical: 'top',
  //   horizontal: 'center',
  // })

  // const { vertical, horizontal, openSnack } = snackState

  // const handleClick = (newState) => () => {
  //   setSnackState({ openSnack: true, ...newState })
  // }

  // const handleClose = () => {
  //   setSnackState({ ...snackState, openSnack: false })
  // }

  // const buttons = (
  //   <>
  //     <Button
  //       onClick={handleClickSnack({
  //         vertical: 'top',
  //         horizontal: 'center',
  //       })}
  //     >
  //       Top-Center
  //     </Button>
  //   </>
  // )

  return (
    <>
      <div>
        {/* <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          message="Harga tawarmu berhasil dikirim ke penjual"
          sx={{ background: '#2196f3' }}
        /> */}

        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          message="Harga tawarmu berhasil dikirim ke penjual"
          action={action}
          sx={{ backgroundColor: 'green' }}
        >
          <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
            Harga tawarmu berhasil dikirim ke penjual
          </Alert>
        </Snackbar>

        {/* <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          message="Note archived"
          action={action}
          sx={{ backgroundColor: 'transparent', color: 'green' }}
        /> */}
      </div>
    </>
  )
}

export default CustomAlert
