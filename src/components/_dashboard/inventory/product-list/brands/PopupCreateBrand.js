import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Slide } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import RequestService from '../../../../../api/services/service';
import { getBrands } from '../../../../../redux/slices/brands';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function PopupCreateBrand({ open, handleClose, edit }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // create category schema
  const createCategorySchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido')
  });
  // Formmik
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: createCategorySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (edit) {
          await RequestService.editBrand({ id: edit.id, databody: { name: values.name } });
        } else {
          await RequestService.createBrand({ name: values.name });
        }
        dispatch(getBrands(true));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(edit ? 'Se ha editado correctamente' : `Se ha creado la marca ${values.name} correctamente`, {
          variant: 'success'
        });
        handleClose();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        enqueueSnackbar(edit ? 'No se ha podido editar' : 'No se ha podido crear la marca.', { variant: 'error' });
        setErrors({ afterSubmit: error.code });
      }
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;
  useEffect(() => {
    if (edit) {
      setFieldValue('name', edit.name);
    }
  }, [edit, setFieldValue]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle sx={{ mb: 2 }}>Crear marca</DialogTitle>
      <Divider sx={{ mb: 0, mt: 0.5 }} />
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3} direction="row" alignItems="center">
              <Stack flex={1} gap={3}>
                <TextField
                  fullWidth
                  label="Nombre"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ pt: '0 !important' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Crear marca
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

PopupCreateBrand.propTypes = {
  open: PropTypes.func,
  handleClose: PropTypes.func,
  edit: PropTypes.object
};

export default PopupCreateBrand;
