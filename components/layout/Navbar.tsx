'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '@/lib/theme-provider';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ 
            mr: 2,
            color: theme.palette.mode === 'light' ? 'black' : 'white'
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="large" color="default">
            <SearchIcon />
          </IconButton>
          <IconButton size="large" color="default">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Toggle theme">
            <IconButton onClick={toggleColorMode} color="default">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton size="large" color="default">
              <PersonIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton size="large" color="default">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: theme.palette.primary.main,
              cursor: 'pointer',
            }}
          >
            M
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}