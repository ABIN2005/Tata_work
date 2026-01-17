import React from "react";
import InfoCard from "../Components/InfoCard";
import UserTable from "../Components/UserTable";
import TrendChart from "../Components/TrendChart";
import AlertTable from "../Components/AlertTable";
import { Typography, Grid, Paper, Box } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        padding: { xs: 1.5, sm: 2, md: 3 },
        minHeight: "100vh",
        backgroundColor: "#0B1A2D", // dark blue background
        color: "#ffffff",
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* Welcome Header */}
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Info Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="Total Users" value="18" icon="users" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="Active Alerts" value="5" icon="alert" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="Total Assets" value="142" icon="box" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="Pending Maintenance" value="3" icon="calendar" />
        </Grid>
      </Grid>

      {/* Tables side-by-side with spacing */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
        {/* User Table */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ 
              p: { xs: 2, sm: 2.5, md: 3 }, 
              backgroundColor: "#152f4f", 
              color: "#ffffff",
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              User Management
            </Typography>
            <UserTable />
          </Paper>
        </Grid>

        {/* Alert Table */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              backgroundColor: "#152f4f",
              color: "#ffffff",
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              Latest Alerts
            </Typography>
            <AlertTable />
          </Paper>
        </Grid>
      </Grid>

      {/* Trend Chart */}
      <Paper
        elevation={3}
        sx={{ 
          p: { xs: 2, sm: 2.5, md: 3 }, 
          backgroundColor: "#152f4f", 
          color: "#ffffff",
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
          }}
        >
          System Trends
        </Typography>
        <TrendChart />
      </Paper>
    </Box>
  );
}
