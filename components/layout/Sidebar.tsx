'use client';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import WaterIcon from '@mui/icons-material/Water';
import { usePathname, useRouter } from 'next/navigation';

const DRAWER_WIDTH = 260;

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { path: '/', icon: <DashboardIcon />, text: 'Dashboard' },
    { path: '/kraken', icon: <WaterIcon />, text: 'Kraken' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? DRAWER_WIDTH : 64,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? DRAWER_WIDTH : 64,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: isOpen ? 'space-between' : 'center' }}>
          {isOpen && (
            <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.mode === 'light' ? 'black' : 'white' }}>
              MANTIS
            </Typography>
          )}
          <IconButton 
            onClick={onToggle}
            sx={{ 
              color: theme.palette.mode === 'light' ? 'black' : 'white'
            }}
          >
            {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List component="nav" sx={{ px: 2, py: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ opacity: isOpen ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}