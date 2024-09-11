import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import TasksStore from '../../store/tasksStore';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../../../../UI/Button/CustomButton';

const TasksTable = observer(() => {
    const {tasks, getAllTasksAction, isLoading, isLoaded, deleteTaskAction} = TasksStore;
    const theme = useTheme();

    const handleRemoveTask = (id: string) => {
        deleteTaskAction(id)
    }

    useEffect(() => {
        if (!isLoaded) {
            getAllTasksAction();
        }
    }, [getAllTasksAction, isLoaded]);
    return (
        <TableContainer component={Paper} sx={{
            border: `2px solid ${theme.palette.secondary.main}`,
        }}>
            <Typography variant="h6" component="div" sx={{padding: '16px'}}>
                User Tasks
            </Typography>

            {isLoading ? (
                <div style={{textAlign: 'center', padding: '20px'}}>
                    <CircularProgress/>
                    <Typography>Loading...</Typography>
                </div>
            ) : tasks.length !== 0 ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Task</TableCell>
                            <TableCell align="left">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                   <TableCell align="left">{task.name}</TableCell>
                                   <TableCell align="left">{task.taskName}</TableCell>
                                   <TableCell align="left">{task.description}</TableCell>
                                   <TableCell align="left">
                                       <CustomButton
                                           icon={<DeleteIcon />}
                                           onClick={() => handleRemoveTask(task.id)}
                                           color={'secondary'}
                                           children={'delete'}
                                       />
                                   </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography variant="body2" align="center" sx={{padding: '20px'}}>
                    No tasks available.
                </Typography>
            )}
        </TableContainer>
    );
});

export default TasksTable;
