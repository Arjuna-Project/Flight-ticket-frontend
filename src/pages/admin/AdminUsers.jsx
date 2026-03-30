import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Avatar, CircularProgress
} from '@mui/material';
import AdminLayout from '../../components/layout/AdminLayout';
import adminService from '../../services/adminService';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CARD_CLASSES = "bg-white rounded-xl border border-slate-200 overflow-hidden";
const TH_CLASSES = "text-slate-400 font-bold text-[10px] tracking-widest uppercase border-b border-slate-100 bg-slate-50/50 py-4 px-7";
const TD_CLASSES = "text-slate-600 border-b border-slate-50 py-4 px-7 transition-colors";

const RoleBadge = ({ role }) => {
  const isAdmin = role === 'admin';
  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase border
      ${isAdmin ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
      {role}
    </div>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAllUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <Box className="mb-10">
        <Typography variant="h5" className="text-slate-900 font-bold tracking-tight">Users</Typography>
        <Typography className="text-slate-400 text-[13px] font-medium mt-1">Manage user accounts and roles.</Typography>
      </Box>

      <Paper className={CARD_CLASSES} elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['User', 'Email', 'Role', 'Joined'].map(h => (
                  <TableCell key={h} className={TH_CLASSES}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="border-none py-28 text-center text-slate-300">
                    <CircularProgress size={24} color="inherit" thickness={4} />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="border-none py-28 text-center text-slate-400 font-medium text-sm">
                    No records found
                  </TableCell>
                </TableRow>
              ) : users.map((u) => (
                <TableRow key={u._id} className="hover:bg-slate-50/30">
                  <TableCell className={TD_CLASSES}>
                    <Box className="flex items-center gap-3.5">
                      <Avatar className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold">
                        {u.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography className="text-slate-900 font-semibold text-[13.5px]">{u.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Box className="flex items-center gap-2 text-slate-500">
                      <MailOutlineIcon className="text-[16px]" />
                      <Typography className="text-[13px] font-medium">{u.email}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <RoleBadge role={u.role} />
                  </TableCell>
                  <TableCell className={TD_CLASSES}>
                    <Box className="flex items-center gap-2 text-slate-400">
                      <CalendarTodayIcon className="text-[14px]" />
                      <Typography className="text-[12px] font-semibold">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : '—'}
                      </Typography>
                    </Box>
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

export default AdminUsers;
