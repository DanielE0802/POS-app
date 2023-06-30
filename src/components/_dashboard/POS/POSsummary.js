import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
  Autocomplete
} from '@material-ui/core';
// utils
import { IconButton } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

POSsummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool
};

export default function POSsummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping = null,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false
}) {
  const displayShipping = shipping !== null ? 'Free' : '-';

  const theme = useTheme();
  const clientes = [
    { name: 'Cliente 1', id: 1, cc: '123456789', phone: '123456789', email: 'prueba@gmail.com', address: 'Calle 123' },
    { name: 'Cliente 2', id: 2, cc: '123456789', phone: '123456789', email: 'prueba2@gmail.com', address: 'Calle 123' },
    { name: 'Cliente 3', id: 3, cc: '123456789', phone: '123456789', email: 'prueba3@gmail.com', address: 'Calle 123' }
  ];

  return (
    <Card sx={{ mb: 0, borderRadius: '0 !important', height: '100%', display: 'flex', flexDirection: 'column  ' }}>
      <CardHeader
        title="Factura de venta"
        sx={{ mb: 2 }}
        action={
          <>
            <IconButton>
              <Icon icon="mingcute:print-line" />
            </IconButton>
            <IconButton>
              <Icon icon="ic:round-settings" />
            </IconButton>
          </>
        }
      />
      <Divider />
      <Stack p={3} direction="row" alignItems="center" justifyContent="space-between">
        <Typography mr={2} variant="subtitle1">
          Cliente:
        </Typography>
        <Autocomplete
          disablePortal
          fullWidth
          size="small"
          options={clientes}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} placeholder="Buscar cliente" />}
        />
      </Stack>

      <Divider />

      <CardContent sx={{ background: theme.palette.grey[200], borderRadius: 1, margin: 2, padding: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Shipping
            </Typography>
            <Typography variant="subtitle2">{shipping ? fCurrency(shipping) : displayShipping}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(total)}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Stack>

          {enableDiscount && (
            <TextField
              fullWidth
              placeholder="Discount codes / Gifts"
              value="DISCOUNT5"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="button" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                      Apply
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          )}
        </Stack>
      </CardContent>
      <Button
        sx={{ marginTop: 'auto', borderRadius: '0 !important' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={false}
      >
        Vender
      </Button>
    </Card>
  );
}
