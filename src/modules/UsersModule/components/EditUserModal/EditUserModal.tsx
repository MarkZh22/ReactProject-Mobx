// EditUserModal.tsx
import React, { useState } from 'react';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';


interface EditUserModalProps {
    user: any;
    open: boolean;
    onClose: () => void;
    onSave: (updatedUser: any) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, open, onClose, onSave }) => {
    const [name, setName] = useState(user.name);
    const [profession, setProfession] = useState(user.profession);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState({ name: false, profession: false, email: false });

    const handleSave = () => {
        if(  user.name !== name ||
            user.profession !== profession ||
            user.email !== email
        ){
            onSave({ ...user, name, profession, email });
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h6">Edit User</Typography>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="dense"
                    onBlur={() => setErrors((prev) => ({ ...prev, name: name.trim() === '' }))}
                    error={errors.name}
                    helperText={errors.name ? 'Поле не может быть пустым' : ''}
                />
                <TextField
                    label="Profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    fullWidth
                    margin="dense"
                    onBlur={() => setErrors((prev) => ({ ...prev, profession: profession.trim() === '' }))}
                    error={errors.profession}
                    helperText={errors.profession ? 'Поле не может быть пустым' : ''}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="dense"
                    onBlur={() => setErrors((prev) => ({ ...prev, email: email.trim() === '' }))}
                    error={errors.email}
                    helperText={errors.email ? 'Поле не может быть пустым' : ''}
                />
                <Button variant="contained" color="primary" onClick={handleSave} disabled={Object.values(errors).includes(true)}>
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditUserModal;
