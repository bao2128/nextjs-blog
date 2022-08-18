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
import { useContext } from 'react';
import { useAppContext } from '../context/AppContext';
import { usersInit } from '../.history/context/AppContext_20220725092516';

const style = {
  background : '#1976d2'
};

export default function layout({ children }) {
  const router = useRouter()
  const [users, setUsers] = useAppContext()
  console.log('here users', usersInit);
  
  const signIn = users.find(e => e.isSignIn === true)
  const uId = usersInit.findIndex(e => e.isSignIn === true)

  // console.log('logIn:', signIn);
  const signOut = () => {
    // users[signIn] = false
    usersInit[uId].isSignIn = false
    console.log('out');
    console.log('>>>users', usersInit);
    router.push('/user/sign-in')
  }
  return (
    <>
      <Head>
        <title>
          {router.pathname}
        </title>
      </Head>
      <Box sx={{ flexGrow: 1, mb: "30px"}}>
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
            {
              !signIn? (
                <>
                  <Button color="inherit" href="/user/sign-up">Sign Up</Button> 
                  <Button color="inherit" href="/user/sign-in" sx={{mr:3}}>Sign In</Button> 
                </>
              ) : (
                <Button color="inherit" onClick={signOut}>Sign Out</Button> 
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
