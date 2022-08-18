import { useEffect } from 'react';
import useState from 'react-usestateref' 
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

import { useAppContext } from '../../context/AppContext';
import _ from 'lodash';
// import { userList } from '../../components/interface';
import router from 'next/router';

// import Layout from '../../layout/layout';
// import User from '../api/User'
// import handler from '../api/User';
// import { userList } from '../../.history/components/interface_20220719145826';

// function Copyright(props: any) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="#">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }


const theme = createTheme();
const initialState = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}


export default function SignUp() {
    
    // useEffect(() => {
    //     document.title = 'Sign Up'
    // }, [])

    const [users, setUsers] = useAppContext()
    const [err, setErr] = useState('')
    const [user] = useState(initialState)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        //check empty field
        for (let pair of data.entries()) {
            // console.log(">>>", pair[1])
            if (!pair[1]) {
                // console.log("false:", pair[0], 'empty')
                setErr('⚠ Please fill in all text fields.')
                return
            }
        }

        setErr('')
        // console.log("users", typeof users);

        const reqEmail = data.get('email').toString().trim()
        // console.log('reqEmail', reqEmail)
        if(users.find(e => {
            // console.log('>>>compare', e.email.trim(), e.email.trim() === reqEmail)
            
            return e.email.trim() === reqEmail
        })) {
            setErr('⚠ Email already exists, please use another one.')
            return
        } else {
            // setErr('')
            // const dat = _.cloneDeep(users)
            // dat.push({
            //     firstName: 'fName',
            //     lastName: 'lName',
            //     email: 'email',
            //     password: 'password'
            // })
            // // setUsers([])
            // console.log('>>>dat',dat)
            // setUsers(_.cloneDeep(dat))
            // console.log('>>>users', users);

            setUsers(prevState => ({
                ...prevState, users: {user}
            }))
            // const response = (async () => await fetch('../api/User'))()
            // console.log('res', response);
            router.push('./sign-in')
            return
        }
    }

    function onChangeValue(e) {
        setErr('')
        console.log(e.target.id)
        switch(e.target.id) {
            case "firstName":
                user.firstName = e.target.value
                break
            case "lastName":
                user.lastName = e.target.value
                break
            case "email":
                user.email = e.target.value
                break
            case "password":
                user.password = e.target.value
                break
        }
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onFocus={e => {e.target.select()}}
                                    onChange={e => onChangeValue(e)}
                                    // error={err}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onFocus={e => {e.target.select()}}
                                    onChange={e => onChangeValue(e)}
                                // autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onFocus={e => {e.target.select()}}
                                    onChange={e => onChangeValue(e)}
                                // autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onFocus={e => {e.target.select()}}
                                    onChange={e => onChangeValue(e)}
                                // autoComplete="new-password"
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Grid sx={{mt: 2 }}>
                            {
                                err ? (
                                    <Typography  sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold'}}>
                                        {err}
                                    </Typography>
                                ) : (
                                    <Grid item xs>

                                    </Grid>
                                )
                            }
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/user/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

// SignUp.getLayout = function getLayout(page) {
//     return (
//         <Layout pageTitle={'Sign up'}>
//             {page}
//         </Layout>
//     )
// }