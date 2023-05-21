import { Icon } from '@iconify/react';
import { useState, useEffect, React, useRef } from 'react';
import { sentenceCase } from 'change-case';

import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  Container,
  Typography,
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

import PopupCreateCategory from '../../components/_dashboard/inventory/product-list/categories/PopupCreateCategory';
import MenuCategories from '../../components/_dashboard/inventory/product-list/categories/MenuCategories';
import { getCategories, getProductsInCategory } from '../../redux/slices/categories';
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
    flex: 1.5
  },
  {
    field: 'priceSale',
    headerName: 'Precio',
    maxWidth: 200,
    minWidth: 140,
    flex: 1,
    renderCell: (params) => {
      // TODO: falta que retorne el price normal
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

const options = ['Editar', 'Eliminar', 'Ver'];

export default function InvetoryCategoriesList() {
  const { themeStretch } = useSettings();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  // Get categories and get products in category from API
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsInCategory());
  }, [dispatch]);

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // states for menu options in categories
  const [viewCategory, setViewCategory] = useState(0);
  const [editCategory, setEditCategory] = useState(0);
  const [deleteCategory, setDeleteCategory] = useState(0);

  // Popup create category
  const [openPopup, setOpenPopup] = useState(false);
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const { products } = useSelector((state) => state.categories);

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
    <Page title="Inventario: Categorias" sx={{ height: '100%' }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <HeaderBreadcrumbs
          heading="Categorias"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Inventario',
              href: PATH_DASHBOARD.inventory.root
            },
            { name: 'Categorias' }
          ]}
          action={
            <Button variant="contained" onClick={() => setOpenPopup(true)} startIcon={<Icon icon={plusFill} />}>
              Crear categoria
            </Button>
          }
        />
        <Grid className={classes.root} container spacing={2}>
          <Grid sx={{ height: '100%' }} item xs={12} md={4}>
            <Card>
              {categories.length === 0 ? (
                <Skeleton variant="rectangular" height={400} />
              ) : (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
                  {categories.map((category) => (
                    <ListItemButton onClick={() => handleView(category.id)} ref={menuRef} key={category.id}>
                      <ListItemText primary={category.name} />
                      <MenuCategories handleEdit={handleEdit} handleView={handleView} handleDelete={handleDelete} />
                    </ListItemButton>
                  ))}
                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary="categoria" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="subcategoria" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                {viewCategory === 0 ? (
                  'seleciona una categoria'
                ) : (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                          {categories.find((category) => category.id === viewCategory).name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Categoria padre:</strong> parentCategory
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 3 }}>
                          {/* Description for category */}
                          {/* {categories.find((category) => category.id === viewCategory).description} */}
                          Description for category Description for category Description for category Description for
                          category
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0604/8373/1606/products/IMG-5578993_823x.jpg?v=1661609505"
                          loading="lazy"
                          alt="imagen"
                        />
                      </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Productos asociados
                    </Typography>
                    <DataGrid
                      checkboxSelection
                      disableSelectionOnClick
                      autoHeight
                      rows={products}
                      columns={columns}
                      pagination
                      pageSize={10}
                      rowHeight={60}
                      loading={products.length === 0}
                      components={{
                        Toolbar: GridToolbar,
                        Pagination: CustomPagination
                      }}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <PopupCreateCategory open={openPopup} handleClose={handleClosePopup} />
    </Page>
  );
}
