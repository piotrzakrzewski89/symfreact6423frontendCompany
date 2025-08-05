import React from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

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

const companySchema = Yup.object().shape({
    email: Yup.string().email('Nieprawidłowy adres email').required('Email jest wymagany'),
    shortName: Yup.string().max(255, 'Krótka nazwa może mieć maksymalnie 255 znaków').required('Krótka nazwa jest wymagana'),
    longName: Yup.string().required('Pełna nazwa jest wymagana'),
    taxNumber: Yup.string().length(10, 'NIP musi mieć dokładnie 10 znaków').required('NIP jest wymagany'),
    country: Yup.string().required('Kraj jest wymagany'),
    city: Yup.string().required('Miasto jest wymagane'),
    postalCode: Yup.string().required('Kod pocztowy jest wymagany'),
    street: Yup.string().required('Ulica jest wymagana'),
    buildingNumber: Yup.string().required('Numer budynku jest wymagany'),
    apartmentNumber: Yup.string().nullable(),
});


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

    const onSubmit = async (data) => {
        try {
            // zakładam, że onCreate zwraca Promise
            await onCreate(data);
            reset();
            onClose();
        } catch (error) {
            // tutaj możesz ustawić stan błędu lub po prostu nic nie robić,
            // modal pozostanie otwarty, a w onCreate możesz ustawić globalny error albo w komponencie nadrzędnym
            console.error("Błąd przy tworzeniu firmy:", error);
        }
    };

    return (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="create-company-modal">
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Typography variant="h6" mb={2}>Utwórz nową firmę</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email *"
                            {...register("email", { required: "Email jest wymagany" })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nazwa skrócona *"
                            {...register("shortName", { required: "Skrócona nazwa jest wymagana" })}
                            error={!!errors.shortName}
                            helperText={errors.shortName?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nazwa pełna *"
                            {...register("longName", { required: "Pełna nazwa jest wymagana" })}
                            error={!!errors.longName}
                            helperText={errors.longName?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="NIP *"
                            {...register("taxNumber", { required: "NIP jest wymagany" })}
                            error={!!errors.taxNumber}
                            helperText={errors.taxNumber?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Kraj *"
                            {...register("country", { required: "Kraj jest wymagany" })}
                            error={!!errors.country}
                            helperText={errors.country?.message}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Miasto *"
                            {...register("city", { required: "Miasto jest wymagane" })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Kod pocztowy *"
                            {...register("postalCode", { required: "Kod pocztowy jest wymagany" })}
                            error={!!errors.postalCode}
                            helperText={errors.postalCode?.message}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Ulica *"
                            {...register("street", { required: "Ulica jest wymagana" })}
                            error={!!errors.street}
                            helperText={errors.street?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Numer budynku *"
                            {...register("buildingNumber", { required: "Numer budynku jest wymagany" })}
                            error={!!errors.buildingNumber}
                            helperText={errors.buildingNumber?.message}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Numer mieszkania"
                            {...register("apartmentNumber")}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox {...register("isActive")} defaultChecked />}
                            label="Firma aktywna"
                        />
                    </Grid>
                </Grid>

                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Utwórz firmę
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CompanyCreateModal;