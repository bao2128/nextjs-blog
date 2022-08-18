// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Layout from '../../layout/layout';

import router from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { userList } from '../../components/interface'
// import ReactDOM from 'react-dom'

// import { useContext } from 'react'
import {useAppContext} from '../../context/AppContext';
// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// interface userList {
//   is: number,
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string
// }

// type inputProps = {
//   [key: string]: any
// }

const theme = createTheme();

export default function SignIn() {
  useEffect(() => {
    document.title = 'Sign In'
  }, [])

  const [err, setErr] = useState(false)
  const [users, setUsers] = useAppContext()
  // const value = useAppContext()
  console.log('value', users)
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log('users', users);
    const reqEmail = data.get('email')
    const reqPassword = data.get('password')
    // console.log({ email, password });

    // console.log('value',value);
    
    // async function fetchUsers() {
    //   const res = await fetch('/api/User')
    //   const result: userList[] = await res.json()
    //   return result
    // }
    // const r = await fetchUsers()
    // console.log("r", r);
    
    // setUsers(r)
    // console.log('users', users);
    
    const result = users.find(e => e.email === reqEmail && e.password === reqPassword)
    console.log("result", result);
    
    !result ?
        setErr(true)
      : (
          router.push('/user')
          // setUsers({...users, })
        )
  };

  function onChangeValue() {
    
    setErr(false)
    console.log('here', err);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {
              <>
                <TextField
                  error={err}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={onChangeValue}
                  // helperText={err ? "Incorrect entry." : ""}
                  // onChange={e => setErr(false)}
                />
                <TextField
                  error={err}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  // id="password"
                  autoComplete="current-password"
                  onChange={onChangeValue}
                  // helperText={err ? "Incorrect entry." : ""}
                  // onChange={e => setErr(false)}
                />
              </>
            }
            {
              err ? (
                <Typography sx={{color: 'red', fontWeight: 'Light'}}>
                  {'⚠ Incorrect Email or Password'}
                </Typography>
              ) : ('')
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/user/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

// SignIn.getLayout = function getLayout(page) {
//   return (
//     <Layout pageTitle={'Sign in'}>
//       {page}
//     </Layout>
//   )
// }
