import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Head from 'next/head'

// import './register.module.css'
const style = {
  background : '#1976d2'
};

export default function layout({ children }) {
  return (
    <>
      <Head>
        <title>
          {pageTitle + " Page"}
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
              {pageTitle + " Page"}
            </Typography>

            {/* <Button color="inherit" href="/user/register">Register</Button>  */}
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        {children}
      </main>
    </>
  );
}
