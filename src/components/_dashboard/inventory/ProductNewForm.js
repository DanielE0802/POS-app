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
  IconButton,
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
  MenuItem,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Link,
  Box
} from '@material-ui/core';
import Zoom from '@mui/material/Zoom';

// utils
import Quagga from 'quagga';
import Webcam from 'react-webcam';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Icon } from '@iconify/react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import searchFill from '@iconify/icons-eva/search-fill';
import MenuCategories from './product-list/categories/MenuCategories';
import PopupAssingInventory from './PopupAssignInventory';
import CustomTooltip from './common/CustomTooltip';
import { NumericFormatCustom } from './NumericFormatCustom';
import PopupAddVariantes from './PopupAddVariantes';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
import RequestService from '../../../api/services/service';
import { useDispatch, useSelector } from '../../../redux/store';
import { getCategories, getProductsInCategory, switchPopupState } from '../../../redux/slices/categories';

// ----------------------------------------------------------------------
const TAXES_OPTIONS = [
  { name: 'Ninguno (0%)', percentage: 0 },
  { name: 'IVA - (19.00%)', percentage: 19 },
  { name: 'Transporte - (10.00%)', percentage: 10 }
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
    name: Yup.string().required('Nombre es requerido'),
    description: Yup.string().optional(),
    typeProduct: Yup.string().optional(),
    images: Yup.array().optional(),
    priceBase: Yup.number().required('Precio base es requerido'),
    priceSale: Yup.number().required('Precio de venta es requerido'),
    taxesOption: Yup.string().required('Impuesto es requerido'),
    state: Yup.bool().required('Estado es requerido'),
    sku: Yup.string().optional(),
    barCode: Yup.string().required('Código de barras es requerido'),
    wareHouse: Yup.array().required('Punto de venta es requerido'),
    category: Yup.string().required('Categoria es requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      barCode: currentProduct?.barCode || '',
      sku: currentProduct?.sku || '',
      typeProduct: currentProduct?.typeProduct || 'simple',
      priceBase: currentProduct?.priceBase || '',
      priceSale: currentProduct?.priceSale || '',
      state: currentProduct?.state || true,
      sellInNegative: currentProduct?.sellInNegative || false,
      // category: currentProduct?.category || CATEGORY_OPTION[0].name,
      taxesOption: currentProduct?.taxesOption || 0,
      wareHouse: currentProduct?.wareHouse || [{ title: 'Principal', id: 0, quantity: 0, minQuantity: 0 }],
      category: currentProduct?.category || ''
    },
    validationSchema: NewProductSchema,
    validate: (values) => {
      console.log(values);
    },

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log('submit');
        await fakeRequest(500);
        await RequestService.createProduct(values);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.inventory.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldTouched, isSubmitting, setFieldValue, getFieldProps } = formik;

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
  const [productType, setProductType] = useState('simple');

  const handleProductTypeChange = (event, state) => {
    setProductType(state);
    setFieldValue('typeProduct', state);
  };

  const calculatePriceSale = (priceBase, taxPercentage) => {
    if (priceBase === 0 || Number.isNaN(priceBase) || typeof priceBase === 'string') return 0;
    if (taxPercentage === 0) return priceBase;

    const taxAmount = (priceBase * taxPercentage) / 100; // Calcular el monto del impuesto
    const priceSale = priceBase + taxAmount; // Calcular el precio total sumando el monto del impuesto
    if (priceSale % 1 !== 0) {
      return Number(priceSale.toFixed(2));
    }
    // Verificar si es un string
    console.log(typeof priceSale);
    return priceSale;
  };

  const calculatePriceBase = (priceSale, taxPercentage) => {
    if (priceSale === 0 || Number.isNaN(priceSale)) return 0;
    const priceBase = (priceSale * 100) / (100 + taxPercentage); // Calcular el precio base
    if (priceBase % 1 !== 0) {
      return Number(priceBase.toFixed(2));
    }

    return priceBase;
  };

  useEffect(() => {
    // Obtener el valor actual de taxesOption
    const taxPercentage = values.taxesOption;

    // Calcular el nuevo priceSale utilizando calculatePriceSale
    const newPriceSale = calculatePriceSale(values.priceBase, taxPercentage);

    // Actualizar el valor de priceSale en el estado de Formik
    setFieldValue('priceSale', newPriceSale);

    // Notificar a Formik que se ha realizado un cambio en el campo priceSale
    setFieldTouched('priceSale', true);
  }, [values.taxesOption, setFieldValue, setFieldTouched, values.priceBase]);

  // Popup to assign inventory
  const handleAssignInventory = (wareHouse, quantity, minQuantity) => {
    if (warehouseEdit) {
      handleEditInventory(wareHouse, quantity, minQuantity);
      return;
    }
    if (values.wareHouse.some((item) => item.id === wareHouse.id)) {
      enqueueSnackbar(`La bodega ${wareHouse.title} ya esta seleccionada, asignale una cantidad editandola.`, {
        variant: 'warning'
      });
      return;
    }
    setFieldValue('wareHouse', [
      ...values.wareHouse,
      {
        title: wareHouse.title,
        id: wareHouse.id,
        quantity,
        minQuantity
      }
    ]);
  };

  const [warehouseEdit, setWarehouseEdit] = useState(null);

  const handleEditInventory = (wareHouse, quantity, minQuantity) => {
    const newWareHouse = values.wareHouse.map((item) => {
      if (item.id === wareHouse.id) {
        return {
          ...item,
          quantity,
          minQuantity
        };
      }
      if (item.id === warehouseEdit.id) {
        return {
          title: wareHouse.title,
          id: wareHouse.id,
          quantity,
          minQuantity
        };
      }
      return item;
    });
    setFieldValue('wareHouse', newWareHouse);
    setWarehouseEdit(null);
  };

  const setEditWareHouse = (warehouse) => {
    setWarehouseEdit(warehouse);
    handleClickOpenPopupWarehouse();
  };

  const deleteWareHouse = (warehouse) => {
    const newWareHouse = values.wareHouse.filter((item) => item.id !== warehouse.id);
    setFieldValue('wareHouse', newWareHouse);
  };

  const [openPopupWarehouse, setOpenPopupWarehouse] = useState(false);

  const handleClickOpenPopupWarehouse = () => {
    setOpenPopupWarehouse(true);
  };

  const handleClosePopupWarehouse = () => {
    setOpenPopupWarehouse(false);
  };
  const [updatedElement, setUpdatedElement] = useState(null);

  // control category
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  // Get categories and get products in category from API
  useEffect(() => {
    dispatch(getCategories());
    console.log('get categories');
  }, [dispatch]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const [searchQueryCategory, setSearchQueryCategory] = React.useState('');
  const [searchResultsCategory, setSearchResults] = React.useState(categories);

  //   data
  const [selectedOptionCategory, setSelectedOptionCategory] = React.useState(''); // Nuevo estado para almacenar la opción seleccionada

  const handleCategorySelect = (event, option) => {
    setSelectedOptionCategory(option); // Actualizar el estado con la opción seleccionada
    setFieldValue('category', option?.id); // Actualizar el valor del campo category en Formik
  };
  const handleInputCategoryChange = (event, value) => {
    setSearchQueryCategory(value);
  };

  const isOptionEqualToValue = (option, value) => {
    if (option && value) {
      return option.id === value.id && option.name === value.name;
    }
    return false;
  };
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Información general del producto */}
            <Card sx={{ p: 3, overflow: 'visible', zIndex: 99 }}>
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
                <Stack flexDirection="row" gap={2}>
                  <TextField
                    fullWidth
                    label="Codigo de barras"
                    {...getFieldProps('barCode')}
                    // Insertar icono de escaner de código de barras
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Escanear código de barras" TransitionComponent={Zoom} arrow>
                            <IconButton
                              onClick={() => {
                                console.log('Hola');
                              }}
                            >
                              <Icon icon="carbon:scan" width={30} height={30} />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    fullWidth
                    label="SKU"
                    {...getFieldProps('sku')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CustomTooltip
                            title="(opcional) es el código interno que cada negocio crea por sí mismo para sus productos"
                            TransitionComponent={Zoom}
                            arrow
                          >
                            <Icon icon="carbon:scan" width={30} height={30} />
                          </CustomTooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  {/* Categorias */}
                  <Autocomplete
                    fullWidth
                    value={selectedOptionCategory}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    options={categories}
                    inputValue={searchQueryCategory}
                    onInputChange={handleInputCategoryChange}
                    onChange={handleCategorySelect}
                    isOptionEqualToValue={isOptionEqualToValue}
                    loading={categories.length === 0}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Categoria"
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
                      const matches = match(option.name, searchQueryCategory);
                      const parts = parse(option.name, matches);

                      return (
                        <>
                          <li {...props}>
                            <Link onClick={() => handleCategorySelect(option)} to="#" underline="none">
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
                        </>
                      );
                    }}
                    ListboxComponent={(props) => (
                      <ul
                        style={{
                          maxHeight: 300, // Ajusta la altura máxima del menú desplegable según tus necesidades
                          overflowY: 'auto', // Agrega desplazamiento vertical si el contenido excede la altura máxima
                          paddingTop: 0, // Añade un padding superior para el botón "Agregar punto de venta"
                          position: 'relative' // Establece la posición del contenedor ul como relativa
                        }}
                        {...props}
                      >
                        <ul
                          style={{
                            maxHeight: 250, // Ajusta la altura máxima del menú desplegable según tus necesidades
                            overflowY: 'auto', // Agrega desplazamiento vertical si el contenido excede la altura máxima
                            paddingTop: 0, // Añade un padding superior para el botón "Agregar punto de venta"
                            position: 'relative' // Establece la posición del contenedor ul como relativa
                          }}
                        >
                          {props.children}
                        </ul>
                        <li>
                          <Button fullWidth>
                            Crear categoria
                            <Icon style={{ marginLeft: 10 }} icon="gala:add" width={18} height={18} />
                          </Button>
                        </li>
                      </ul>
                    )}
                    noOptionsText={
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ py: 2, px: 1 }}>
                          No se encontraron resultados a la búsqueda "{searchQueryCategory}"
                        </Typography>
                        <Button fullWidth>
                          Crear categoria
                          <Icon style={{ marginLeft: 10 }} icon="gala:add" width={18} height={18} />
                        </Button>
                      </>
                    }
                  />
                </Stack>

                <Stack>
                  <LabelStyle>Descripción</LabelStyle>
                  <QuillEditor
                    simple
                    placeholder="Escribe una descripción..."
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

            {/* Precio base, impuesto y precio de venta del producto */}
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
                    onChange={(e) => {
                      console.log('change price base');
                      const priceBase = parseFloat(e.target.value);
                      const taxPercentage = values.taxesOption; // Obtener el porcentaje de impuesto según la opción seleccionada
                      const priceSale = calculatePriceSale(priceBase, taxPercentage); // Calcular el precio total
                      setFieldValue('priceBase', priceBase); // Actualizar el valor de Precio Base
                      setFieldValue('priceSale', priceSale); // Actualizar el valor de Precio Total
                    }}
                    value={values.priceBase}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      inputComponent: NumericFormatCustom
                    }}
                  />
                  <Icon icon="ic:round-plus" width="60" height="60" />

                  <FormControl fullWidth>
                    <InputLabel>Impuesto</InputLabel>
                    <Select
                      label="Impuesto"
                      {...getFieldProps('taxesOption')}
                      value={values.taxesOption === 0 ? 0 : values.taxesOption}
                      renderValue={(selectedValue) => {
                        const selectedTax = TAXES_OPTIONS.find((tax) => tax.percentage === selectedValue);
                        return selectedTax ? selectedTax.name : '';
                      }}
                    >
                      {TAXES_OPTIONS.map((tax) => (
                        <MenuItem key={tax.name} value={tax.percentage}>
                          {tax.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Icon icon="material-symbols:equal-rounded" width="60" height="60" />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Precio Total"
                    onChange={(e) => {
                      const priceSale = parseFloat(e.target.value);
                      const taxPercentage = values.taxesOption; // Obtener el porcentaje de impuesto según la opción seleccionada
                      const priceBase = calculatePriceBase(priceSale, taxPercentage); // Calcular el precio base
                      setFieldValue('priceBase', priceBase); // Actualizar el valor de Precio Base
                      setFieldValue('priceSale', priceSale); // Actualizar el valor de Precio Total
                    }}
                    value={values.priceSale}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      inputComponent: NumericFormatCustom
                    }}
                  />
                </Stack>
              </Stack>
            </Card>
            {/* Punto de venta */}
            <Card sx={{ p: 3, mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                Punto de venta: Inventario
              </Typography>
              <Divider sx={{ mb: 3, mt: 0.5 }} />
              <Typography variant="subtitle2" gutterBottom>
                Asigna el punto de venta donde se encuentra el producto.
              </Typography>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {values.wareHouse.map((item) => (
                  <ListItem key={item.id} sx={{ paddingLeft: 0 }}>
                    <ListItemAvatar onClick={() => setEditWareHouse(item)}>
                      <Avatar variant="rounded" sx={{ width: 60, height: 60 }}>
                        <Icon width={40} height={40} icon="tabler:building-warehouse" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      onClick={() => setEditWareHouse(item)}
                      primary={item.title}
                      secondary={`Cantidad: ${item.quantity} Cantidad minima: ${item.minQuantity}`}
                    />
                    <MenuCategories
                      // handleEdit={setEditWareHouse}
                      // // Al hacer click enviar el elemento actualizado con su valor
                      // onClick={() => console.log('hola')}
                      element={item} // Agrega esta línea
                      handleDelete={deleteWareHouse}
                      edit={false}
                      view={false}
                    />
                  </ListItem>
                ))}
              </List>
              <PopupAssingInventory
                handleAssignInventory={handleAssignInventory}
                warehouseEdit={warehouseEdit}
                handleClose={handleClosePopupWarehouse}
                open={openPopupWarehouse}
                handleClickOpen={handleClickOpenPopupWarehouse}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack>
                  <LabelStyle>Imagen del producto</LabelStyle>
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
                <Stack sx={{ mb: 1, mt: 3 }} flexDirection="row" alignItems="center">
                  <FormControlLabel
                    sx={{ mr: 0.4 }}
                    control={<Switch {...getFieldProps('state')} checked={values.state} />}
                    label="Producto activo"
                  />
                  <CustomTooltip title="Vende sin unidades disponibles" />
                </Stack>
                <Stack sx={{ mb: 1, mt: 0 }} flexDirection="row" alignItems="center">
                  <FormControlLabel
                    control={<Switch {...getFieldProps('sellInNegative')} checked={values.sellInNegative} />}
                    label="Venta en negativo"
                    sx={{ mr: 0.4 }}
                  />
                  <CustomTooltip title="Vende sin unidades disponibles" />
                </Stack>
              </Card>

              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Crear producto' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
      {/* <Webcam ref={webcamRef} /> */}
    </FormikProvider>
  );
}
