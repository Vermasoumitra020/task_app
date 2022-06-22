import React from 'react';
import TaskTable from "../components/ui/TaskTable";
import {Box, Chip, Grid, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Tooltip} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskForm from "../components/ui/TaskForm";
import {useMutation, useQuery} from "@apollo/client";
import {TASK_QUERIES} from "../queries/taskQueries";
import Loader from "../components/ui/Loader";
import {USER_QUERIES} from "../queries/userQueries";
import {useHistory, useLocation} from "react-router-dom";

const useQueryParams = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams( search ));
}

function TaskScreen(props) {
    const query = useQueryParams();
    const history = useHistory();

    const [createTaskDisplay, setCreateTaskDisplay] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);
    const [taskPagination, setTaskPagination] = React.useState([]);
    const filterDataValues = {
        priority: query.get('priority') || null,
        is_completed: query.get('is_completed') || null
    };


    let limit = +query.get('limit') || 10;
    let page = +query.get('page') || 0;

    const [createTask, { data : createdData, loading: createdLoading, error: createdError }] = useMutation(
        TASK_QUERIES.taskCreate, {
            refetchQueries: [
                {query: TASK_QUERIES.taskList},
                'listTasks'
            ]
        }
    )

    const limitChangeHandler = (newPageSize) => {
        let url = `/tasks?page=${page}&limit=${newPageSize}`;
        if(filterDataValues.priority) {
            url = `${url}&priority=${filterDataValues.priority}`
        }
        if(filterDataValues.is_completed) {
            url = `${url}&is_completed=${filterDataValues.is_completed}`
        }
        history.push(url);
    }

    const pageChangeHandler = (newPage) => {
        let url = `/tasks?page=${newPage}&limit=${limit}`;
        if(filterDataValues.priority) {
            url = `${url}&priority=${filterDataValues.priority}`
        }
        if(filterDataValues.is_completed) {
            url = `${url}&is_completed=${filterDataValues.is_completed}`
        }
        history.push(url);
    }

    const filterChangeHandler = (newFilters) => {
        let url = `/tasks?page=${page}&limit=${limit}`;
        if(newFilters.priority) {
            url = `${url}&priority=${newFilters.priority}`
        }
        if(newFilters.is_completed) {
            url = `${url}&is_completed=${newFilters.is_completed}`
        }
        history.push(url);
    }

    const handleCreateSubmit = async (event, taskData) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            id: taskData.id,
            description: taskData.description,
            is_completed: taskData.is_completed,
            priority: taskData.priority
        }
        console.log('data', taskData)
        await createTask({variables: {taskData: formData}});
    };

    const createTaskHandler = () => {
        setCreateTaskDisplay(true);
    }
    const { data, loading, error } = useQuery(
        TASK_QUERIES.taskList,
        {
            variables: {
                taskData: {
                    limit: limit,
                    from: page,
                    priority: filterDataValues.priority,
                    is_completed: filterDataValues.is_completed && filterDataValues.is_completed !== 'pending',
                }
            }
        }
    )


    React.useEffect(()=>{
        if(data){
            console.log(data.listTasks.data);
            console.log(limit, page);
            setTasks(data.listTasks.data);
            setTaskPagination(data.listTasks.pageInfo);
        }
    }, [data, limit, page, filterDataValues])

    return (
        <div>
            <Modal
                open={createTaskDisplay}
                onClose={() => setCreateTaskDisplay(false)}
                sx={{justifyContent: 'center', alignItems:'center', display:'flex'}}
            >
                <TaskForm mode={'Create'}
                          onSubmitHandler={handleCreateSubmit}
                          onClose={() => setCreateTaskDisplay(false)}
                          loading={createdLoading}
                />
            </Modal>

            <Grid container
                  sx={{mb:2,}}>
                <Grid container item sx={{padding:'1rem'}} spacing={2}>
                    <Grid item xs >
                        <Box sx={{
                            borderRadius: '1rem',
                            // boxShadow: '2px 2px 10px #ccc',
                            border: '1px solid #e5e5e5',
                            padding: '1rem',
                        }}>
                            <Grid container spacing={4} sx={{
                                justifyContent: 'left',
                                alignItems: 'center'
                            }}>
                                <Grid item xs={1}>
                                    <b>Filter</b>
                                </Grid>

                                <Grid item xs={2}>
                                    <InputLabel id="open-priority-select-label" sx={{fontSize: '0.8rem'}}>Priority</InputLabel>
                                    <Select
                                        labelId={'open-priority-select-label'}
                                        sx={{width: '100%'}}
                                        id="open-priority-select"
                                        value={filterDataValues.priority}
                                        label="Priority"
                                        size={'small'}
                                        onChange={(event) => {
                                            filterChangeHandler({
                                                ...filterDataValues,
                                                priority: event.target.value
                                            })
                                        }}
                                    >
                                        <MenuItem value={null}>None</MenuItem>
                                        <MenuItem value={'0'}>Low</MenuItem>
                                        <MenuItem value={'1'}>Medium</MenuItem>
                                        <MenuItem value={'2'}>High</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={2}>
                                    <InputLabel id="open-status-select-label" sx={{fontSize: '0.8rem'}}>Status</InputLabel>
                                    <Select
                                        labelId={'open-status-select-label'}
                                        sx={{width: '100%'}}
                                        id="open-status-select"
                                        value={filterDataValues.is_completed}
                                        label="Status"
                                        size={'small'}
                                        onChange={(event) => {
                                            filterChangeHandler({
                                                ...filterDataValues,
                                                is_completed: event.target.value
                                            })
                                        }}
                                    >
                                        <MenuItem value={null}>None</MenuItem>
                                        <MenuItem value={'pending'}>Pending</MenuItem>
                                        <MenuItem value={'completed'}>Completed</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Tooltip title={'Create Task'} >
                            <IconButton sx={{
                                padding:'1rem',
                                mt:2,
                                // mr:2,
                                bgcolor:"#3974cb",
                                '&:hover': {
                                    backgroundColor:'#88abdf'
                                }
                            }}>
                                <AddTaskIcon sx={{fontSize:'2rem', color:'white'}} onClick={createTaskHandler}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{padding:'0 1rem'}}>
                    <Stack direction="row" spacing={1}>
                        {filterDataValues.priority && <Chip label={filterDataValues.priority === '0' ? 'Prority: Low' :
                                                                    filterDataValues.priority === '1' ? 'Prority: Medium' : 'Prority: High'}
                                                            onDelete={() => filterChangeHandler({...filterDataValues, priority: null})}/>}
                        {filterDataValues.is_completed && <Chip label={`Status: ${filterDataValues.is_completed}`}
                                                                onDelete={() => filterChangeHandler({...filterDataValues, is_completed: null})}/>}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {loading ? <Loader /> : (<TaskTable tasks={[...tasks]}
                                                        count={taskPagination.count}
                                                        limit={limit}
                                                        page={page}
                                                        onLimitChange={limitChangeHandler}
                                                        onPageChange={pageChangeHandler}

                    />)}

                </Grid>
            </Grid>
        </div>
    );
}

export default TaskScreen;
