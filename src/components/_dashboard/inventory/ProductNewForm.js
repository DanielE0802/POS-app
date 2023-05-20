import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import {
  Divider,
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  MenuItem
} from '@material-ui/core';
// utils
import Quagga from 'quagga';
import Webcam from 'react-webcam';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Icon } from '@iconify/react';
import { NumericFormatCustom } from './NumericFormatCustom';
import PopupAddVariantes from './PopupAddVariantes';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';

// ----------------------------------------------------------------------

const GENDER_OPTION = ['Men', 'Women', 'Kids'];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] }
];

const TAXES_OPTIONS = [{ name: 'Ninguno (0%)' }, { name: 'IVA - (19.00%)' }, { name: 'Transporte - (10.00%)' }];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().required('Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || '',
      priceSale: currentProduct?.priceSale || '',
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      inStock: Boolean(currentProduct?.inventoryType !== 'out_of_stock'),
      taxes: true,
      gender: currentProduct?.gender || GENDER_OPTION[2],
      category: currentProduct?.category || CATEGORY_OPTION[0].name,
      taxesOption: currentProduct?.taxesOption || TAXES_OPTIONS[0].name
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.eCommerce.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

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

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  const handlePriceTaxes = (event) => {
    console.log('Hola');
    const prueba = getFieldProps('taxesOption');
    console.log(event.target.value);
    console.log(values.taxesOption);
    console.log(prueba);
  };

  // const webcamRef = useRef(null);

  // Barcode scanner with QuaggaJS

  // useEffect(() => {
  //   const startScanner = () => {
  //     Quagga.init(
  //       {
  //         inputStream: {
  //           name: 'Live',
  //           type: 'LiveStream',
  //           target: webcamRef.current.video
  //         },
  //         decoder: {
  //           readers: ['ean_reader'] // Puedes ajustar los tipos de códigos de barras a escanear
  //         }
  //       },
  //       (err) => {
  //         if (err) {
  //           console.error('Error al inicializar Quagga:', err);
  //         } else {
  //           Quagga.start();
  //         }
  //       }
  //     );

  //     Quagga.onDetected((data) => {
  //       console.log('Código de barras detectado:', data.codeResult.code);
  //       setFieldValue('code', data.codeResult.code);
  //       Quagga.stop();
  //     });
  //   };

  //   startScanner();

  //   return () => {
  //     Quagga.stop();
  //   };
  // }, []);

  // Change product type
  const [productType, setProductType] = useState('simple'); // State variable to track the product type

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h4">Información general</Typography>
              <Divider sx={{ mb: 3, mt: 0.5 }} />
              <Stack spacing={3}>
                <Typography variant="subtitle1">
                  Indica si manejas productos con variantes como color, talla u otra cualidad.
                </Typography>

                <RadioGroup
                  onChange={handleProductTypeChange}
                  defaultValue="simple"
                  sx={{ justifyContent: 'space-evenly' }}
                  row
                  name="type of product"
                >
                  <FormControlLabel value="simple" control={<Radio />} label="Producto simple" />
                  <FormControlLabel value="configurable" control={<Radio />} label="Producto configurable" />
                </RadioGroup>
                <TextField
                  fullWidth
                  label="Nombre del producto"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <Stack>
                  <LabelStyle>Descripción</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.description}
                    onChange={(val) => setFieldValue('description', val)}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack>
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
            </Card>
            {productType === 'configurable' && (
              <Card sx={{ p: 3, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Variantes
                </Typography>
                <Divider sx={{ mb: 3, mt: 0.5 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Agrega atributos para categorizar tus productos, como talla y color.
                </Typography>
                <Stack spacing={3}>{productType}</Stack>
                <PopupAddVariantes />
              </Card>
            )}
            <Card sx={{ p: 3, mt: 5 }}>
              <Typography variant="h4">Precio</Typography>
              <Divider sx={{ mb: 3, mt: 0.5 }} />
              <Stack spacing={3}>
                <Typography variant="subtitle1">
                  Indica el valor de venta y el costo de compra de tu producto.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <TextField
                    fullWidth
                    label="Precio base"
                    {...getFieldProps('price')}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      inputComponent: NumericFormatCustom
                    }}
                  />
                  <Icon fullWidth icon="ic:round-plus" width="60" height="60" />

                  <FormControl fullWidth>
                    <InputLabel>Impuestoo</InputLabel>
                    <Select label="Impuesto" {...getFieldProps('taxesOption')} value={values.taxesOption}>
                      {TAXES_OPTIONS.map((tax) => (
                        <MenuItem key={tax.name} value={tax.name} label={tax.name}>
                          {tax.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Icon fullWidth icon="material-symbols:equal-rounded" width="60" height="60" />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Precio Total"
                    {...getFieldProps('priceSale')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={<Switch {...getFieldProps('inStock')} checked={values.inStock} />}
                  label="In stock"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <TextField fullWidth label="Codigo de barras" {...getFieldProps('code')} />
                  <TextField fullWidth label="SKU" {...getFieldProps('sku')} />

                  <LabelStyle>Gender</LabelStyle>
                  <RadioGroup {...getFieldProps('gender')} row>
                    <Stack spacing={1} direction="row">
                      {GENDER_OPTION.map((gender) => (
                        <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                      ))}
                    </Stack>
                  </RadioGroup>

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" native {...getFieldProps('category')} value={values.category}>
                      {CATEGORY_OPTION.map((category) => (
                        <optgroup key={category.group} label={category.group}>
                          {category.classify.map((classify) => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Tags" {...params} />}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3} />

                <FormControlLabel
                  control={<Switch {...getFieldProps('taxes')} checked={values.taxes} />}
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                />
              </Card>

              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
      {/* <Webcam ref={webcamRef} /> */}
    </FormikProvider>
  );
}
