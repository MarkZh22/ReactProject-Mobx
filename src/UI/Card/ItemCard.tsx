import {ReactNode, useState} from 'react';
import { Box, Typography, ButtonGroup } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import styles from './ItemCard.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

interface IItemCard {
    title: string;
    description: string;
    additionalInfo?: string;
    onDelete: () => void;
    onEdit?: () => void;
    editModal?: ReactNode;
}

const ItemCard = ({
                      title,
                      description,
                      additionalInfo,
                      onDelete,
                      onEdit,
                      editModal,
                  }: IItemCard) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleEdit = () => {
        if (onEdit) {
            onEdit();
        }
        setIsEditOpen(true);
    };

    return (
        <Box className={styles.container}>
            <div className={styles.item}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
                {additionalInfo && <Typography variant="body2">{additionalInfo}</Typography>}
            </div>
            <ButtonGroup variant="text" aria-label="Basic button group">
                <CustomButton
                    onClick={onDelete}
                    icon={<DeleteIcon />}
                    color="primary"
                    variant="text"
                    children={'delete'}
                />
                {onEdit && (
                    <CustomButton onClick={handleEdit} color="primary" variant="text" children={'change'}/>

                )}
            </ButtonGroup>
            {isEditOpen && editModal}
        </Box>
    );
};

export default ItemCard;

