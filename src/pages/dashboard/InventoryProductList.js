import { filter, sample } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect, React, useCallback } from 'react';
import { sentenceCase } from 'change-case';

import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Stack,
  Rating,
  Pagination,
  LinearProgress,
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import {
  DataGrid,
  GridToolbar,
  useGridSlotComponentProps,
  getGridNumericColumnOperators
} from '@material-ui/data-grid';
import { Close } from '@material-ui/icons';
import searchFill from '@iconify/icons-eva/search-fill';
import mockData from '../../utils/mock-data';
import createAvatar from '../../utils/createAvatar';
import { MIconButton, MAvatar } from '../../components/@material-extend';
import { fPercent, fCurrency } from '../../utils/formatNumber';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, deleteProduct } from '../../redux/slices/product';
// utils
import { fDate } from '../../utils/formatTime';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ProductListHead,
  ProductListToolbar,
  ProductMoreMenu
} from '../../components/_dashboard/inventory/product-list';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Product', alignRight: false },
//   { id: 'createdAt', label: 'Create at', alignRight: false },
//   { id: 'inventoryType', label: 'Status', alignRight: false },
//   { id: 'price', label: 'Price', alignRight: true, numeric: true },
//   { id: '' }
// ];

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

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 74,
  height: 74,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'id',
    hide: true
  },
  {
    field: 'img',
    headerName: 'Imagen',
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    renderCell: (params) => {
      const imgUrl =
        'https://copservir.vtexassets.com/arquivos/ids/784090/GASEOSA-COCA-COLA-ORIGINAL_F.png?v=637964068701300000';
      return <ThumbImgStyle variant="square" alt={params.row.name} src={imgUrl} sx={{ width: 74, height: 74 }} />;
    }
  },
  {
    field: 'name',
    headerName: 'Nombre',
    maxWidth: 200,
    minWidth: 150,
    flex: 1.5
  },
  {
    field: 'priceSale',
    headerName: 'Precio',
    maxWidth: 200,
    minWidth: 140,
    flex: 1,
    renderCell: (params) => {
      // TODO: que muestre el precio de venta formateado segun la moneda
      const priceSale = params.getValue(params.id, 'priceSale');
      return (
        <Typography variant="body2" noWrap>
          {fCurrency(priceSale)}
        </Typography>
      );
    }
  },
  {
    field: 'sku',
    headerName: 'Sku',
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
      // const getStatus = params.getValue(params.id, 'status');
      const getStatus = 'active';
      return RenderStatus(getStatus);
    }
  },
  {
    field: 'quantityStock',
    headerName: 'Stock',
    width: 140,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const getStock = params.getValue(params.id, 'quantityStock');
      return RenderStock(getStock);
    }
  },
  // {
  //   field: 'performance',
  //   type: 'number',
  //   headerName: 'Performance',
  //   width: 160,
  //   renderCell: (params) => {
  //     const value = params.getValue(params.id, 'performance');
  //     return (
  //       <Stack direction="row" alignItems="center" sx={{ px: 2, width: 1, height: 1 }}>
  //         <LinearProgress
  //           value={value}
  //           variant="determinate"
  //           color={(value < 30 && 'error') || (value > 30 && value < 70 && 'warning') || 'primary'}
  //           sx={{ width: 1, height: 6 }}
  //         />
  //         <Typography variant="caption" sx={{ width: 90 }}>
  //           {fPercent(value)}
  //         </Typography>
  //       </Stack>
  //     );
  //   }
  // },
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

export default function InventoryProductList() {
  const { themeStretch } = useSettings();
  // const theme = useTheme();
  const dispatch = useDispatch();
  // const [page, setPage] = useState(0);
  // const [order, setOrder] = useState('asc');
  // const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [orderBy, setOrderBy] = useState('createdAt');
  const { products } = useSelector((state) => state.product);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  if (columns.length > 0) {
    const ratingColumn = columns.find((column) => column.field === 'rating');
    const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

    const ratingFilterOperators = getGridNumericColumnOperators().map((operator) => ({
      ...operator,
      InputComponent: RatingInputValue
    }));

    columns[ratingColIndex] = {
      ...ratingColumn,
      filterOperators: ratingFilterOperators
    };
  }

  const handleSearch = (value) => {
    setFilterName(value);
    console.log(products);
    const productSearch = filter(
      products,
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.sku.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
    );
    console.log(productSearch);
    setFilterProducts(productSearch);
  };

  return (
    <Page title="Inventario: Productos">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Productos"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Inventario',
              href: PATH_DASHBOARD.inventory.root
            },
            { name: 'Productos' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.inventory.newProduct}
              startIcon={<Icon icon={plusFill} />}
            >
              Crear producto
            </Button>
          }
        />
        <TextField
          fullWidth
          label="Buscar producto"
          onChange={(e) => handleSearch(e.target.value)}
          value={filterName}
          // placeholder="Buscar producto por nombre, sku o descripción"
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {filterName !== '' && (
                  <IconButton
                    onClick={() => {
                      setFilterName('');
                      setFilterProducts(products);
                    }}
                  >
                    <Close />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
        />

        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          rows={filterProducts}
          columns={columns}
          pagination
          loading={products.length === 0}
          pageSize={10}
          rowHeight={90}
          components={{
            Toolbar: GridToolbar,
            Pagination: CustomPagination
          }}
        />
      </Container>
    </Page>
  );
}
