import React from 'react';
import {Box, CircularProgress} from "@mui/material";

function Loader(props) {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
        }}>
            <CircularProgress />
        </Box>
    );
}

export default Loader;
