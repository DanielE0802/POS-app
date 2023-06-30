import React, { useState } from 'react';
import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useTheme } from '@material-ui/core/styles';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@material-ui/core';
// redux
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from '../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity
} from '../../../redux/slices/product';
// routes
//
import Scrollbar from '../../Scrollbar';
import EmptyContent from '../../EmptyContent';
import { CheckoutProductList } from '../e-commerce/checkout';
import POSsummary from './POSsummary';

function POScontainer() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart, total, discount, subtotal } = checkout;
  const isEmptyCart = false;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const [view, setView] = React.useState(1);

  const drawerWidth = 380;
  const theme = useTheme();
  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.quantity));
  const [value, setValue] = useState(dayjs()); // Obtén la fecha actual automáticamente

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {view === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Venta POS
                      <Typography component="span" sx={{ color: 'text.secondary' }}>
                        &nbsp;(PDV: Palmira)
                      </Typography>
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                  action={
                    <>
                      <IconButton>
                        <Icon icon="ic:round-settings" />
                      </IconButton>
                    </>
                  }
                />
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <TextField size="small" fullWidth label="Buscar producto" name="search" />
                  <TextField size="small" fullWidth label="Vendedor" name="seller" />
                  <TextField size="small" fullWidth label="Forma de pago" name="paymentMethod" />
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <TextField size="small" fullWidth label="Tipo de venta" name="saleType" />
                  <TextField size="small" fullWidth label="Fecha" name="date" />
                  <TextField size="small" fullWidth label="Hora" name="time" />
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <TextField size="small" fullWidth label="Total" name="total" />
                  <TextField size="small" fullWidth label="Descuento" name="discount" />
                  <TextField size="small" fullWidth label="IVA" name="iva" />
                  <TextField size="small" fullWidth label="Observaciones" name="observations" />
                </Stack>
              </Card>
              <Card sx={{ mb: 3 }}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Productos añadidos
                      <Typography component="span" sx={{ color: 'text.secondary' }}>
                        &nbsp;({totalItems} item)
                      </Typography>
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                />

                {!isEmptyCart ? (
                  <Scrollbar>
                    <CheckoutProductList
                      formik={formik}
                      onDelete={handleDeleteCart}
                      onIncreaseQuantity={handleIncreaseQuantity}
                      onDecreaseQuantity={handleDecreaseQuantity}
                    />
                  </Scrollbar>
                ) : (
                  <EmptyContent
                    title="Cart is empty"
                    description="Look like you have no items in your shopping cart."
                    img="/static/illustrations/illustration_empty_cart.svg"
                  />
                )}
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <POSsummary
                total={total}
                enableDiscount
                discount={discount}
                subtotal={subtotal}
                onApplyDiscount={handleApplyDiscount}
              />
              <Button fullWidth size="large" type="submit" variant="contained" disabled={values.products.length === 0}>
                Check Out
              </Button>
            </Grid>
          </Grid>
        )}
        {view === 1 && (
          <Box sx={{ display: 'flex' }}>
            <AppBar
              position="fixed"
              sx={{
                background: theme.palette.background.default,
                width: `calc(100% - ${drawerWidth}px)`,
                mr: `${drawerWidth}px`
              }}
            >
              <CardHeader
                title={
                  <Typography sx={{ color: theme.palette.text.primary }} variant="h6">
                    Venta POS
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;(PDV: Palmira)
                    </Typography>
                  </Typography>
                }
                sx={{ p: 2 }}
                action={
                  <>
                    <IconButton>
                      <Icon icon="ic:round-settings" />
                    </IconButton>
                  </>
                }
              />
            </AppBar>

            {/* Content */}
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1, pb: 7 }}>
              <Toolbar />
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 2, mb: 2 }}>
                  {/* <CardHeader
                    title={
                      <Typography variant="h6">
                        Venta POS
                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                          &nbsp;(PDV: Palmira)
                        </Typography>
                      </Typography>
                    }
                    sx={{ mb: 3 }}
                    action={
                      <>
                        <IconButton>
                          <Icon icon="ic:round-settings" />
                        </IconButton>
                      </>
                    }
                  /> */}
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <TextField size="small" fullWidth label="Tipo de venta" name="saleType" />
                    <TextField size="small" fullWidth label="Fecha" name="date" />
                    <TextField size="small" fullWidth label="IVA" name="iva" />

                    {/* Campo de fecha controlado con estado y función de cambio */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {/* <DateField
                        fullWidth
                        size="small"
                        label="Full letter month"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        format="MM-DD-YYYY"
                      /> */}
                      <DatePicker
                        fullWidth
                        sx={{
                          width: '100%',
                          '& input': {
                            fontSize: '1.05rem', // Ajusta el tamaño del texto
                            padding: '8px'
                          }
                        }}
                        label="Fecha"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        format="MM-DD-YYYY"
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <TextField size="small" fullWidth label="Buscar producto" name="search" />
                    <TextField size="small" fullWidth label="Forma de pago" name="paymentMethod" />
                    <TextField size="small" fullWidth label="Vendedor" name="seller" />
                  </Stack>
                </Card>
                <Card sx={{ mb: 3 }}>
                  <CardHeader
                    title={
                      <Typography variant="h6">
                        Productos añadidos
                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                          &nbsp;({totalItems} item)
                        </Typography>
                      </Typography>
                    }
                    sx={{ mb: 3 }}
                  />

                  {!isEmptyCart ? (
                    <Scrollbar>
                      <CheckoutProductList
                        formik={formik}
                        onDelete={handleDeleteCart}
                        onIncreaseQuantity={handleIncreaseQuantity}
                        onDecreaseQuantity={handleDecreaseQuantity}
                      />
                    </Scrollbar>
                  ) : (
                    <EmptyContent
                      title="Cart is empty"
                      description="Look like you have no items in your shopping cart."
                      img="/static/illustrations/illustration_empty_cart.svg"
                    />
                  )}
                </Card>
              </Grid>
            </Box>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  boxShadow: '-5px 1px 129px -28px rgb(130 125 125 / 32%)'
                }
              }}
              variant="permanent"
              anchor="right"
            >
              <Divider />
              <Divider />
              <POSsummary
                total={total}
                enableDiscount
                discount={discount}
                subtotal={subtotal}
                onApplyDiscount={handleApplyDiscount}
              />
            </Drawer>

            {/* Bottom container */}
            <AppBar
              position="fixed"
              sx={{
                bottom: 0,
                top: 'auto',
                background: theme.palette.background.default,
                width: `calc(100% - ${drawerWidth}px)`,
                mr: `${drawerWidth}px`
              }}
            >
              <CardHeader
                title={
                  <Typography sx={{ color: theme.palette.text.primary }} variant="h6">
                    Venta POS
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;(PDV: Palmira)
                    </Typography>
                  </Typography>
                }
                sx={{ p: 2 }}
              />
            </AppBar>
          </Box>
        )}
      </Form>
    </FormikProvider>
  );
}

export default POScontainer;
