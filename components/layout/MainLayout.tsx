'use client';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const DRAWER_WIDTH = 260;
  const theme = useTheme();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={open} onToggle={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${open ? DRAWER_WIDTH : 64}px)` },
          ml: { sm: `${open ? DRAWER_WIDTH : 64}px` },
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          bgcolor: 'background.default',
          mt: '64px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}