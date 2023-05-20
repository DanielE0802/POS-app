import { Divider, Icon, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import { Edit, MoreVert, PanoramaFishEyeRounded } from '@material-ui/icons';
import React, { useState, useRef } from 'react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

export default function MenuCategories() {
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
        <MenuItem>
          <Edit width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Editar
          </Typography>
        </MenuItem>
        <MenuItem>
          <PanoramaFishEyeRounded width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Ver
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: 'error.main' }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
