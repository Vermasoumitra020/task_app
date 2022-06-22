import React from 'react';
import Paper from '@mui/material/Paper';
import {Badge, Box, Button, Chip, Divider, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PriorityBadge from "./PriorityBadge";
import {HELPERS} from "../../utils/helpers";

function Task(props) {

    return (
        <Box sx={{
            width: '40%',
            bgcolor: 'background.paper',
            padding: '1rem',
            margin: 'auto',
            borderRadius: '0.5rem'
        }}>
            <Box sx={{ my: 1, mx: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" color='text.secondary' component="div">
                            <Grid container item xs>
                                <Grid item xs={0.5}>
                                    <PriorityBadge priority={props.task.priority} variant={'dot'}/>
                                </Grid>
                                <Grid item>
                                    Task #{props.task.id}
                                </Grid>

                            </Grid>

                        </Typography>
                    </Grid>

                </Grid>
                <Typography  variant="body3">
                    {props.task.description}
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mx: 2, my:1 }}>
                <Grid container alignItems={'center'}>
                    <Grid item xs>
                        <Typography gutterBottom variant="body1">
                            Status
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {props.task.is_completed ? (<Chip color='success' label="Completed" />) : (<Chip color='warning' label="Pending" />)}
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom color='text.secondary' variant="body2">
                            Created At: {HELPERS.getDateTime(props.task.created_at)}
                        </Typography>
                        <Typography gutterBottom color='text.secondary' variant="body2">
                            Last Modified: {HELPERS.getDateTime(props.task.updated_at)}
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}

export default Task;
