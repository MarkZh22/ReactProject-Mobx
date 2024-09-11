import {observer} from 'mobx-react-lite';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import UsersStore from '../../../UsersModule/store/usersStore';
import {IUsersStore} from '../../../UsersModule/store/usersStore.interfaces';
import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import TasksStore from '../../store/tasksStore';
import SendIcon from '@mui/icons-material/Send';
import CustomButton from '../../../../components/UI/Button/CustomButton';


const TasksForm = observer(() => {
    const {users, getAllUsersAction}: IUsersStore = UsersStore;
    const {addTaskAction} = TasksStore
    const [name, setName] = useState('');
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [errors, setErrors] = useState({taskName: false, description: false, name: false});

    const isFormValid = name.trim() !== '' && taskName.trim() !== '' && description.trim() !== '';

    function handleClickSave() {
        addTaskAction({
            id: Math.floor(Math.random() * 1000000).toString(),
            name,
            currentUserId,
            taskName,
            description,
        });
        setTaskName('');
        setDescription('');
        setName('');
    }

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

    const getCurrentUserId = (id: string) => {
        console.log('id:', id)
        setCurrentUserId(id)

    };

    useEffect(() => {
        if (users.length === 0) {
            getAllUsersAction()
        }
    }, [getAllUsersAction]);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: '10px',
            alignItems: 'left',
            width: '100%',
        }}>
            <TextField color="secondary" id="Task name" label="Task name" variant="outlined" value={taskName}
                       onChange={(event) => setTaskName(event.currentTarget.value)}
                       onBlur={() => setErrors((prev) => ({
                           ...prev,
                           taskName: taskName.trim() === ''
                       }))} // Проверяем на фокус
                       error={errors.name}
                       helperText={errors.name ? 'Поле не может быть пустым' : ''}
            />
            <TextField color="secondary" id="description" label="description" variant="outlined" value={description}
                       onChange={(event) => setDescription(event.currentTarget.value)}
                       onBlur={() => setErrors((prev) => ({
                           ...prev,
                           description: description.trim() === ''
                       }))} // Проверяем на фокус
                       error={errors.name}
                       helperText={errors.name ? 'Поле не может быть пустым' : ''}
            />
            <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                <FormControl size={'small'} fullWidth sx={{maxWidth: '200px', width: '100%'}}>
                    <InputLabel id="name" color="secondary">name</InputLabel>
                    <Select
                        color="secondary"
                        labelId="name"
                        id="name"
                        value={name}
                        label="name"
                        onChange={handleChange}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.name}
                                      onClick={() => getCurrentUserId(user.id)}> {user.name} </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <CustomButton
                    onClick={handleClickSave}
                    icon={<SendIcon/>}
                    color={'secondary'}
                    variant="contained"
                    disabled={!(isFormValid)}
                    sx={{maxWidth: '200px', width: '100%'}}
                >
                    Save
                </CustomButton>
            </div>
        </Box>

    )
})
export default TasksForm