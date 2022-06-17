import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../redux/slices/counterSlice'

const Home = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  console.log(count)

  return (
    <>
      <div>
        TESTING REACT REDUX TOOLKIT
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </>
  )
}

export default Home
