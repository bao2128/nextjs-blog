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
    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
      <Grid item>
        <Link onClick={router.push('/product')} type="button" variant="body2" underline="hover">
          {"Product"}
        </Link>
      </Grid>
    </Grid>
  )
}

export default home
