'use client';
import * as React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: 'light' as PaletteMode,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
            lighter: mode === 'dark' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.08)',
          },
          background: {
            default: mode === 'light' ? '#f8f9fa' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          text: {
            primary: mode === 'light' ? '#1e1e1e' : '#ffffff',
            secondary: mode === 'light' ? '#666666' : '#a0a0a0',
          },
          divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === 'light' ? '#f8f9fa' : '#121212',
                color: mode === 'light' ? '#1e1e1e' : '#ffffff',
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === 'light' ? '#1e1e1e' : '#ffffff',
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                '&.Mui-selected': {
                  backgroundColor: mode === 'dark' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.08)',
                  color: '#2196f3',
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(33, 150, 243, 0.2)' : 'rgba(33, 150, 243, 0.12)',
                  },
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return React.useContext(ColorModeContext);
}