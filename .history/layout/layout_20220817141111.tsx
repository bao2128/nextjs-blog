import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import _ from 'lodash'
import { Snackbar, Stack, useTheme } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import { useSnackbar } from 'notistack'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function layout({ children }) {
  const router = useRouter()
  const [users, setUsers, status, setStatus, isDisabled, setIsDisabled, alertMessage, setAlertMessage] = useAppContext()
  const myTheme = useTheme()
  const {enqueueSnackbar} = useSnackbar()

  const signIn = users.find(e => { return e.isSignIn === true })
  const uId = users.findIndex(e => e.isSignIn === true)

  const tmp = router.pathname
  const path = tmp.split('/')
  const page = _.startCase(path.at(-1))
  
  useEffect(() => {
    console.log('>>>status', status);
    setUsers(users.filter((row) => row?.isNew !== true))
  }, [status])

  const onSignUp = () => {
    router.push('/user/sign-up')
  }

  const onSignIn = () => {
    router.push('/user/sign-in')
  }

  const onSignOut = () => {
    setStatus('false')
    localStorage.setItem('status', 'false')
    users[uId].isSignIn = false
    console.log('out')
    setIsDisabled(false)
    // setAlertMessage('You have signed out!')
    enqueueSnackbar('You have signed out!', { variant: 'warning' })
    router.push('/user/sign-in')
  }
  return (
    <>
      <Head>
        <title>
          {page? page : 'Home'}
        </title>
      </Head>
      <Box sx={{ flexGrow: 1, mb: "30px" }}>
        <AppBar position="static" sx={{background: myTheme.palette.info.main}}>
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
              // spacing={1}
              sx={{ flexGrow: 1 }}
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
            <Typography component="div" >
              {
                !signIn ? (
                  <>
                    <Button
                    startIcon={<HowToRegOutlinedIcon />}
                      color="inherit" 
                      variant="outlined" 
                      onClick={onSignUp} 
                      sx={{ mr: 3, borderRadius: myTheme.shape.borderRadius }}
                      >
                        Sign Up
                      </Button>
                    <Button 
                      startIcon={<LoginOutlinedIcon />}
                      color="inherit" 
                      variant="outlined" 
                      onClick={onSignIn} 
                      sx={{ borderRadius: myTheme.shape.borderRadius }}
                      >
                        Sign In
                      </Button>
                  </>
                ) : (
                  <Button 
                    startIcon={<LogoutOutlinedIcon />}
                    color="inherit" 
                    variant="outlined" 
                    onClick={onSignOut} 
                    sx={{ borderRadius: myTheme.shape.borderRadius }}
                  >
                    Sign Out
                  </Button>
                )
              }
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <Snackbar open={!!alertMessage.trim()}
                  autoHideDuration={5000} 
                  onClose={() => setAlertMessage('')}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="success" sx={{ width: '100%', backgroundColor: myTheme.palette.info.main }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <>{console.log('alertMessage', alertMessage)}</> */}
      </Box>
      <main>
        {children}
      </main>
    </>
  )
}
