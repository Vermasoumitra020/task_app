import * as React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Badge, Chip, IconButton, Modal, Stack, Tooltip, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Task from "./Task";
import TaskForm from "./TaskForm";
import PriorityBadge from "./PriorityBadge";
import {useMutation} from "@apollo/client";
import {TASK_QUERIES} from "../../queries/taskQueries";
import {HELPERS} from "../../utils/helpers"



function TaskTable(props) {
    const [viewTaskModal, setViewTaskModal] = React.useState(false);
    const [viewEditModal, setEditTaskModal] = React.useState(false);
    const [currTask, setCurrentTask] = React.useState({});

    const [updateTask, { data, loading, error }] = useMutation(
        TASK_QUERIES.taskUpdate, {
            refetchQueries: [
                TASK_QUERIES.taskList,
                'listTasks'
            ]
        }
    )

    React.useEffect(()=>{
        console.log(props.limit)
        if(data){
            console.log(data);
        }
    }, [data])

    const isCompletedHandler = async (event, value, id) => {
        event.preventDefault();
        const formData = {
            id: id,
            is_completed: value
        }
        console.log('data', formData)
        await updateTask({variables: {taskData: formData}});
    }

    const handleUpdateSubmit = async (event, taskData) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            id: taskData.id,
            description: taskData.description,
            is_completed: taskData.is_completed,
            priority: taskData.priority
        }
        console.log('data', taskData)
        await updateTask({variables: {taskData: formData}});
    };

    const taskViewHandler = (task)=>{
        setViewTaskModal(true);
        setCurrentTask(task);
    }

    const taskEditHandler = (task)=> {
        setEditTaskModal(true);
        setCurrentTask(task);
    }

    const [deleteTask, { data:deleteData, loading:deleteloading, error:deleteError }] = useMutation(
        TASK_QUERIES.taskDelete, {
            refetchQueries: [
                TASK_QUERIES.taskList,
                'listTasks'
            ]
        }
    )

    const onDeleteTaskHandler = async (event, id) =>{
        console.log(id);
        event.preventDefault();
        await deleteTask({variables : {id:id}});
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable:false },
        { field: 'description', headerName: 'Description', width: 300, sortable: false, filterable:false },
        {
            field: 'is_completed',
            headerName: 'Status',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                params.row.is_completed ? (<Chip color='success' label="Completed" />) : (<Chip color='warning' label="Pending" />)
            ),
        },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <PriorityBadge priority={params.row.priority} />
            ),
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            sortable: false,
            renderCell: (params) => (
                HELPERS.getDateTime(params.row.created_at)
            ),
        },
        {
            field: 'updated_at',
            headerName: 'Last Updated',
            width: 180,
            sortable: false,
            renderCell: (params) => (
                HELPERS.getDateTime(params.row.updated_at)
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Typography  variant="body2">
                    {!params.row.is_completed ? (
                        <Tooltip title={'Mark As Done'} color='success'>
                            <IconButton>
                                <DoneIcon onClick={(event)=>isCompletedHandler(event,true, params.row.id)}/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title={'Mark As Pending'} color='warning'>
                            <IconButton>
                                <ClearIcon onClick={(event)=>isCompletedHandler(event,false, params.row.id)}/>
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title={'View'} color='primary'>
                        <IconButton onClick={()=>taskViewHandler(params.row)}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Edit'}>
                        <IconButton onClick={()=>taskEditHandler(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Delete'} sx={{color:'#c13f38'}}>
                        <IconButton >
                            <DeleteIcon onClick={(event) =>onDeleteTaskHandler(event, params.row.id)} />
                        </IconButton>
                    </Tooltip>
                </Typography>
            ),
        }
    ];

    return (
        <div>
            <Modal
                open={viewTaskModal}
                onClose={()=>{
                    setViewTaskModal(false);
                    setCurrentTask({});
                }}
                sx={{justifyContent: 'center', alignItems:'center', display:'flex'}}
            >
                <Task task={currTask}  onEdit={taskEditHandler} onClose={()=>{
                    setViewTaskModal(false);
                }}/>
            </Modal>
            <Modal
                open={viewEditModal}
                onClose={()=>{
                    setEditTaskModal(false);
                    setCurrentTask({});
                }}
                sx={{justifyContent: 'center', alignItems:'center', display:'flex'}}
            >
                <TaskForm task={currTask}
                          onClose={()=>{setEditTaskModal(false);}} mode={'Edit'}
                          onSubmitHandler={handleUpdateSubmit}
                          loading={loading}
                />
            </Modal>
            <div style={{ height: 400, width: '100%', marginTop: '2rem'}}>
                <DataGrid
                    rows={props.tasks}
                    columns={columns}
                    loading={loading}
                    //limit
                    pageSize={props.limit}
                    onPageSizeChange={props.onLimitChange}
                    rowsPerPageOptions={[2, 5, 10]}
                    //pages
                    paginationMode={'server'}
                    rowCount={props.count}
                    page={props.page}
                    onPageChange={props.onPageChange}
                    style={{
                        padding:'0 1rem 0 1rem'
                    }}
                    disableColumnFilter
                    components={{
                        NoRowsOverlay: () => (
                            <Stack height="100%" alignItems="center" justifyContent="center">
                                <img src='/images/no-data.png' height={'130rem'}></img>
                                No Tasks Created
                            </Stack>
                        ),
                        NoResultsOverlay: () => (
                            <Stack height="100%" alignItems="center" justifyContent="center">
                                Local filter returns no result
                            </Stack>
                        )
                    }}
                />
            </div>
        </div>

    );
}

export default TaskTable;
