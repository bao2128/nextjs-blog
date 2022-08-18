import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'

import router from 'next/router'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import _ from 'lodash'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSnackbar } from 'notistack';

// type inputProps = {
//   [key: string]: any
// }

export default function SignIn() {
  // useEffect(() => {
  //   document.title = 'Sign In'
  // }, )

  const [err, setErr] = useState(false)
  const [users, setUsers, status, setStatus, isDisabled, setIsDisabled, alertMessage, setAlertMessage] = useAppContext()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    if (status === 'true') {
    router.push('/')
  }},[])
  // console.log('value', users)

  const myTheme = useTheme()


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log('users', users)
    const reqEmail = data.get('email').toString()
    const reqPassword = data.get('password').toString()
    // console.log({ reqEmail, reqPassword })

    const result = users.find(e => {
        // console.log(e, e.email === reqEmail && e.password === reqPassword )
        return e.email === reqEmail && e.password === reqPassword
        
      })
    // users.map(e => {return e})
    // console.log('result', result)
    
    const tmpId = users.findIndex(obj => {return obj === result})
    
    // console.log("result", result)
    if (tmpId === -1) {
      // router.push('/user/sign-in')
      // router.replace(router.asPath)
      setErr(true)
      setStatus('false')
    }
    else {
      
      setErr(false)
      const tmp = _.cloneDeep(users)
      tmp[tmpId].isSignIn = true
      setUsers(_.cloneDeep(tmp))
      localStorage.setItem('status', 'true')
      // router.push('/user/users')
      setIsDisabled(true)
      // setAlertMessage('Sign in successfully!')
      enqueueSnackbar('Sign in successfully!', { variant: 'red' })
      setTimeout(() => {
        router.push('/user/users')
        setStatus('true')
      }, 3000)
    }
  }

  const onChangeValue = () => {

    setErr(false)
    // console.log('here', err)
  }

  const signUp = () => {
    router.push('/user/sign-up')
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: myTheme.palette.primary.main }}>
            <PersonOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {
              <>
                <TextField
                  disabled={isDisabled}
                  error={err}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onFocus={e => { e.target.select() }}
                  onChange={onChangeValue}
                  sx={{
                    '& fieldset': {
                    borderRadius: myTheme.shape.borderRadius,
                }}}
                // helperText={err ? "Incorrect entry." : ""}
                // onChange={e => setErr(false)}
                />
                <TextField
                  disabled={isDisabled}
                  error={err}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  // id="password"
                  autoComplete="current-password"
                  onFocus={e => { e.target.select() }}
                  onChange={onChangeValue}
                  sx={{
                    '& fieldset': {
                    borderRadius: myTheme.shape.borderRadius,
                }}}
                // helperText={err ? "Incorrect entry." : ""}
                // onChange={e => setErr(false)}
                />
              </>
            }
            {
              err ? (
                <Typography sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold', mt: 2 }}>
                  {'⚠ Incorrect Email or Password.'}
                </Typography>
              ) : (
                <Grid item xs>

                </Grid>
              )
            }
            <LoadingButton
              disabled = {isDisabled}
              startIcon={<LoginOutlinedIcon />}
              type="submit"
              fullWidth
              variant="contained"
              loading={isDisabled}
              sx={{ 
                mt: 3, 
                mb: 2, 
                borderRadius: myTheme.shape.borderRadius,
                backgroundColor: myTheme.palette.info.main,
            }}
            >
              Sign In
            </LoadingButton>
            <Grid container justifyContent="flex-end" sx={{mt: 2}}>
              <Grid item>
                <Link onClick={signUp} type="button" variant="body2" underline="hover">
                  {"Don't have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isOpen}
          onClose={handleClose}
          message="Sign in successfully!"
          // key={vertical + horizontal}
          autoHideDuration={3000}
        /> */}
        {/* <Snackbar open={isDisabled} 
                  autoHideDuration={3000} 
                  // onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="success" sx={{ width: '100%', backgroundColor: '#0288d1' }}>
            Sign in successfully!
          </Alert>
        </Snackbar> */}
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </>
  )
}
