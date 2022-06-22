import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useMutation} from "@apollo/client";
import {USER_QUERIES} from "../queries/userQueries";
import {CircularProgress} from "@mui/material";
import AuthContext from "../store/auth-context";
import {useHistory} from "react-router-dom";
import Loader from "../components/ui/Loader";


const theme = createTheme();

function SignupScreen() {
    const authContext = React.useContext(AuthContext);
    const history = useHistory();
    const [createUser, { data, loading, error }] = useMutation(
        USER_QUERIES.userRegister,
    )

    React.useEffect(()=>{
        console.log(data)
        if(data && data.createUser) {
            authContext.setUser(data.createUser);
            localStorage.setItem('user', JSON.stringify(data.createUser));
        }
        if(authContext.user){
            console.log(authContext.user);
            history.replace('/tasks');
        }
    }, [data, authContext, history]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
            email: event.target.elements.email.value,
            first_name: event.target.elements.firstName.value,
            last_name: event.target.elements.lastName.value,

        };
        await createUser({variables: {userData: formData}});
    };

    return (
        <div>
            {
                loading ? <Loader /> :
                    (
                        <div>
                            {error && <div>Error</div>}
                            <ThemeProvider theme={theme}>
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline/>
                                    <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar sx={{m: 1, bgcolor: '#ffb63e'}}>
                                            <LockOutlinedIcon/>
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Sign up
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        autoComplete="given-name"
                                                        name="firstName"
                                                        required
                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        autoFocus
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        autoComplete="family-name"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="username"
                                                        label="Username"
                                                        id="username"
                                                        autoComplete="username"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
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
                                                        autoComplete="new-password"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{mt: 3, mb: 2}}
                                            >
                                                Sign Up
                                            </Button>
                                            <Grid container justifyContent="flex-end">
                                                <Grid item>
                                                    <Link href="/login" variant="body2">
                                                        Already have an account? Sign in
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Container>
                            </ThemeProvider>
                        </div>
                    )
            }
        </div>
    );
}

export default SignupScreen;
