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
import { USER_QUERIES } from '../queries/userQueries'
import { CircularProgress } from "@mui/material";
import AuthContext from "../store/auth-context";
import {useHistory} from "react-router-dom";
import Loader from "../components/ui/Loader";

const theme = createTheme();


function LoginScreen(props) {
    const history = useHistory();
    const authContext = React.useContext(AuthContext);
    const [loginUser, { data, loading, error }] = useMutation(
        USER_QUERIES.userLogin,
    )

    React.useEffect(()=>{
        if(data && data.loginUser) {
            authContext.setUser(data.loginUser);
            localStorage.setItem('user', JSON.stringify(data.loginUser));
        }
        if(authContext.user){
            console.log(authContext.user);
            history.replace('/tasks');
        }
    }, [data, authContext, history])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event)
        const formData = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value
        }
        console.log(formData);
        await loginUser({variables: formData});

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
                                <CssBaseline />
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: '#ffb63e' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            onSubmit={handleSubmit}
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item>
                                                <Link href="/signup" variant="body2">
                                                    {"Don't have an account? Sign Up"}
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

export default LoginScreen;
