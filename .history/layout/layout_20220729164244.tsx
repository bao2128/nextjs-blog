import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Head from 'next/head'
import { useRouter } from 'next/router';
// import './register.module.css'
import { useContext, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from '@mui/material';

const style = {
  background: '#1976d2'
};

export default function layout({ children }) {
  const router = useRouter()
  const [users, setUsers, status, setStatus] = useAppContext()
  // console.log('here users', users);

  const signIn = users.find(e => { return e.isSignIn === true })
  const uId = users.findIndex(e => e.isSignIn === true)

  // console.log('logIn:', signIn);


  //   useEffect(() => {
  //     if (!status) {
  //         router.push('/')
  //     }}
  // , [])

  let tmp = router.pathname
  let path = tmp.split('/')

  console.log('path:', path);
  

  const onSignUp = () => {
    router.push('/user/sign-up')
  }

  const onSignIn = () => {
    router.push('/user/sign-in')
  }

  const onSignOut = () => {
    users[uId].isSignIn = false
    console.log('out');
    setStatus('false')
    router.push('/user/sign-in')
  }

  return (
    <>
      <Head>
        <title>
          {router.pathname}
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

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {children.pageTitle + " Page"}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button onClick={() => { router.push('/user'); }} color="inherit">
                {"User"}
              </Button>
              {/* {children.pageTitle + " Page"} */}
            </Typography>
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
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        {children}
      </main>
    </>
  );
}
