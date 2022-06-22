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
import {Checkbox, FormControlLabel, InputLabel, MenuItem, Select} from "@mui/material";
import {useHistory} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import {useMutation} from "@apollo/client";
import {USER_QUERIES} from "../../queries/userQueries";
import {TASK_QUERIES} from "../../queries/taskQueries";
import Loader from "./Loader";


const theme = createTheme();

const initialTaskData = {
    id: null,
    description: null,
    is_completed: false,
    priority: '0'
}

function TaskForm(props) {
    const [taskData, setTaskData] = React.useState(props.task || initialTaskData)

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.onSubmitHandler(event, taskData);
        props.onClose();
    };

    const taskDataChangeHandler = (key, value) =>{
        let newData = {...taskData};
        newData[key] = value;
        setTaskData(newData);
    }
    return (
        <div>{
            props.loading ? <Loader /> : (<ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'background.paper',
                            padding: '1rem 2rem',
                            borderRadius: '0.5rem'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            {props.mode} Task {taskData.id && `#${taskData.id}`}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="description"
                                        name="description"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        autoFocus
                                        value={taskData.description}
                                        onChange={(event) => {
                                            taskDataChangeHandler('description', event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            label="Completed"
                                            control={
                                                <Checkbox
                                                    id="is_completed"
                                                    name="is_completed"
                                                    label="Completed"
                                                    checked={taskData.is_completed}
                                                    onChange={(event) => {
                                                        console.log(event.target.checked);
                                                        taskDataChangeHandler('is_completed', event.target.checked);
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                        <Select
                                            sx={{width: '100%'}}
                                            labelId="priority"
                                            id="priority"
                                            value={taskData.priority}
                                            label="Priority"
                                            onChange={(event) => {
                                                taskDataChangeHandler('priority', event.target.value);
                                            }}
                                        >
                                            <MenuItem value={'0'}>Low</MenuItem>
                                            <MenuItem value={'1'}>Medium</MenuItem>
                                            <MenuItem value={'2'}>High</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {props.mode}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>)
        }</div>

    );
}

export default TaskForm;
