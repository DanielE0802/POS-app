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
import { Slide } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { UploadMultiFile } from '../../../../upload';
import fakeRequest from '../../../../../utils/fakeRequest';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const categories = [
  {
    id: 0,
    name: 'Sin categoría'
  },
  {
    id: 1,
    name: 'Categoría 1',
    description: 'Descripción de la categoría 1',
    image: 'https://source.unsplash.com/random'
  },
  {
    id: 2,
    name: 'Categoría 2',
    description: 'Descripción de la categoría 2',
    image: 'https://source.unsplash.com/random'
  },
  {
    id: 3,
    name: 'Categoría 3',
    description: 'Descripción de la categoría 3',
    image: 'https://source.unsplash.com/random'
  }
];

function PopupCreateCategory({ open, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();

  // create category schema
  const createCategorySchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    description: Yup.string().required('Descripción requerida'),
    images: Yup.array().min(1, 'Images is required'),
    parentCategory: Yup.string(),
    image: Yup.string().required('Imagen requerida')
  });
  // Formmik
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      parentCategory: '0',
      images: []
    },
    validationSchema: createCategorySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values);
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Create success', { variant: 'success' });
        handleClose();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  // Upload image
  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  // Remove all images

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  // Remove image

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

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
                <TextField
                  fullWidth
                  label="Imagen"
                  {...getFieldProps('image')}
                  error={Boolean(touched.image && errors.image)}
                  helperText={touched.image && errors.image}
                />
              </Stack>
              <Stack flex={1}>
                <LabelStyle>Add Images</LabelStyle>
                <UploadMultiFile
                  showPreview
                  maxSize={3145728}
                  accept="image/*"
                  files={values.images}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  error={Boolean(touched.images && errors.images)}
                />
                {touched.images && errors.images && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.images && errors.images}
                  </FormHelperText>
                )}
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ pt: '0 !important' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Crear categoria
            </LoadingButton>
            <Button type="submit" variant="outlined" onClick={handleClose}>
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
