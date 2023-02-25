import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = (): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography style={{ cursor: 'pointer' }} variant="h6" component="div" onClick={() => navigate('/')}>
            Projects
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
