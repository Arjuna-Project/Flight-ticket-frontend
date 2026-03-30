import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Select, MenuItem,
  CircularProgress, IconButton, Tooltip
} from '@mui/material';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import FlightIcon from '@mui/icons-material/Flight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CARD_CLASSES = "bg-white rounded-xl border border-slate-200 overflow-hidden";
const TH_CLASSES = "text-slate-400 font-bold text-[10px] tracking-widest uppercase border-b border-slate-100 bg-slate-50/50 py-4 px-7";
const TD_CLASSES = "text-slate-600 border-b border-slate-50 py-5 px-7 transition-colors";

const StatusBadge = ({ status }) => {
  const styles = {
    Scheduled: 'bg-blue-50 text-blue-600 border-blue-100',
    Departed: 'bg-amber-50 text-amber-600 border-amber-100',
    Arrived: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <div className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold tracking-tight uppercase border ${styles[status] || styles.Scheduled}`}>
      {status}
    </div>
  );
};

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAllFlights().then(setFlights).finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (id, status) => {
    adminService.updateFlightStatus(id, status).then(() =>
      setFlights(prev => prev.map(f => f._id === id ? { ...f, status } : f))
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this entry?')) return;
    adminService.deleteFlightInstance(id).then(() =>
      setFlights(prev => prev.filter(f => f._id !== id))
    );
  };

  return (
    <AdminLayout>
      <Box className="mb-10 flex items-center justify-between">
        <Box>
          <Typography variant="h5" className="text-slate-900 font-bold tracking-tight">Flights</Typography>
          <Typography className="text-slate-400 text-[13px] font-medium mt-1">Operational flight status and data.</Typography>
        </Box>
        <Box className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-blue-100 pb-1">
          {flights.length} Live
        </Box>
      </Box>

      <Paper className={CARD_CLASSES} elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['Flight', 'Route', 'Departure', 'Economics', 'Status', 'Actions'].map(h => (
                  <TableCell key={h} className={TH_CLASSES}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="border-none py-28 text-center text-slate-300">
                    <CircularProgress size={24} color="inherit" thickness={4} />
                  </TableCell>
                </TableRow>
              ) : flights.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="border-none py-28 text-center text-slate-400 font-medium text-sm">
                    No flight data
                  </TableCell>
                </TableRow>
              ) : flights.map((f) => (
                <TableRow key={f._id} className="hover:bg-slate-50/30">
                  <TableCell className={TD_CLASSES}>
                    <Box className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 text-blue-500">
                        <FlightIcon className="text-[16px]" />
                      </div>
                      <Typography className="text-slate-900 font-semibold text-[13.5px]">{f.flight?.flightNumber}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Typography className="text-[13px] font-bold text-slate-700">
                      {f.flight?.departureAirport?.code} → {f.flight?.arrivalAirport?.code}
                    </Typography>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Typography className="text-[12.5px] font-semibold text-slate-600">
                      {new Date(f.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Typography className="text-slate-400 text-[10px] font-medium">
                      {new Date(f.departureTime).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Typography className="text-[13.5px] font-bold text-slate-900">₹{f.price?.toLocaleString()}</Typography>
                    <Typography className="text-emerald-500 text-[10px] font-black">{f.availableSeats} LEFT</Typography>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Select
                      value={f.status}
                      onChange={e => handleStatusChange(f._id, e.target.value)}
                      size="small"
                      variant="standard"
                      disableUnderline
                      IconComponent={ExpandMoreIcon}
                      className="[&_.MuiSelect-select]:py-1 [&_.MuiSelect-select]:pr-[20px] [&_.MuiSelect-select]:min-w-[90px] [&_.MuiSvgIcon-root]:text-[14px] [&_.MuiSvgIcon-root]:right-0"
                      renderValue={(v) => <StatusBadge status={v} />}
                    >
                      {['Scheduled', 'Departed', 'Arrived', 'Cancelled'].map(s => (
                        <MenuItem key={s} value={s} className="font-bold text-xs">{s}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(f._id)}
                        className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <DeleteOutlineIcon className="text-[18px]" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </AdminLayout>
  );
};

export default AdminFlights;
