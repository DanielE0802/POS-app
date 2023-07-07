import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Slide } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { createCategory, getCategories } from '../../../../../redux/slices/categories';
import { UploadMultiFile } from '../../../../upload';
import fakeRequest from '../../../../../utils/fakeRequest';
import RequestService from '../../../../../api/services/service';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

function PopupCreateCategory({ open, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // create category schema
  const createCategorySchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    description: Yup.string().required('Descripción requerida'),
    parentCategory: Yup.string().optional()
  });
  // Formmik
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      parentCategory: '0'
    },
    validationSchema: createCategorySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // dispatch(
        //   createCategory(
        //     values.parentCategory === '0' ? { name: values.name, description: values.description } : values
        //   )
        // );
        await RequestService.createCategory(
          values.parentCategory === '0' ? { name: values.name, description: values.description } : values
        );
        dispatch(getCategories());
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Create success', { variant: 'success' });
        handleClose();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        // TODO: en la categoria debe tener una categoria padre que la por defecto que la contiene a todas para poder selecionarla y que no se pueda eliminar
        enqueueSnackbar('No se pudo crear la categoria', { variant: 'error' });
        setErrors({ afterSubmit: error.code });
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const { categories } = useSelector((state) => state.categories);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle sx={{ mb: 2 }}>Crear categoria</DialogTitle>
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
                <TextField
                  fullWidth
                  label="Descripción"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
                <FormControl fullWidth>
                  <InputLabel> Categoría padre </InputLabel>
                  <Select
                    label="Categoría padre"
                    fullWidth
                    {...getFieldProps('parentCategory')}
                    value={values.parentCategory}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ pt: '0 !important' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Crear categoria
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

PopupCreateCategory.propTypes = {
  open: PropTypes.func,
  handleClose: PropTypes.func
};

export default PopupCreateCategory;
