import { Icon } from '@iconify/react';
import { useState, useEffect, React, useRef } from 'react';
import { sentenceCase } from 'change-case';

import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  Container,
  Rating,
  Pagination,
  Grid,
  Skeleton,
  CardContent,
  Divider
} from '@material-ui/core';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { DataGrid, GridToolbar, useGridSlotComponentProps } from '@material-ui/data-grid';

import { makeStyles } from '@material-ui/styles';

// redux
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import PopupCreateWarehouse from '../../components/_dashboard/inventory/product-list/warehouses/popupCreateWarehouse';
import MenuCategories from '../../components/_dashboard/inventory/product-list/categories/MenuCategories';
import { switchPopupWarehouses } from '../../redux/slices/warehouses';
import { useDispatch, useSelector } from '../../redux/store';
import { fCurrency } from '../../utils/formatNumber';
import { MIconButton } from '../../components/@material-extend';
// utils

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function RenderStatus(getStatus) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <Label
      variant={isLight ? 'ghost' : 'filled'}
      color={(getStatus === 'disable' && 'error') || 'success'}
      sx={{ textTransform: 'capitalize', mx: 'auto' }}
    >
      {getStatus}
    </Label>
  );
}

function RenderStock(getStock) {
  const theme = useTheme();
  const quantityStock = getStock;
  const inventoryType =
    quantityStock === 0
      ? 'Sin existencias'
      : quantityStock >= 5 && quantityStock <= 10
      ? 'Pocas existencias: '
      : 'Disponible: ';
  return (
    <Label
      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
      color={(quantityStock === 0 && 'error') || (quantityStock >= 5 && quantityStock <= 10 && 'warning') || 'success'}
    >
      {sentenceCase(`${inventoryType}:${quantityStock}`)}
    </Label>
  );
}

const columns = [
  {
    field: 'id',
    hide: true
  },
  {
    field: 'name',
    headerName: 'Nombre',
    maxWidth: 200,
    minWidth: 150,
    flex: 1.2
  },
  {
    field: 'description',
    headerName: 'Descripción',
    maxWidth: 200,
    minWidth: 140,
    flex: 1
  },
  {
    field: 'department',
    headerName: 'Departamento',
    minWidth: 140,
    flex: 1,
    hide: true
  },
  {
    field: 'city',
    headerName: 'Ciudad',
    minWidth: 140,
    flex: 1
  },
  {
    field: 'address',
    headerName: 'Dirección',
    minWidth: 140,
    flex: 1
  },
  // TODO: agregar status
  {
    field: 'status',
    type: 'singleSelect',
    headerName: 'Estado',
    align: 'center',
    headerAlign: 'center',
    width: 140,
    // flex: 1,
    valueOptions: ['active', 'disable'],
    renderCell: (params) => {
      const getStatus = params.getValue(params.id, 'status');
      return RenderStatus(getStatus);
    }
  },
  {
    field: 'phone',
    headerName: 'Teléfono',
    width: 160,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'action',
    headerName: ' ',
    width: 80,
    align: 'right',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const selectedID = params.row.id;

      const handleClick = () => {
        console.log('selectedID', selectedID);
      };

      return (
        <MIconButton onClick={handleClick}>
          <Box component={Icon} icon={moreVerticalFill} sx={{ width: 20, height: 20 }} />
        </MIconButton>
      );
    }
  }
];

function RatingInputValue({ item, applyValue }) {
  return (
    <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
      <Rating
        size="small"
        precision={0.5}
        placeholder="Filter value"
        value={Number(item.value)}
        onChange={(event, newValue) => {
          applyValue({ ...item, value: newValue });
        }}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 50px)'
    }
  }
}));

const warehousesOptions = [
  {
    id: 1,
    name: 'Bodega 1',
    description: 'Bodega 1',
    department: 'Valle del Cauca',
    city: 'Cali',
    address: 'Calle 1 # 1 - 1',
    phone: '1234567890',
    status: 'active'
  },
  {
    id: 2,
    name: 'Bodega 2',
    description: 'Bodega 2',
    department: 'Valle del Cauca',
    city: 'Cali',
    address: 'Calle 1 # 1 - 1',
    phone: '1234567890',
    status: 'active'
  },
  {
    id: 3,
    name: 'Bodega 3',
    description: 'Bodega 3',
    department: 'Antioquia',
    city: 'Medellin',
    address: 'Calle 1 # 1 - 1',
    phone: '1234567890',
    status: 'disable'
  }
];

export default function WarehousesList() {
  const { themeStretch } = useSettings();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { openPopup } = useSelector((state) => state.warehouses);

  useEffect(() => {
    console.log('openPopup', openPopup);
  }, [openPopup]);

  const [open, setOpen] = useState(true);

  // states for menu options in categories
  const [viewCategory, setViewCategory] = useState(0);
  const [editCategory, setEditCategory] = useState(0);
  const [deleteCategory, setDeleteCategory] = useState(0);

  // Popup create warehouse
  const handleClickPopup = () => {
    dispatch(switchPopupWarehouses());
  };

  const menuRef = useRef(null);

  const handleEdit = (id) => {
    console.log(`edit${id}`);
  };

  const handleDelete = (id) => {
    console.log(`delete${id}`);
  };

  const handleView = (id) => {
    console.log(`view${id}`);
    setViewCategory(id);
  };

  const classes = useStyles();
  return (
    <Page title="Inventario: Punto de venta" sx={{ height: '100%' }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <HeaderBreadcrumbs
          heading="Punto de venta"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Inventario',
              href: PATH_DASHBOARD.inventory.root
            },
            { name: 'Punto de venta' }
          ]}
          action={
            <Button variant="contained" onClick={handleClickPopup} startIcon={<Icon icon={plusFill} />}>
              Crear Bodega
            </Button>
          }
        />
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          rows={warehousesOptions}
          columns={columns}
          pagination
          pageSize={10}
          rowHeight={60}
          loading={warehousesOptions.length === 0}
          components={{
            Toolbar: GridToolbar,
            Pagination: CustomPagination
          }}
        />
      </Container>
      <PopupCreateWarehouse open={openPopup} handleClose={handleClickPopup} />
    </Page>
  );
}
