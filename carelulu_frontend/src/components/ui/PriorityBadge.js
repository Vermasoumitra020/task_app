import React from 'react';
import {Badge, Box} from "@mui/material";

function PriorityBadge(props) {
    return (
        <Box >
            {
                props.priority === '2' ?
                    (<Badge badgeContent={' '} color='error' variant={props.variant} />) :
                    props.priority === '1' ? (<Badge badgeContent={' '} color='warning' variant={props.variant} />) :
                        (<Badge badgeContent={' '} color='primary' variant={props.variant} />)
            }
        </Box>
    );
}

export default PriorityBadge;
