import React from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const CompanyCreateModal = ({ open, onClose, onCreate }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            isActive: true,
        },
    });



    const onSubmit = (data) => {
        onCreate(data);
        reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="create-company-modal">
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Typography variant="h6" mb={2}>Utwórz nowego użytkownika</Typography>

                <TextField
                    fullWidth
                    label="Imię *"
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register("firstName")}
                />

                <TextField
                    fullWidth
                    label="Nazwisko *"
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register("lastName")}
                />

                <TextField
                    fullWidth
                    label="Numer Pracownika *"
                    margin="normal"
                    error={!!errors.employeeNumber}
                    helperText={errors.employeeNumber?.message}
                    {...register("employeeNumber")}
                />

                <FormControlLabel
                    control={<Checkbox {...register('isActive')} defaultChecked />}
                    label="Aktywny"
                />

                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Utwórz
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CompanyCreateModal;