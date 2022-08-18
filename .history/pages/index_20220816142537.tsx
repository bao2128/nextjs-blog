import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

function home() {
  const [status, setStatus] = useAppContext()
  // if (status === 'true') {
  //   router.push('/')
  // }
  useEffect(() => {
    // Perform localStorage action
    localStorage.setItem('status', 'false')
    setStatus(localStorage.getItem('status'))
  }, [])
  return (
    <h1>Home Page</h1>
  )
}

export default home
