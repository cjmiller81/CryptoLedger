import MainLayout from '@/components/layout/MainLayout';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
    </MainLayout>
  );
}