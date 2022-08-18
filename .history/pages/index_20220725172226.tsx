import Link from 'next/Link'
import router from 'next/router'
import { useEffect, useContext } from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../layout/layout'
import Grid from '@mui/material/Grid';

function home() {
  const [status] = useAppContext()
  if (status === 'true') {
    router.push('/')
  }
  return (
    // <div>
    //   <Link onClick={() => {router.push('/user/sign-in')}} variant="body2">
    //     <a>Product</a>
    //   </Link>
    // </div>
    <>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link onClick={() => { router.push('/user/sign-in') }} variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default home
