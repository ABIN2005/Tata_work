// src/components/Layout.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Box, CssBaseline, styled, useMediaQuery, useTheme, Drawer as MuiDrawer } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Outlet, useLocation } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import SectionSidebar from "./SectionSidebar";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile" })(
  ({ theme, open, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: "64px",
    marginLeft: isMobile ? 0 : (open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      marginLeft: 0,
    },
    ...(open && !isMobile && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: "fixed",
  zIndex: theme.zIndex.drawer + 1,
  ...(open && !isMobile && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(isMobile && {
    width: '100%',
    marginLeft: 0,
  }),
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
  width: isMobile ? drawerWidth : (open ? drawerWidth : collapsedDrawerWidth),
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(isMobile && {
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      marginTop: '64px',
      height: 'calc(100vh - 64px)',
    },
  }),
  ...(!isMobile && {
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : collapsedDrawerWidth,
      marginTop: '64px',
      height: 'calc(100vh - 64px)',
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
    },
  }),
}));

function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile); // Default to open on desktop, closed on mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const isSectionRoute = [
    "/blast-furnace/bf1",
    "/blast-furnace/bf2",
    "/caster/c1",
    "/caster/c2",
    "/caster/c3",
    "/bof/bof1",
    "/bof/bof2",
    "/bof/bof3",
  ].some((path) => location.pathname.startsWith(path));

  const drawerContent = isSectionRoute ? (
    <SectionSidebar collapsed={!open && !isMobile} />
  ) : (
    <MainSidebar collapsed={!open && !isMobile} />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          isMobile={isMobile}
          sx={{ backgroundColor: "#004C97", zIndex: theme.zIndex.drawer + 1 }}
        >
          <Navbar open={open} handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
        </AppBar>
        
        {/* Desktop Permanent Drawer */}
        {!isMobile && (
          <StyledDrawer
            variant="permanent"
            open={open}
            isMobile={false}
          >
            {drawerContent}
          </StyledDrawer>
        )}

        {/* Mobile Temporary Drawer */}
        {isMobile && (
          <StyledDrawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerClose}
            isMobile={true}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {drawerContent}
          </StyledDrawer>
        )}

        <Main open={open} isMobile={isMobile}>
          <Box sx={{ 
            width: '100%',
            height: '100%',
            overflow: 'auto',
            [theme.breakpoints.down('sm')]: {
              padding: theme.spacing(1),
            },
          }}>
            <Outlet />
          </Box>
        </Main>
      </Box>
    </LocalizationProvider>
  );
}

export default Layout;
