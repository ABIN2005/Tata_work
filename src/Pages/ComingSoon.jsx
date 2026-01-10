import React from 'react'
import { Typography, Box, Container } from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';

function ComingSoon() {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ConstructionIcon 
          sx={{ 
            fontSize: { xs: 60, sm: 80, md: 100 },
            color: '#004C97',
            mb: 2,
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
            },
          }} 
        />
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#004C97',
            mb: 2,
          }}
        >
          COMING SOON
        </Typography>
        <Typography 
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.125rem' },
            color: '#666',
            maxWidth: '500px',
            mx: 'auto',
          }}
        >
          This page is currently under development. We're working hard to bring you amazing features!
        </Typography>
      </Box>
    </Container>
  )
}

export default ComingSoon
