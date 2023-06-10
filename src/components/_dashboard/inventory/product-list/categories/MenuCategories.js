import { Divider, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { Edit, MoreVert, Visibility, Delete } from '@material-ui/icons';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import trash2Outline from '@iconify/icons-eva/trash-2-outline';

MenuCategories.propsTypes = {
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleView: PropTypes.func,
  view: PropTypes.bool
};

MenuCategories.defaultProps = {
  view: true
};

export default function MenuCategories({ handleEdit, handleDelete, handleView, view, element, edit }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [elementState, setElementState] = useState(element);

  useEffect(() => {
    console.log(elementState);
  }, [elementState]);

  const handleEditElement = () => {
    handleClose();
    console.log(elementState);
    handleEdit(elementState);
    // handleClose();
  };

  const ref = useRef(null);

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        ref={ref}
        aria-controls={openMenu ? 'long-menu' : undefined}
        aria-expanded={openMenu ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClickMenu}
      >
        <MoreVert />
      </IconButton>
      <Menu
        open={openMenu}
        anchorEl={ref.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {edit && (
          <MenuItem onClick={handleEditElement}>
            <Edit width={20} height={20} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              Editar
            </Typography>
          </MenuItem>
        )}

        {view && (
          <MenuItem onClick={() => handleView()}>
            <Visibility width={20} height={20} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              Ver
            </Typography>
          </MenuItem>
        )}

        <Divider />
        <MenuItem onClick={() => handleDelete(element)} sx={{ color: 'error.main' }}>
          <Delete width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
