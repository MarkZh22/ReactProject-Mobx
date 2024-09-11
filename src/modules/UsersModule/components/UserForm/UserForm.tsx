import UsersStore from '../../store/usersStore';
import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useCallback} from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import styles from '../UserList/UsersList.module.css';
import CustomButton from '../../../../components/UI/Button/CustomButton';

const UserForm = () => {
    const [inputValueName, setInputValueName] = useState('');
    const [inputValueProfession, setInputValueProfession] = useState('');
    const [inputValueEmail, setInputValueEmail] = useState('');
    const {addUserAction, total, isLoading} = UsersStore;
    const [errors, setErrors] = useState({name: false, profession: false, email: false});

    const validateFields = () => {
        const newErrors = {
            name: inputValueName.trim() === '',
            profession: inputValueProfession.trim() === '',
            email: inputValueEmail.trim() === '',
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true); // Возвращает true, если нет ошибок
    };

    const handleAddUser = useCallback((event: any) => {
        event.preventDefault();
        if (!validateFields()) return;
        const newUser = {
            id: Math.floor(Math.random() * 1000000).toString(),
            name: inputValueName,
            profession: inputValueProfession,
            email: inputValueEmail,
        };
        addUserAction(newUser);

        setInputValueName('');
        setInputValueProfession('');
        setInputValueEmail('');
        setErrors({name: false, profession: false, email: false});
    }, [inputValueName, inputValueProfession, inputValueEmail, addUserAction]);

    return (
        <>
            {isLoading && <div className={styles.loading}>...loading</div>}
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'left',
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',

                }}

                noValidate
                autoComplete="off"
                onSubmit={handleAddUser}
            >
                {`Total users: ${total}`}
                <TextField id="Name" label="name" variant="outlined" value={inputValueName}
                           onChange={(event) => setInputValueName(event.currentTarget.value)}
                           onBlur={() => setErrors((prev) => ({
                               ...prev,
                               name: inputValueName.trim() === ''
                           }))} // Проверяем на фокус
                           error={errors.name}
                           helperText={errors.name ? 'Поле не может быть пустым' : ''}
                />

                <TextField value={inputValueProfession}
                           onChange={(event) => setInputValueProfession(event.currentTarget.value)} type='text'
                           id='profession' label="profession" name='profession' variant="outlined"
                           onBlur={() =>
                               setErrors((prev) => ({...prev, profession: inputValueProfession.trim() === ''}))
                           } // Проверяем на фокус
                           error={errors.profession}
                           helperText={errors.profession ? 'Поле не может быть пустым' : ''}
                />

                <TextField value={inputValueEmail} onChange={(event) => setInputValueEmail(event.currentTarget.value)}
                           type='email' id='email' label='email' name='email'
                           onBlur={() => setErrors((prev) => ({
                               ...prev,
                               email: inputValueEmail.trim() === ''
                           }))} // Проверяем на фокус
                           error={errors.email}
                           helperText={errors.email ? 'Поле не может быть пустым' : ''}
                />
                <CustomButton
                    type="submit"
                    icon={<SendIcon/>}
                    variant="contained"
                    disabled={Object.values(errors).includes(true)}
                    children={'add user'}
                />
            </Box>
        </>
    )
}

export default observer(UserForm)