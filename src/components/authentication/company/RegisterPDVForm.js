import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import React, { useEffect } from 'react';
import { Alert, Autocomplete, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@material-ui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import RequestService from '../../../api/services/service';

export default function RegisterPDVForm({ nextStep, activeStep, handleBack, setPrevValues, prevValues }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const RegisterPDVSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    description: Yup.string().required('Descripción requerida'),
    departament: Yup.object().required('Departamento requerido'),
    city: Yup.object().required('Ciudad requerida'),
    address: Yup.string().required('Dirección requerida'),
    phone: Yup.string().required('Teléfono requerido')
  });

  const formik = useFormik({
    initialValues: {
      name: prevValues?.name || '',
      description: prevValues?.description || '',
      departament: prevValues?.departament || '',
      city: prevValues?.city || '',
      address: prevValues?.address || '',
      phone: prevValues?.phone || ''
    },
    validationSchema: RegisterPDVSchema,
    onSubmit: async (values, { setErrors, setSubmitting, setValues }) => {
      try {
        // await register(values.email, values.password, values.name, values.lastName, values.dni, values.tel);
        nextStep();
        enqueueSnackbar('Registro del punto de venta completado', {
          variant: 'success'
        });
        setPrevValues(values);
        // TODO: si tengo prevValues, entonces hago un update, sino hago un create

        setSubmitting(false);
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const [deparments, setDepartments] = React.useState([]);
  const [department, setDepartment] = React.useState('');
  const [cities, setCities] = React.useState([]);

  const fetchDepartments = async () => {
    const response = await RequestService.getDepartments();
    // change departamentos to label in the array
    const departamentos = response.data.map((departamento) => ({ label: departamento.departamento }));
    setDepartments(departamentos);
  };

  useEffect(() => {
    console.log(department);
    if (department) {
      const fetchCities = async () => {
        const response = await RequestService.getCities({ department: department.label });
        // change departamentos to label in the array
        const cities = response.data.map((city) => ({ label: city.municipio }));
        setCities(cities);
      };
      fetchCities();
    }
  }, [department]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const { errors, touched, handleSubmit, getFieldProps, values, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography sx={{ marginTop: 5, mb: 3 }} variant="subtitle1" textAlign="center">
          Agrega tu punto de venta principal, despues podrás agregar más puntos de venta.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Nombre punto de venta"
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
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Autocomplete
            sx={{ mb: 2 }}
            fullWidth
            autoComplete="departament"
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
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
        </Stack>
        <Stack sx={{ marginTop: 8 }} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button onClick={handleBack} variant="outlined" component="label">
            Anterior
          </Button>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Siguiente paso
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
