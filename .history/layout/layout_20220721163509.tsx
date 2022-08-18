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
const style = {
  background : '#1976d2'
};

export default function layout({ children }) {
  const router = useRouter().pathname
  const [users, setUsers] = useAppContext()
  const signIn = users.find(e => e.isSignIn === true)
  console.log('logIn:', signIn);
  const signOut = () => {
    // users[signIn] = false
    setUsers(users[signIn] = false)
  }
  return (
    <>
      <Head>
        <title>
          {router}
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
