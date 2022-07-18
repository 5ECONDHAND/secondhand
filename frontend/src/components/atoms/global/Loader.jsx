import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const Loader = () => {
  const location = useLocation()
  const ref = useRef(null)

  useEffect(() => {
    ref.current.complete()
  }, [location])
  return (
    <>
      <LoadingBar color="#7126B5" ref={ref} shadow={true} />
    </>
  )
}

export default Loader
