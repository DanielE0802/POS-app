import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Autocomplete
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { getWarehouses } from '../../../../../redux/slices/warehouses';
import fakeRequest from '../../../../../utils/fakeRequest';

import RequestService from '../../../../../api/services/service';
import useAuth from '../../../../../hooks/useAuth';

function PopupCreateWarehouse({ open, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const { company } = useAuth();
  const dispatch = useDispatch();

  const [deparments, setDepartments] = React.useState([]);
  const [department, setDepartment] = React.useState('');
  const [cities, setCities] = React.useState([]);

  // create category schema
  const createCategorySchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    description: Yup.string().required('Descripción requerida'),
    departament: Yup.object().required('Departamento requerido'),
    city: Yup.object().required('Ciudad requerida'),
    address: Yup.string().required('Dirección requerida'),
    phone: Yup.string().required('Teléfono requerido')
  });
  // Formmik
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      departament: '',
      city: '',
      address: '',
      phone: ''
    },
    validationSchema: createCategorySchema,
    validate: (values) => {
      console.log(values);
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const dataBody = {
          name: values.name,
          description: values.description,
          address: values.address,
          phone: values.phone,
          main: false,
          company: { id: company.id },
          location: {
            id: values.city.id
          }
        };

        await RequestService.createPDV({ databody: dataBody });
        dispatch(getWarehouses(true));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(`Se ha creado existosamente el PDV ${values.name}`, { variant: 'success' });
        handleClose();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    console.log('este es el register pdv form');
    locations();
  }, []);

  const locations = async () => {
    const resp = (await RequestService.getLocations(true)).data;
    setDepartments(resp);
  };

  useEffect(() => {
    // setMunicipios(department?.towns);
    const towns = department?.towns ? department.towns : [];
    setCities(towns);
    // setMunicipios(municipiosOfDepartment);
  }, [values.departament, department]);

  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle sx={{ mb: 2 }}>Información del punto de venta</DialogTitle>
      <Divider sx={{ mb: 0, mt: 0.5 }} />
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Nombre"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Descripción"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
            <Autocomplete
              sx={{ mb: 2 }}
              fullWidth
              autoComplete="departament"
              getOptionLabel={(option) => option.name || ''}
              options={deparments}
              {...getFieldProps('departament')}
              onChange={(event, value) => {
                console.log(value);
                setDepartment(value);
                values.departament = value;
                values.city = '';
              }}
              renderInput={(params) => <TextField {...params} label="Departamento" />}
              error={Boolean(touched.departament && errors.departament)}
              helperText={touched.departament && errors.departament}
            />
            <Autocomplete
              sx={{ mb: 2 }}
              fullWidth
              autoComplete="city"
              getOptionLabel={(option) => option.name || ''}
              options={cities}
              {...getFieldProps('city')}
              onChange={(event, value) => {
                console.log(value);
                values.city = value;
              }}
              renderInput={(params) => <TextField {...params} label="Ciudad" />}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Dirección"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Teléfono"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </DialogContent>

          <DialogActions sx={{ pt: '0 !important' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Crear Punto De Venta
            </LoadingButton>
            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}

PopupCreateWarehouse.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default PopupCreateWarehouse;
