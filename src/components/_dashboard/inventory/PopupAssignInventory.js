import * as React from 'react';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import match from 'autosuggest-highlight/match';
import Slide from '@mui/material/Slide';
import parse from 'autosuggest-highlight/parse';
import {
  Box,
  InputAdornment,
  TextField,
  Stack,
  Link,
  Typography,
  Autocomplete,
  Divider,
  Grid
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack5';
import { ButtonAutocomplete } from './common/ButtonAutocomplete';
import SearchNotFound from '../../SearchNotFound';
import PopupCreateWarehouse from './product-list/warehouses/popupCreateWarehouse';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function PopupAssingInventory({
  handleAssignInventory,
  open,
  handleClose,
  handleClickOpen,
  warehouseEdit,
  setAssignWarehouse
}) {
  const [openCreateWarehouse, setOpenCreateWarehouse] = React.useState(false);
  const handleClickOpenCreateWarehouse = () => {
    setOpenCreateWarehouse(true);
    handleClose();
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseCreateWarehouse = () => {
    setOpenCreateWarehouse(false);
    handleClickOpen();
  };

  const assignInventorySchema = Yup.object().shape({
    warehouse: Yup.object({
      title: Yup.string().required('Punto de venta requerido'),
      id: Yup.string().required('Punto de venta requerido')
    })
      .required('Punto de venta requerido')
      .nullable(),

    quantity: Yup.number().required('Cantidad requerida'),
    minQuantity: Yup.number().optional(),
    edit: Yup.boolean()
  });

  const Formik = useFormik({
    initialValues: {
      warehouse: { title: '', id: '' },
      quantity: '',
      minQuantity: 0,
      edit: false
    },
    validationSchema: assignInventorySchema,
    onSubmit: (values, { resetForm, setSubmitting, setErrors }) => {
      try {
        const resp = handleAssignInventory(values.warehouse, values.quantity, values.minQuantity, values.edit);
        if (resp) {
          resetForm();
        }
        // resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        resetForm();
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = Formik;

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([
    { title: 'Principal', id: 0 },
    { title: 'Cali', id: 1 },
    { title: 'Palmira', id: 2 },
    { title: 'Pereira', id: 3 }
  ]);

  const [selectedOption, setSelectedOption] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [minQuantity, setMinQuantity] = React.useState('');

  React.useEffect(() => {
    console.log(selectedOption);
    console.log(quantity);
    console.log(minQuantity);
  }, [selectedOption, quantity, minQuantity]);

  useEffect(() => {
    if (warehouseEdit) {
      setFieldValue('warehouse', { title: warehouseEdit.title, id: warehouseEdit.id });
      setFieldValue('quantity', warehouseEdit.quantity);
      setFieldValue('minQuantity', warehouseEdit.minQuantity);
      setFieldValue('edit', true);
    } else {
      setFieldValue('warehouse', { title: '', id: '' });
      setFieldValue('quantity', '');
      setFieldValue('minQuantity', '');
      setFieldValue('edit', false);
    }
  }, [warehouseEdit, setFieldValue]);

  const handleInputChange = (event, value) => {
    setSearchQuery(value);
  };

  const isOptionEqualToValue = (option, value) => {
    if (option && value) {
      return option.id === value.id && option.title === value.title;
    }
    return false;
  };

  const handleOptionSelect = (event, option) => {
    setSelectedOption(option);
    setFieldValue('warehouse', option);
  };

  const validator = () => {
    if (values.warehouse.id === '') {
      enqueueSnackbar('Debe seleccionar un punto de venta', { variant: 'error' });
      return true;
    }
    if (values.quantity === '') {
      enqueueSnackbar('Debe ingresar una cantidad', { variant: 'error' });
      return true;
    }

    if (values.minQuantity === '') {
      enqueueSnackbar('Debe ingresar una cantidad mínima', { variant: 'error' });
      return true;
    }

    handleSubmit();
  };

  return (
    <Stack>
      <Button variant="outlined" sx={{ mt: 3 }} onClick={setAssignWarehouse}>
        Agregar punto de venta
        <Icon style={{ marginLeft: 10 }} icon="gala:add" width={18} height={18} />
      </Button>
      <Dialog maxWidth="sm" open={open}>
        <FormikProvider value={Formik}>
          <Form autoComplete="off">
            <DialogTitle>Seleccionar Punto De Venta</DialogTitle>
            <Button
              sx={{ position: 'absolute', right: 8, height: 50, top: 8, borderRadius: '100%', width: 50, minWidth: 50 }}
              onClick={handleClose}
            >
              <Icon width={24} height={24} icon="ion:close" />
            </Button>
            <Divider sx={{ mb: 0.5, mt: 2 }} />
            <DialogContent>
              <Autocomplete
                fullWidth
                disablePortal
                value={values.warehouse}
                getOptionLabel={(option) => option.title}
                {...getFieldProps('warehouse')}
                options={searchResults}
                inputValue={searchQuery}
                onInputChange={handleInputChange}
                onChange={handleOptionSelect}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Punto de venta"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box
                            component={Icon}
                            icon={searchFill}
                            sx={{
                              ml: 1,
                              width: 20,
                              height: 20,
                              color: 'text.disabled'
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                renderOption={(props, option) => {
                  const matches = match(option.title, searchQuery);
                  const parts = parse(option.title, matches);

                  return (
                    <li {...props}>
                      <Link onClick={() => handleOptionSelect(option)} to="#" underline="none">
                        <Box sx={{ typography: 'body2', display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.primary">
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                          </Typography>
                        </Box>
                      </Link>
                    </li>
                  );
                }}
                noOptionsText={
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2, px: 1 }}>
                      No se encontraron resultados a la búsqueda "{searchQuery}"
                    </Typography>
                  </>
                }
                PaperComponent={({ children }) =>
                  ButtonAutocomplete({
                    children,
                    handleOnClick: handleClickOpenCreateWarehouse,
                    title: 'Agregar punto de venta'
                  })
                }
              />
              <Stack direction="row" sx={{ marginTop: 3 }} spacing={2}>
                <TextField
                  onChange={(e) => setFieldValue('quantity', e.target.value)}
                  fullWidth
                  type="number"
                  label="Cantidad"
                  variant="outlined"
                  {...getFieldProps('quantity')}
                  error={Boolean(touched.quantity && errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
                <TextField
                  {...getFieldProps('minQuantity')}
                  type="number"
                  onChange={(e) => setFieldValue('minQuantity', e.target.value)}
                  fullWidth
                  label="Cantidad mínima"
                  variant="outlined"
                  error={Boolean(touched.minQuantity && errors.minQuantity)}
                  helperText={touched.minQuantity && errors.minQuantity}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              {/* <Button type="submit" variant="outlined" onClick={submitForm}>
                  Guardar
                </Button> */}
              <LoadingButton
                type="button"
                onClick={validator}
                fullWidth
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Guardar
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
      <PopupCreateWarehouse handleClose={handleCloseCreateWarehouse} open={openCreateWarehouse} />
    </Stack>
  );
}

PopupAssingInventory.propTypes = {
  handleAssignInventory: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleClickOpen: PropTypes.func,
  warehouseEdit: PropTypes.object
};
