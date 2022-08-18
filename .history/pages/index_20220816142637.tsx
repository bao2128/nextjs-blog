import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

function home() {
  const [status, setStatus] = useAppContext()
  // if (status === 'true') {
  //   router.push('/')
  // }
  return (
    <h1>Home Page</h1>
  )
}

export default home
