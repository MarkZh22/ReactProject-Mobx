import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface ICustomButton {
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: string;
    icon?: ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'error' | 'info';
    disabled?: boolean;
    sx?: SxProps<Theme>;
}

const CustomButton = ({
                          loading = false,
                          onClick,
                          type = 'button',
                          children,
                          icon,
                          variant = 'contained',
                          color = 'primary',
                          disabled = false,
                          sx,
                      }: ICustomButton) => {
    if (loading) {
        return (
            <LoadingButton
                loading
                variant={variant}
                color={color}
                onClick={onClick}
                startIcon={icon}
                disabled={disabled}
                sx={sx}
            >
                {children}
            </LoadingButton>
        );
    }

    return (
        <Button
            sx={sx}
            type={type}
            variant={variant}
            color={color}
            onClick={onClick}
            startIcon={icon}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
