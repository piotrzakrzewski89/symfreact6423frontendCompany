import { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

const CompanyTable = ({ onCreateClick, companies, loading }) => {
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'uuid', header: 'UUID' },
    { accessorKey: 'longName', header: 'Długa nazwa' },
    { accessorKey: 'shortName', header: 'Krótka nazwa' },
    { accessorKey: 'taxNumber', header: 'NIP' },
    { accessorKey: 'createdAt', header: 'Utworzony', Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString() },
    { accessorKey: 'updatedAt', header: 'Zaktualizowany', Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleString() : '' },
    { accessorKey: 'deletedAt', header: 'Usunięty', Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleString() : '' },
    { accessorKey: 'isActive', header: 'Aktywny', Cell: ({ cell }) => (cell.getValue() ? '✅' : '❌') },
    { accessorKey: 'country', header: 'Kraj' },
    { accessorKey: 'city', header: 'Miasto' },
    { accessorKey: 'postalCode', header: 'Kod pocztowy' },
    { accessorKey: 'street', header: 'Ulica' },
    { accessorKey: 'buildingNumber', header: 'Numer budynku' },
    { accessorKey: 'apartmentNumber', header: 'Numer lokalu' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista Firm
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
          ➕ Utwórz nową firmę
        </Button>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={companies}
        state={{ isLoading: loading }}
        enableColumnResizing
        enableColumnOrdering
        enableColumnFilters
        enableHiding // <-- pozwala użytkownikowi ukrywać/pokazywać kolumny
        initialState={{
          columnVisibility: {
            id: true,
            uuid: true,
            shortName: false,
            longName: true,
            taxNumber: false,
            country: false,
            city: false,
            postalCode: false,
            street: false,
            buildingNumber: false,
            apartmentNumber: false,
            deletedAt: false,
            isActive: true,
          },
        }}
      />
    </Box>
  );
};

export default CompanyTable;
