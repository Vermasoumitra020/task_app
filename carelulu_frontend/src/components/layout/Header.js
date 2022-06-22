import React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import classes from './style/Header.module.css'
import Logo from "../ui/Logo";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AuthContext from "../../store/auth-context";
import {client} from "../../config";

function Header(props) {
    const authContext = React.useContext(AuthContext);
    const logoutHandler = () => {
        localStorage.removeItem('user');
        authContext.setUser(null);
        client.resetStore();
    }
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" className={classes['nav-bar']}>
                <Toolbar variant={'dense'}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Logo />
                    </Typography>
                    {authContext.user && <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button variant="contained" {...bindTrigger(popupState)}
                                        sx={{
                                            backgroundColor:'#ffb63e',
                                            marginRight: '7rem',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor:'#ffb63e'
                                            }
                                        }}
                                >
                                    Menu <KeyboardArrowDownIcon />
                                </Button>
                                <Menu {...bindMenu(popupState)} >
                                    <MenuItem >{authContext.user.username}</MenuItem>
                                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
