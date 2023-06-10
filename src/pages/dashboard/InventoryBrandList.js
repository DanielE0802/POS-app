import { Icon } from '@iconify/react';
import { useState, useEffect, React, useRef, Fragment } from 'react';
import { sentenceCase } from 'change-case';

import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  Container,
  Typography,
  Pagination,
  Grid,
  Skeleton,
  CardContent,
  Divider,
  ListItem
} from '@material-ui/core';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { DataGrid, GridToolbar, useGridSlotComponentProps } from '@material-ui/data-grid';

import { makeStyles } from '@material-ui/styles';

// redux
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import PopupCreateBrand from '../../components/_dashboard/inventory/product-list/brands/PopupCreateBrand';
import MenuCategories from '../../components/_dashboard/inventory/product-list/categories/MenuCategories';
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
import { getBrands, switchPopupBrands } from '../../redux/slices/brands';
import RequestService from '../../api/services/service';

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

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 50px)'
    }
  }
}));

export default function BrandList() {
  const { themeStretch } = useSettings();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { brands, openPopup } = useSelector((state) => state.brands);

  // Get categories and get products in category from API
  useEffect(() => {
    dispatch(getBrands(true));
  }, [dispatch]);

  // const handleClick = () => {
  //   setOpen(!open);
  // };
  // states for menu options in categories
  const [viewBrand, setViewBrand] = useState({ name: '', products: [] });
  const [editBrand, setEditBrand] = useState(0);
  const [deleteBrand, setDeleteBrand] = useState(0);

  // Popup create category
  // const [openPopup, setOpenPopup] = useState(false);

  const menuRef = useRef(null);

  const handleEdit = (brand) => {
    setEditBrand(brand);
    dispatch(switchPopupBrands());
  };

  // TODO: falta que el servicio elimine la marca

  const handleDelete = (brand) => {
    setDeleteBrand(brand.id);
    RequestService.deleteBrand({ id: brand.id });
    console.log(deleteBrand);
  };

  const handleView = (brand) => {
    setViewBrand(brand);
  };

  const handleClickPopup = () => {
    dispatch(switchPopupBrands());
  };

  const classes = useStyles();
  return (
    <Page title="Inventario: Categorias" sx={{ height: '100%' }}>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
        <HeaderBreadcrumbs
          heading="Marcas"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Inventario',
              href: PATH_DASHBOARD.inventory.root
            },
            { name: 'Marcas' }
          ]}
          action={
            <Button variant="contained" onClick={handleClickPopup} startIcon={<Icon icon={plusFill} />}>
              Crear marca
            </Button>
          }
        />
        <Grid className={classes.root} container spacing={2}>
          <Grid sx={{ height: '100%' }} item xs={12} md={4}>
            <Card>
              {brands.length === 0 ? (
                <Skeleton variant="rectangular" height={400} />
              ) : (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
                  {brands.map((brand) => (
                    <Fragment key={brand.id}>
                      <ListItem
                        disablePadding
                        ref={menuRef}
                        secondaryAction={
                          <MenuCategories
                            handleEdit={handleEdit}
                            edit
                            element={brand}
                            handleView={handleView}
                            handleDelete={handleDelete}
                          />
                        }
                      >
                        <ListItemButton
                          sx={{ padding: 1.5, paddingLeft: 2 }}
                          onClick={() => handleView(brand)}
                          ref={menuRef}
                        >
                          <ListItemText primary={brand.name} />
                        </ListItemButton>
                      </ListItem>
                    </Fragment>
                  ))}
                </List>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                {viewBrand.name.length < 1 ? (
                  'seleciona una marca'
                ) : (
                  <>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                      {viewBrand?.name}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 3 }}>
                      id: {viewBrand?.id}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Productos asociados
                    </Typography>
                    <DataGrid
                      checkboxSelection
                      disableSelectionOnClick
                      autoHeight
                      rows={viewBrand?.products}
                      columns={columns}
                      pagination
                      pageSize={10}
                      rowHeight={60}
                      // loading={viewBrand?.products?.length === 0}
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
      <PopupCreateBrand open={openPopup} edit={editBrand} handleClose={handleClickPopup} />
    </Page>
  );
}
