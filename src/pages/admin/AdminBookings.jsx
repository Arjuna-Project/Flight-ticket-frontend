import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Avatar, CircularProgress
} from '@mui/material';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const CARD_CLASSES = "bg-white rounded-xl border border-slate-200 overflow-hidden";
const TH_CLASSES = "text-slate-400 font-bold text-[10px] tracking-widest uppercase border-b border-slate-100 bg-slate-50/50 py-4 px-7";
const TD_CLASSES = "text-slate-600 border-b border-slate-50 py-5 px-7 transition-colors";

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <div className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold tracking-tight uppercase border ${styles[status] || styles.Pending}`}>
      {status}
    </div>
  );
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAllBookings().then(setBookings).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <Box className="mb-10">
        <Typography variant="h5" className="text-slate-900 font-bold tracking-tight">Bookings</Typography>
        <Typography className="text-slate-400 text-[13px] font-medium mt-1">Registry of all ticket reservations.</Typography>
      </Box>

      <Paper className={CARD_CLASSES} elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['Ref', 'Customer', 'Flight', 'Amount', 'Status'].map(h => (
                  <TableCell key={h} className={TH_CLASSES}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="border-none py-28 text-center text-slate-300">
                    <CircularProgress size={24} color="inherit" thickness={4} />
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="border-none py-28 text-center text-slate-400 font-medium text-sm">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : bookings.map((b) => (
                <TableRow key={b._id} className="hover:bg-slate-50/30">
                  <TableCell className={TD_CLASSES}>
                    <Box className="flex items-center gap-2.5">
                      <ConfirmationNumberIcon className="text-[16px] text-blue-500" />
                      <Typography className="text-blue-600 font-bold text-[13px] tracking-tight">
                        {b.bookingReference}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Box className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
                        {b.user?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography className="text-slate-900 font-semibold text-[13.5px] leading-tight">{b.user?.name}</Typography>
                        <Typography className="text-slate-400 text-[10px] font-medium">{b.user?.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Typography className="text-[13px] font-bold text-slate-700">
                      {b.flightInstance?.flight?.departureAirport?.code} → {b.flightInstance?.flight?.arrivalAirport?.code}
                    </Typography>
                    <Typography className="text-slate-400 text-[10px] font-medium tracking-wider uppercase">
                      {b.flightInstance?.flight?.flightNumber}
                    </Typography>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Typography className="text-[14px] font-bold text-slate-900">₹{b.totalPrice?.toLocaleString()}</Typography>
                    <Typography className="text-slate-400 text-[9px] font-bold uppercase">Ticket Price</Typography>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <StatusBadge status={b.status} />
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

export default AdminBookings;
