import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Avatar, IconButton, Divider, Tooltip, useTheme,
  useMediaQuery, AppBar, Toolbar, Badge, Paper
} from '@mui/material';
import authService from '../../services/authService';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import FlightIcon from '@mui/icons-material/Flight';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SIDEBAR_WIDTH = 256;

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: <DashboardIcon className="text-[18px]" /> },
  { label: 'Users', path: '/admin/users', icon: <PeopleIcon className="text-[18px]" /> },
  { label: 'Bookings', path: '/admin/bookings', icon: <BookOnlineIcon className="text-[18px]" /> },
  { label: 'Flights', path: '/admin/flights', icon: <FlightIcon className="text-[18px]" /> },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = authService.getCurrentUser();

  const handleLogout = () => { authService.logout(); navigate('/login'); };
  const isActive = (path) => path === '/admin'
    ? location.pathname === '/admin'
    : location.pathname.startsWith(path);

  const SidebarContent = () => (
    <Box className="h-full flex flex-col bg-white border-r border-slate-200 relative overflow-hidden">
      {/* Brand */}
      <Box className="p-6 pb-6 mt-1">
        <Box className="flex items-center gap-3">
          <Box className="p-1.5 rounded bg-blue-600 flex">
            <FlightTakeoffIcon className="text-white text-[18px]" />
          </Box>
          <Box>
            <Typography className="text-slate-900 font-bold text-base leading-none tracking-tight">AeroHUB</Typography>
            <Typography className="text-slate-400 font-medium text-[9px] tracking-widest uppercase mt-1">Admin</Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav Label */}
      <Box className="px-7 pt-6 pb-2">
        <Typography className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
          Menu
        </Typography>
      </Box>

      {/* Nav Items */}
      <List className="flex-1 px-4 mt-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => isMobile && setSidebarOpen(false)}
              className={`rounded-lg mb-1 py-2 px-4 transition-colors duration-150
                ${active 
                  ? 'bg-blue-50' 
                  : 'hover:bg-slate-50'
                }`}
            >
              <ListItemIcon className={`min-w-0 mr-3.5 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                {React.cloneElement(item.icon, { className: 'transition-colors' })}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  className: `text-[13.5px] ${active ? 'text-blue-600 font-semibold' : 'text-slate-600 font-medium'}`
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Profile & Footer */}
      <Box className="p-4 border-t border-slate-100 bg-slate-50/30">
        <Paper elevation={0} className="p-3 mb-4 flex items-center gap-3 bg-white border border-slate-100 rounded-xl">
          <Avatar className="w-8 h-8 bg-slate-100 text-slate-600 font-bold text-[10px]">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </Avatar>
          <Box className="flex-1 overflow-hidden">
            <Typography className="text-slate-900 font-bold text-[12px] leading-tight truncate">
              {user?.name || 'Admin'}
            </Typography>
            <Typography className="text-slate-400 text-[10px] font-medium">System Manager</Typography>
          </Box>
        </Paper>

        <Box className="flex flex-col gap-1">
          <ListItemButton
            component={Link} to="/"
            className="rounded-lg py-1.5 px-3 hover:bg-slate-100 text-slate-600"
          >
            <ListItemIcon className="min-w-0 mr-3">
              <OpenInNewIcon className="text-[16px] text-slate-400" />
            </ListItemIcon>
            <ListItemText primary="Public View" primaryTypographyProps={{ className: "text-slate-500 text-[12.5px] font-medium" }} />
          </ListItemButton>
          <ListItemButton
            onClick={handleLogout}
            className="rounded-lg py-1.5 px-3 hover:bg-red-50 text-red-600"
          >
            <ListItemIcon className="min-w-0 mr-3">
              <LogoutIcon className="text-[16px] text-red-400/70" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" primaryTypographyProps={{ className: "text-red-500/80 text-[12.5px] font-medium" }} />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className="flex h-screen bg-slate-50/50 overflow-hidden">
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        className="block md:hidden"
        PaperProps={{
          className: "w-[256px] border-none"
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Desktop Sidebar */}
      <Box component="nav" className="w-[256px] flex-shrink-0 hidden md:flex">
        <SidebarContent />
      </Box>

      {/* Main Container */}
      <Box className="flex-1 flex flex-col overflow-hidden">
        {/* Simple Topbar */}
        <AppBar
          position="static" elevation={0}
          className="bg-white/80 backdrop-blur-sm border-b border-slate-200"
        >
          <Toolbar className="px-6 md:px-10 justify-between min-h-[64px]">
            <Box className="flex items-center gap-4">
              <IconButton
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-slate-500 hover:bg-slate-100"
              >
                <MenuIcon />
              </IconButton>
              <Typography className="hidden md:block text-slate-900 font-bold text-[17px] tracking-tight">
                {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1) || 'Dashboard'}
              </Typography>
            </Box>

            <Box className="flex items-center gap-4">
              <Tooltip title="Notifications">
                <IconButton className="text-slate-400 hover:bg-slate-100 p-2">
                  <Badge variant="dot" color="primary">
                    <NotificationsIcon className="text-[20px]" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem className="border-slate-100 h-6 my-auto" />
              <Avatar className="w-8 h-8 bg-blue-600 text-white font-bold text-[11px] cursor-pointer">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          className="flex-1 overflow-y-auto"
        >
          <Box className="p-8 md:p-12 max-w-7xl mx-auto">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;