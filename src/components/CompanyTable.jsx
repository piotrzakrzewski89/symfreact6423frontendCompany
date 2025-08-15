import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { parseBackendDate } from '../utils/dateUtils';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';

const CompanyTable = ({
  title,
  companies,
  loading,
  view,
  onCreateClick,
  onReview,
  onEdit,
  onToggleActive,
  onDelete,
}) => {

  const columns = [
    { accessorKey: 'id', header: 'ID', size: 100 },
    { accessorKey: 'uuid', header: 'UUID', size: 310 },
    { accessorKey: 'longName', header: 'Długa nazwa' },
    { accessorKey: 'shortName', header: 'Krótka nazwa', grow: 1 },
    { accessorKey: 'taxNumber', header: 'NIP' },
    {
      accessorKey: 'createdAt',
      header: 'Utworzony',
      Cell: ({ cell }) => { return cell.getValue() ? parseBackendDate(cell.getValue()) : '-'; }
    },
    {
      accessorKey: 'updatedAt',
      header: 'Zaktualizowany',
      Cell: ({ cell }) => { return cell.getValue() ? parseBackendDate(cell.getValue()) : '-'; }
    },
    {
      accessorKey: 'deletedAt',
      header: 'Usunięty',
      Cell: ({ cell }) => { return cell.getValue() ? parseBackendDate(cell.getValue()) : '-'; }
    },
    { accessorKey: 'isActive', header: 'Aktywny', Cell: ({ cell }) => (cell.getValue() ? '✅' : '❌') },
    { accessorKey: 'country', header: 'Kraj' },
    { accessorKey: 'city', header: 'Miasto' },
    { accessorKey: 'postalCode', header: 'Kod pocztowy' },
    { accessorKey: 'street', header: 'Ulica' },
    { accessorKey: 'buildingNumber', header: 'Numer budynku' },
    { accessorKey: 'apartmentNumber', header: 'Numer lokalu' },
    {
      id: 'actions',
      header: 'Akcje',
      size: 220,
      Cell: ({ row }) => {
        const isActive = row.original.isActive;

        return (
          <Box sx={{ display: 'flex', gap: '0.25rem' }}>
            {/* Podgląd – dostępny wszędzie */}
            <IconButton
              size="small"
              onClick={() => onReview?.(row.original.id)}
              title="Podgląd"
            >
              <VisibilityIcon />
            </IconButton>

            {/* Edycja / aktywacja / usuwanie – tylko w widoku aktywnych */}
            {view === 'active' && (
              <>
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => onEdit?.(row.original.id)}
                  title="Edytuj"
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color={isActive ? 'success' : 'error'}
                  size="small"
                  onClick={() => onToggleActive?.(row.original.id)}
                  title={isActive ? 'Dezaktywuj' : 'Aktywuj'}
                >
                  {isActive ? <ToggleOffIcon /> : <ToggleOnIcon />}
                </IconButton>

                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete?.(row.original.id)}
                  title="Usuń"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        );
      }
    },
  ];

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {title || 'Lista Firm'}
        </Typography>

        {onCreateClick && view === 'active' && (
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" color="primary" onClick={onCreateClick}>
              ➕ Utwórz nową firmę
            </Button>
          </Box>
        )}

        <MaterialReactTable
          columns={columns}
          data={companies}
          localization={MRT_Localization_PL}
          state={{ isLoading: loading }}
          enableColumnResizing
          enableColumnOrdering
          enableColumnFilters
          enableHiding
          initialState={{
            columnVisibility: {
              id: true,
              uuid: true,
              shortName: true,
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
              actions: true,
            },
          }}
        />
      </Box>
    </>
  );
};

export default CompanyTable;
