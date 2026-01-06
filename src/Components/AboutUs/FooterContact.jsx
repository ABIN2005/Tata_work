// src/components/AboutUs/FooterContact.jsx
import { Box, Typography, Stack, Link, Container, Divider } from '@mui/material';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import { Code as CodeIcon, Business as BusinessIcon } from '@mui/icons-material';

export default function FooterContact() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          px: 2,
          background: 'linear-gradient(135deg, #004C97 0%, #0066CC 100%)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 76, 151, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
          },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <BusinessIcon sx={{ fontSize: 40, color: 'white', opacity: 0.9 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Driven by Innovation, Rooted in Collaboration
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 3,
                fontSize: { xs: '0.875rem', md: '1rem' },
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Building the future of industrial monitoring with cutting-edge technology and passionate teamwork.
            </Typography>
            
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', mb: 3, maxWidth: 200, mx: 'auto' }} />
            
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '0.75rem', md: '0.875rem' },
              }}
            >
              © {new Date().getFullYear()} TATA STEEL LTD. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Motion.div>
  );
}
