import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Card, CardContent } from '@mui/material';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import PeopleIcon from '@mui/icons-material/People';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import FlightIcon from '@mui/icons-material/Flight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BoltIcon from '@mui/icons-material/Bolt';

const CARD_CLASSES = "bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200";

const StatCard = ({ icon, label, value }) => (
  <Card className={CARD_CLASSES} elevation={0}>
    <CardContent className="p-6">
      <Box className="flex items-center gap-4">
        <Box className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
          {React.cloneElement(icon, { sx: { fontSize: 20 } })}
        </Box>
        <Box>
          <Typography variant="caption" className="text-slate-400 font-bold uppercase tracking-wider block">
            {label}
          </Typography>
          <Typography variant="h6" className="text-slate-900 font-bold tracking-tight">
            {value ?? '—'}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const BarChart = () => {
  const bars = [
    { h: 42, day: 'Mon' }, { h: 68, day: 'Tue' }, { h: 47, day: 'Wed' },
    { h: 88, day: 'Thu' }, { h: 57, day: 'Fri' }, { h: 78, day: 'Sat' }, { h: 93, day: 'Sun' },
  ];
  return (
    <Paper className={`${CARD_CLASSES} p-8 flex-[2] border-slate-100`} elevation={0}>
      <Box className="flex justify-between items-center mb-10">
        <Typography className="text-slate-900 font-bold text-base">Activity Overview</Typography>
        <Box className="flex gap-2">
          {['7D', '1M', '1Y'].map((t, i) => (
            <Button
              key={t} size="small"
              className={`min-w-0 w-8 h-8 font-bold text-[10px] rounded-lg normal-case
                ${i === 0 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t}
            </Button>
          ))}
        </Box>
      </Box>
      <Box className="h-[180px] flex items-end gap-3 px-2">
        {bars.map(({ h, day }, i) => (
          <Box key={i} className="flex-1 flex flex-col items-center gap-3">
            <Box
              className="w-full rounded bg-slate-100/80 hover:bg-blue-200 transition-colors"
              style={{ height: `${h}%` }}
            />
            <Typography className="text-slate-400 font-medium text-[10px]">
              {day}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const QuickActions = () => {
  const actions = [
    { label: 'Add New Flight', icon: <AddIcon /> },
    { label: 'Export Report', icon: <TrendingUpIcon /> },
    { label: 'System Check', icon: <BoltIcon /> },
  ];
  return (
    <Paper className={`${CARD_CLASSES} p-8 flex-1 border-slate-100`} elevation={0}>
      <Typography className="text-slate-900 font-bold text-base mb-6">Operations</Typography>
      <Box className="flex flex-col gap-2.5">
        {actions.map((a, i) => (
          <Button
            key={i}
            className="justify-start gap-3.5 p-3.5 rounded-lg bg-slate-50/50 text-slate-600 normal-case font-medium hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <Box className="text-slate-400">{React.cloneElement(a.icon, { sx: { fontSize: 18 } })}</Box>
            <Typography className="text-[13px]">{a.label}</Typography>
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardStats().then(setData).finally(() => setLoading(false));
  }, []);

  const fmt = (n) => new Intl.NumberFormat('en-IN').format(n || 0);

  const stats = [
    { icon: <PeopleIcon />, label: 'Users', value: loading ? '…' : fmt(data?.stats?.totalUsers) },
    { icon: <BookOnlineIcon />, label: 'Bookings', value: loading ? '…' : fmt(data?.stats?.totalBookings) },
    { icon: <FlightIcon />, label: 'Flights', value: loading ? '…' : fmt(data?.stats?.totalFlights) },
    { icon: <AttachMoneyIcon />, label: 'Revenue', value: loading ? '…' : `₹${fmt(data?.stats?.totalRevenue)}` },
  ];

  return (
    <AdminLayout>
      <Box className="flex items-center justify-between mb-10">
        <Box>
          <Typography variant="h5" className="text-slate-900 font-bold tracking-tight">Overview</Typography>
          <Typography className="text-slate-400 text-[13px] font-medium mt-1">Platform metrics at a glance.</Typography>
        </Box>
        <Button
          variant="contained"
          className="rounded-lg px-6 py-2 bg-blue-600 hover:bg-blue-700 font-bold normal-case text-[13px] shadow-none"
        >
          New Campaign
        </Button>
      </Box>

      <Grid container spacing={3} className="mb-8">
        {stats.map((s, idx) => (
          <Grid key={idx} item xs={12} sm={6} lg={3}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>

      <Box className="flex flex-col lg:flex-row gap-8 mt-4">
        <BarChart />
        <QuickActions />
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
