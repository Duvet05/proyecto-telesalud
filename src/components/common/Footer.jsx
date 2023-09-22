import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Logo from "../../assets/images/medical-logo-png-878.png";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box mt="80px" bgcolor="#FFF3F4" px="40px" py="24px">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 4 }} alignItems="center" justifyContent="center">
        <img src={Logo} alt="Medical Logo" style={{ width: '200px', height: 'auto' }} />
        
        <Typography variant="h5" color={theme.palette.grey[700]} textAlign="center" mt={{ xs: 2, md: 0 }}>
          Made with ❤️ by Elyees
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
