import { Grid } from '@mui/material'
import Link from 'next/Link'
import router from 'next/router'
import { useAppContext } from '../context/AppContext'

function home() {
  const [status] = useAppContext()
  if (status === 'true') {
    router.push('/')
  }
  return (
    <Grid >
      <Grid item>
        <Link href={'/product'}>
          <a>
            Product
          </a>
        </Link>
      </Grid>
    </Grid>
  )
}

export default home
