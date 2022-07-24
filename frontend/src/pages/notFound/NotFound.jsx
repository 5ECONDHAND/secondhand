import Loader from '../../components/atoms/global/Loader'

const NotFound = () => {
  return (
    <>
      <Loader />
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>404, the page you are looking for does not exist</h2>
      </div>
    </>
  )
}

export default NotFound
