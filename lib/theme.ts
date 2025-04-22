'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      200: '#90caf9',
      800: '#1565c0',
    },
    secondary: {
      main: '#8c8c8c',
      light: '#bdbdbd',
      dark: '#616161',
      200: '#eeeeee',
      800: '#424242',
    },
    error: {
      light: '#ef9a9a',
      main: '#f44336',
      dark: '#c62828',
    },
    warning: {
      light: '#fff8e1',
      main: '#ffe57f',
      dark: '#ffc107',
    },
    success: {
      light: '#b9f6ca',
      main: '#69f0ae',
      dark: '#00c853',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      900: '#212121',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Public Sans',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
  },
  shape: {
    borderRadius: 8,
  },
  mixins: {
    toolbar: {
      minHeight: 60,
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 3px 8px rgba(0, 0, 0, 0.05)',
    '0px 4px 12px rgba(0, 0, 0, 0.05)',
    '0px 5px 16px rgba(0, 0, 0, 0.05)',
    '0px 6px 20px rgba(0, 0, 0, 0.05)',
    '0px 7px 24px rgba(0, 0, 0, 0.05)',
    '0px 8px 28px rgba(0, 0, 0, 0.05)',
    '0px 9px 32px rgba(0, 0, 0, 0.05)',
    '0px 10px 36px rgba(0, 0, 0, 0.05)',
    '0px 11px 40px rgba(0, 0, 0, 0.05)',
    '0px 12px 44px rgba(0, 0, 0, 0.05)',
    '0px 13px 48px rgba(0, 0, 0, 0.05)',
    '0px 14px 52px rgba(0, 0, 0, 0.05)',
    '0px 15px 56px rgba(0, 0, 0, 0.05)',
    '0px 16px 60px rgba(0, 0, 0, 0.05)',
    '0px 17px 64px rgba(0, 0, 0, 0.05)',
    '0px 18px 68px rgba(0, 0, 0, 0.05)',
    '0px 19px 72px rgba(0, 0, 0, 0.05)',
    '0px 20px 76px rgba(0, 0, 0, 0.05)',
    '0px 21px 80px rgba(0, 0, 0, 0.05)',
    '0px 22px 84px rgba(0, 0, 0, 0.05)',
    '0px 23px 88px rgba(0, 0, 0, 0.05)',
    '0px 24px 92px rgba(0, 0, 0, 0.05)',
    '0px 25px 96px rgba(0, 0, 0, 0.05)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 8,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.12)',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
  },
});

export default theme;