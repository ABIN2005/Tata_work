import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Card, 
  CardContent,
  Chip,
  Container,
  Divider,
  Stack
} from '@mui/material';
import TeamGrid from '../Components/AboutUs/TeamGrid';
import FooterContact from '../Components/AboutUs/FooterContact';
import ParticleBackground from '../Components/AboutUs/ParticleBackground';
import { motion as Motion } from 'framer-motion';
import {
  Code as CodeIcon,
  Palette as PaletteIcon,
  Psychology as PsychologyIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  Chat as ChatIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const techStack = [
  { name: 'React.js', icon: <CodeIcon />, color: '#61DAFB' },
  { name: 'Material-UI', icon: <PaletteIcon />, color: '#007FFF' },
  { name: 'OpenAI API', icon: <PsychologyIcon />, color: '#10A37F' },
  { name: 'MongoDB', icon: <StorageIcon />, color: '#47A248' },
  { name: 'Vite', icon: <SpeedIcon />, color: '#646CFF' },
  { name: 'FastAPI', icon: <CodeIcon />, color: '#009688' },
];

const features = [
  {
    title: 'AI-Powered Insights',
    description: 'Leverage advanced AI to detect anomalies and predict potential issues before they occur.',
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    color: '#10A37F',
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Monitor equipment status and performance metrics in real-time with live data updates.',
    icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
    color: '#1976D2',
  },
  {
    title: 'Interactive Chatbot',
    description: 'Get instant answers and assistance through our intelligent AI-powered chatbot.',
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
    color: '#9C27B0',
  },
  {
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with robust authentication and data protection.',
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    color: '#F44336',
  },
];

const timeline = [
  { date: '13 May 2025', event: 'Team Formation', milestone: true },
  { date: '27 May 2025', event: 'Requirements Analysis', milestone: false },
  { date: '1 June 2025', event: 'UI/UX Design Phase', milestone: false },
  { date: '15 June 2025', event: 'Backend & AI Integration', milestone: true },
  { date: '1 July 2025', event: 'Testing & Documentation', milestone: false },
  { date: '15 July 2025', event: 'Production Deployment', milestone: true },
];

export default function AboutUs() {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: '#f5f7fa' }}>
      {/* ✨ Background Particles */}
      <ParticleBackground />

      {/* ✨ Main Content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 6 } }}>
        
        {/* Hero Section */}
        <Motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 }, px: { xs: 2, sm: 0 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #004C97 0%, #0066CC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              }}
            >
              About DAMSBF
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                maxWidth: '800px',
                mx: 'auto',
                mb: 3,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                lineHeight: 1.8,
              }}
            >
              Digital Asset Monitoring System for Blast Furnace
            </Typography>
            <Divider sx={{ maxWidth: 200, mx: 'auto', borderWidth: 2, borderColor: '#004C97' }} />
          </Box>
        </Motion.div>

        {/* Main Description Card */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card
            elevation={8}
            sx={{
              mb: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0, 76, 151, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 76, 151, 0.15)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#004C97',
                  mb: 3,
                  textAlign: 'center',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#444',
                  textAlign: 'center',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.9,
                  maxWidth: '900px',
                  mx: 'auto',
                }}
              >
                We are a passionate team of developers who created <strong>DAMSBF</strong> — a Digital Asset Management
                System designed specifically for <strong>Tata Steel Kalinganagar</strong>. Our platform helps monitor anomalies 
                and resolve issues efficiently within the steel plant. With AI integration, a user-friendly UI/UX, insightful
                data visualizations, and an interactive chatbot, DAMSBF brings a smart, streamlined
                approach to industrial problem-solving.
              </Typography>
            </CardContent>
          </Card>
        </Motion.div>

        {/* Features Grid */}
        <Box sx={{ mb: { xs: 4, md: 6 }, px: { xs: 1, sm: 0 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#004C97',
              mb: 4,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Key Features
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    elevation={4}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      border: `2px solid ${feature.color}20`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 24px ${feature.color}40`,
                        borderColor: feature.color,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box
                        sx={{
                          color: feature.color,
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#004C97',
                          mb: 1.5,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.7,
                          fontSize: { xs: '0.9rem', md: '1rem' },
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tech Stack & Timeline Section */}
        <Grid container spacing={{ xs: 3, sm: 4 }} sx={{ mb: { xs: 4, md: 6 }, px: { xs: 1, sm: 0 } }}>
          {/* Tech Stack Card */}
          <Grid item xs={12} md={6}>
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card
                elevation={6}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)',
                  border: '2px solid rgba(156, 39, 176, 0.2)',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CodeIcon sx={{ fontSize: 32, color: '#9C27B0', mr: 1.5 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: '#004C97',
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                      }}
                    >
                      Tech Stack
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {techStack.map((tech, index) => (
                      <Chip
                        key={index}
                        icon={<Box sx={{ color: tech.color }}>{tech.icon}</Box>}
                        label={tech.name}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: `1px solid ${tech.color}40`,
                          color: '#004C97',
                          fontWeight: 600,
                          fontSize: { xs: '0.85rem', md: '0.9rem' },
                          '&:hover': {
                            backgroundColor: tech.color,
                            color: 'white',
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Motion.div>
          </Grid>

          {/* Timeline Card */}
          <Grid item xs={12} md={6}>
            <Motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card
                elevation={6}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #e1f5fe 100%)',
                  border: '2px solid rgba(25, 118, 210, 0.2)',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TrendingUpIcon sx={{ fontSize: 32, color: '#1976D2', mr: 1.5 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: '#004C97',
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                      }}
                    >
                      Project Timeline
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'relative', pl: 3 }}>
                    {timeline.map((item, index) => (
                      <Motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            pb: index < timeline.length - 1 ? 3 : 0,
                            '&::before': index < timeline.length - 1
                              ? {
                                  content: '""',
                                  position: 'absolute',
                                  left: -15,
                                  top: 20,
                                  width: 2,
                                  height: '100%',
                                  backgroundColor: item.milestone ? '#1976D2' : '#90CAF9',
                                }
                              : {},
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              left: -20,
                              top: 4,
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: item.milestone ? '#1976D2' : '#90CAF9',
                              border: '2px solid white',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            }}
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: item.milestone ? 700 : 600,
                              color: item.milestone ? '#1976D2' : '#666',
                              mb: 0.5,
                              fontSize: { xs: '0.85rem', md: '0.9rem' },
                            }}
                          >
                            {item.date}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#444',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                            }}
                          >
                            {item.event}
                          </Typography>
                        </Box>
                      </Motion.div>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Motion.div>
          </Grid>
        </Grid>

        {/* Team Section */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#004C97',
              mb: 4,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Meet Our Team
          </Typography>
          <TeamGrid />
        </Box>

        {/* Footer */}
        <Box>
          <FooterContact />
        </Box>
      </Container>
    </Box>
  );
}
