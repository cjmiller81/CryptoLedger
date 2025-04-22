'use client';
import { useState, useRef, useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Typography, 
  Button, 
  Box,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  DataGrid, 
  GridColDef,
  GridFilterModel
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Papa from 'papaparse';

interface LedgerEntry {
  id: number;
  txid: string;
  refid: string;
  time: string;
  type: string;
  subtype: string;
  aclass: string;
  asset: string;
  amount: string;
  fee: string;
  amountusd: string;
}

interface AggregatedData {
  asset: string;
  amount: number;
  amountUSD: number;
  fee: number;
}

export default function KrakenPage() {
  const theme = useTheme();
  const [ledgerData, setLedgerData] = useState<LedgerEntry[]>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const columns: GridColDef[] = [
    { 
      field: 'time', 
      headerName: 'Time', 
      flex: 1,
      filterable: true
    },
    { 
      field: 'type', 
      headerName: 'Type', 
      flex: 1,
      filterable: true
    },
    { 
      field: 'asset', 
      headerName: 'Asset', 
      flex: 1,
      filterable: true
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      flex: 1,
      filterable: true,
      align: 'right',
      headerAlign: 'right'
    },
    { 
      field: 'amountusd', 
      headerName: 'Amount USD', 
      flex: 1,
      filterable: true,
      align: 'right',
      headerAlign: 'right'
    },
    { 
      field: 'fee', 
      headerName: 'Fee', 
      flex: 1,
      filterable: true,
      align: 'right',
      headerAlign: 'right'
    }
  ];

  const aggregateData = (data: LedgerEntry[], type: string): AggregatedData[] => {
    const aggregated = data.reduce((acc, entry) => {
      if (entry.type === type) {
        const asset = entry.asset;
        if (!acc[asset]) {
          acc[asset] = {
            asset,
            amount: 0,
            amountUSD: 0,
            fee: 0
          };
        }
        acc[asset].amount += parseFloat(entry.amount) || 0;
        acc[asset].amountUSD += parseFloat(entry.amountusd) || 0;
        acc[asset].fee += parseFloat(entry.fee) || 0;
      }
      return acc;
    }, {} as Record<string, AggregatedData>);

    return Object.values(aggregated);
  };

  const trades = useMemo(() => aggregateData(ledgerData, 'trade'), [ledgerData]);
  const withdrawals = useMemo(() => aggregateData(ledgerData, 'withdrawal'), [ledgerData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as Omit<LedgerEntry, 'id'>[];
          const cleanData = data
            .filter(entry => entry.txid && entry.time && entry.type)
            .map((entry, index) => ({
              ...entry,
              id: index
            }));
          setLedgerData(cleanData);
        },
        header: true,
        skipEmptyLines: true
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const AggregatedTable = ({ data, title }: { data: AggregatedData[], title: string }) => (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Amount in USD</TableCell>
              <TableCell align="right">Fee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.asset}>
                <TableCell>{row.asset}</TableCell>
                <TableCell align="right">{row.amount.toFixed(8)}</TableCell>
                <TableCell align="right">{row.amountUSD.toFixed(2)}</TableCell>
                <TableCell align="right">{row.fee.toFixed(8)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <MainLayout>
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        height: '100%'
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          fontWeight="bold"
          sx={{ 
            mb: 3, 
            alignSelf: 'flex-start', 
            textAlign: 'left', 
            width: '100%' 
          }}
        >
          Kraken Dashboard
        </Typography>
        
        <Box sx={{ mb: 4, alignSelf: 'flex-start' }}>
          <Input
            type="file"
            inputRef={fileInputRef}
            onChange={handleFileUpload}
            sx={{ display: 'none' }}
            inputProps={{ accept: '.csv' }}
          />
          <Button
            variant="outlined"
            onClick={handleImportClick}
            sx={{
              borderColor: theme.palette.mode === 'light' ? 'black' : 'white',
              color: theme.palette.mode === 'light' ? 'black' : 'white',
              '&:hover': {
                borderColor: theme.palette.mode === 'light' ? 'black' : 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            Import Kraken Ledger
          </Button>
        </Box>

        {ledgerData.length > 0 && (
          <>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={ledgerData}
                columns={columns}
                filterModel={filterModel}
                onFilterModelChange={setFilterModel}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                  },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                filterMode="client"
              />
            </Box>

            <AggregatedTable data={trades} title="Trades" />
            <AggregatedTable data={withdrawals} title="Withdrawals" />
          </>
        )}
      </Box>
    </MainLayout>
  );
}