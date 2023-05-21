import { Divider, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { Edit, MoreVert, Visibility, Delete } from '@material-ui/icons';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
// import trash2Outline from '@iconify/icons-eva/trash-2-outline';

export default function MenuCategories({ handleEdit, handleDelete, handleView }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={() => handleEdit()}>
          <Edit width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Editar
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleView()}>
          <Visibility width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Ver
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDelete()} sx={{ color: 'error.main' }}>
          <Delete width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

MenuCategories.propsTypes = {
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleView: PropTypes.func
};
