const columns = [
  {
    field: 'id',
    hide: true
  },
  {
    field: 'images',
    headerName: 'Imagen',
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    renderCell: (params) => {
      const imgUrl = params.getValue(params.id, 'images');
      return <ThumbImgStyle variant="square" alt={params.row.name} src={imgUrl[0]} sx={{ width: 74, height: 74 }} />;
    }
  },
  {
    field: 'name',
    headerName: 'Nombre',
    maxWidth: 200,
    minWidth: 150,
    flex: 1.5
  },
  {
    field: 'priceSale',
    headerName: 'Precio',
    maxWidth: 200,
    minWidth: 140,
    flex: 1,
    renderCell: (params) => {
      // TODO: que muestre el precio de venta formateado segun la moneda
      const priceSale = params.getValue(params.id, 'priceSale');
      return (
        <Typography variant="body2" noWrap>
          {fCurrency(priceSale)}
        </Typography>
      );
    }
  },
  {
    field: 'sku',
    headerName: 'Sku',
    minWidth: 140,
    flex: 1
  },
  // TODO: agregar status
  {
    field: 'status',
    type: 'singleSelect',
    headerName: 'Estado',
    align: 'center',
    headerAlign: 'center',
    width: 140,
    // flex: 1,
    valueOptions: ['active', 'disable'],
    renderCell: (params) => {
      // const getStatus = params.getValue(params.id, 'status');
      const getStatus = 'active';
      return RenderStatus(getStatus);
    }
  },
  {
    field: 'quantityStock',
    headerName: 'Stock',
    width: 140,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const getStock = params.getValue(params.id, 'quantityStock');
      return RenderStock(getStock);
    }
  },
  // {
  //   field: 'performance',
  //   type: 'number',
  //   headerName: 'Performance',
  //   width: 160,
  //   renderCell: (params) => {
  //     const value = params.getValue(params.id, 'performance');
  //     return (
  //       <Stack direction="row" alignItems="center" sx={{ px: 2, width: 1, height: 1 }}>
  //         <LinearProgress
  //           value={value}
  //           variant="determinate"
  //           color={(value < 30 && 'error') || (value > 30 && value < 70 && 'warning') || 'primary'}
  //           sx={{ width: 1, height: 6 }}
  //         />
  //         <Typography variant="caption" sx={{ width: 90 }}>
  //           {fPercent(value)}
  //         </Typography>
  //       </Stack>
  //     );
  //   }
  // },
  {
    field: 'action',
    headerName: ' ',
    width: 80,
    align: 'right',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const selectedID = params.row.id;

      const handleClick = () => {
        console.log('selectedID', selectedID);
      };

      return (
        <MIconButton onClick={handleClick}>
          <Box component={Icon} icon={moreVerticalFill} sx={{ width: 20, height: 20 }} />
        </MIconButton>
      );
    }
  }
];
