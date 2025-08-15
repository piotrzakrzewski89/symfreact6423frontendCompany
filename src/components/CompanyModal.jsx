import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    Grid,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { parseBackendDate } from '../utils/dateUtils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const CompanyModal = ({
    open,
    onClose,
    onCreate,
    onSave,
    mode = 'review',
    initialData = {},
    loading = false
}) => {
    const [backendError, setBackendError] = useState(null);
    const readOnly = mode === 'review';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialData });

    const prevInitialData = useRef();

    useEffect(() => {
        if (JSON.stringify(prevInitialData.current) !== JSON.stringify(initialData)) {
            reset(initialData);
            prevInitialData.current = initialData;
        }
    }, [initialData, reset]);

    const onSubmit = async (data) => {
        if (readOnly) return;
        try {
            setBackendError(null);
            if (mode === 'create') {
                await onCreate?.(data);
            } else if (mode === 'edit') {
                await onSave?.(data);
            }
            reset({});
            onClose();
        } catch (error) {
            console.error(error);
            if (error?.errors) setBackendError(error.errors);
            else if (typeof error === 'string') setBackendError(error);
            else setBackendError('Nieznany błąd serwera');
        }
    };

    const cleanBackendError = backendError
        ? backendError.replace(/Object\(App\\Application\\Dto\\CompanyDto\)\./g, '')
        : null;

    const commonFieldProps = readOnly ? { inputProps: { readOnly: true } } : {};

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="company-modal">
            <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Typography variant="h6" mb={3}>
                    {mode === 'create' && 'Utwórz nową firmę'}
                    {mode === 'review' && 'Podgląd firmy'}
                    {mode === 'edit' && 'Edytuj firmę'}
                </Typography>

                {/* Lazy loading szczegółu */}
                {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CircularProgress size={24} /> Wczytywanie danych firmy...
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3} direction="column" justifyContent="center">
                            {readOnly && (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Uuid"
                                        {...register('uuid')}
                                        helperText={errors.uuid?.message}
                                        {...commonFieldProps}
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email *"
                                    {...register('email', { required: 'Email jest wymagany' })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nazwa skrócona *"
                                    {...register('shortName', { required: 'Skrócona nazwa jest wymagana' })}
                                    error={!!errors.shortName}
                                    helperText={errors.shortName?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nazwa pełna *"
                                    {...register('longName', { required: 'Pełna nazwa jest wymagana' })}
                                    error={!!errors.longName}
                                    helperText={errors.longName?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="NIP *"
                                    type="text"
                                    {...register('taxNumber', {
                                        required: 'NIP jest wymagany',
                                        validate: value => {
                                            if (!/^\d*$/.test(value)) return 'Tylko cyfry są dozwolone';
                                            if (value.length > 10) return 'Maksymalnie 10 cyfr';
                                            return true;
                                        }
                                    })}
                                    error={!!errors.taxNumber}
                                    helperText={errors.taxNumber?.message}
                                    {...commonFieldProps}
                                    slotProps={{
                                        input: {
                                            onInput: (e) => {
                                                const input = e.target; // używamy e.target zamiast e.currentTarget
                                                if (input && 'value' in input) {
                                                    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
                                                }
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Kraj *"
                                    {...register('country', { required: 'Kraj jest wymagany' })}
                                    error={!!errors.country}
                                    helperText={errors.country?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Miasto *"
                                    {...register('city', { required: 'Miasto jest wymagane' })}
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Kod pocztowy *"
                                    {...register('postalCode', { required: 'Kod pocztowy jest wymagany' })}
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Ulica *"
                                    {...register('street', { required: 'Ulica jest wymagana' })}
                                    error={!!errors.street}
                                    helperText={errors.street?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Numer budynku *"
                                    {...register('buildingNumber', { required: 'Numer budynku jest wymagany' })}
                                    error={!!errors.buildingNumber}
                                    helperText={errors.buildingNumber?.message}
                                    {...commonFieldProps}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Numer mieszkania"
                                    type="text"
                                    {...register('apartmentNumber', {
                                        validate: value => {
                                            if (!/^\d*$/.test(value)) return 'Tylko cyfry są dozwolone';
                                            if (value.length > 10) return 'Maksymalnie 10 cyfr';
                                            return true;
                                        }
                                    })}
                                    error={!!errors.taxNumber}
                                    helperText={errors.taxNumber?.message}
                                    {...commonFieldProps}
                                    slotProps={{
                                        input: {
                                            onInput: (e) => {
                                                const input = e.target; // używamy e.target zamiast e.currentTarget
                                                if (input && 'value' in input) {
                                                    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
                                                }
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            
                            {mode === 'review' && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Data utworzenia"
                                            value={parseBackendDate(initialData?.createdAt ?? null)}
                                            {...commonFieldProps}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Data edycji"
                                            value={parseBackendDate(initialData?.updatedAt ?? null)}
                                            {...commonFieldProps}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox {...register('isActive')} />} label="Firma aktywna" />
                            </Grid>
                        </Grid>

                        {backendError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                <ul style={{ margin: 0, paddingLeft: 16 }}>
                                    {(cleanBackendError || '').split('\n').map((l, i) => (
                                        <li key={i}>{l}</li>
                                    ))}
                                </ul>
                            </Alert>
                        )}
                    </>
                )}

                {/* stopka modala */}
                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Anuluj</Button>
                    {!readOnly && !loading && (
                        <Button type="submit" variant="contained" color="primary">
                            {mode === 'create' ? 'Utwórz firmę' : 'Zapisz zmiany'}
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default CompanyModal;