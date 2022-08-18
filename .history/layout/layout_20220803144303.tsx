import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import _ from 'lodash'
import { Stack } from '@mui/material'
import Divider from '@mui/material/Divider';

const style = {
  background: '#1976d2'
}

export default function layout({ children }) {
  const router = useRouter()
  const [users, setUsers, status, setStatus] = useAppContext()

  const signIn = users.find(e => { return e.isSignIn === true })
  const uId = users.findIndex(e => e.isSignIn === true)

  useEffect(() => {
    if (!status) {
      router.push('/')
    }
    setUsers(users.filter((row) => row?.isNew !== true))
  }, [status, router.pathname])

  const tmp = router.pathname
  const path = tmp.split('/')
  const page = _.startCase(path.at(-1))

  const onSignUp = () => {
    router.push('/user/sign-up')
  }

  const onSignIn = () => {
    router.push('/user/sign-in')
  }

  const onSignOut = () => {
    setStatus('false')
    users[uId].isSignIn = false
    console.log('out')
    router.push('/user/sign-in')
  }

  return (
    <>
      <Head>
        <title>
          {page}
        </title>
      </Head>
      <Box sx={{ flexGrow: 1, mb: "30px" }}>
        <AppBar position="static" sx={style}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Stack 
                  justifyContent="center"
                  divider={<Divider orientation="vertical" flexItem />}
                  direction="row"
            >
              <Button onClick={() => { router.push('/') }} color="inherit">
                {"Home"}
              </Button>
              <Button onClick={() => { router.push('/product') }} color="inherit">
                {"Products"}
              </Button>
              <Button onClick={() => { router.push('/user/users') }} color="inherit">
                {"Users"}
              </Button>
              <Button onClick={() => { router.push('/about') }} color="inherit">
                {"About"}
              </Button>
            </Stack>
            <Typography component="div" sx={{ flexGrow: 1 }} >
              {
                !signIn ? (
                  <>
                    <Button color="inherit" variant="outlined" onClick={onSignUp} sx={{ mr: 3 }}>Sign Up</Button>
                    <Button color="inherit" variant="outlined" onClick={onSignIn} >Sign In</Button>
                  </>
                ) : (
                  <Button color="inherit" variant="outlined" onClick={onSignOut}>Sign Out</Button>
                )
              }
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        {children}
      </main>
    </>
  )
}
