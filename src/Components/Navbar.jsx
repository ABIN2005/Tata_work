import React, { useState, useEffect, useRef } from 'react';
import {

  Typography,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  Avatar,
  IconButton,
  Toolbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes'; // dynamic routes import

// Styled components
const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center', 
  gap: theme.spacing(1),
  position: 'relative',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const SuggestionBox = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1000,
  marginTop: theme.spacing(1),
  width: '100%',
  backgroundColor: theme.palette.background.paper,
}));

// Component
function Navbar({ handleDrawerToggle, isMobile = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [myVisits, setMyVisits] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const hasVisitedRef = useRef(false);
  const navigate = useNavigate();
  const userName = 'Lisa Das';

  // Dynamically derive valid pages from routes
  const pages = routes
    .filter(route =>
      route.path !== '*' &&
      !['/login', '/signout', '/reset', '/signedout'].includes(route.path)
    )
    .map(route => {
      const path = route.path;
      const name =
        path === '/'
          ? 'Home'
          : path
              .replace('/', '')
              .replace(/-/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());
      return { name, path };
    });

  // Count visit stats once per session
  useEffect(() => {
    if (hasVisitedRef.current) return;
    hasVisitedRef.current = true;

    const visits = parseInt(localStorage.getItem('myVisits')) || 0;
    const total = parseInt(localStorage.getItem('totalVisits')) || 0;

    localStorage.setItem('myVisits', visits + 1);
    localStorage.setItem('totalVisits', total + 1);

    setMyVisits(visits + 1);
    setTotalVisits(total + 1);
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = pages.filter((page) =>
      page.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSelect = (path) => {
    setSearchQuery('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    navigate(path);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (filteredSuggestions.length > 0) {
        handleSelect(filteredSuggestions[0].path);
      } else {
        navigate('/notfound');
      }
    }

  };

  // const handleLogout = () => {
  //   alert('Logged out!');
  // };

  useEffect(() => {
    if (hasVisitedRef.current) return; // ✅ prevent multiple calls
    hasVisitedRef.current = true;

    const visits = parseInt(localStorage.getItem('myVisits')) || 0;
    const total = parseInt(localStorage.getItem('totalVisits')) || 0;

    localStorage.setItem('myVisits', visits + 1);
    localStorage.setItem('totalVisits', total + 1);

    setMyVisits(visits + 1);
    setTotalVisits(total + 1);
  }, []);

  return (
    <Toolbar 
      sx={{ 
        justifyContent: 'space-between',
        minHeight: { xs: '56px', sm: '64px' },
        px: { xs: 1, sm: 2 },
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      {/* Left: Menu icon + Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', flex: { xs: '1 1 auto', md: '0 0 auto' } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: { xs: 1, sm: 2 },
            display: { xs: 'flex', md: 'flex' }
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
            display: { xs: 'none', sm: 'block' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: { xs: '150px', sm: '300px', md: 'none' },
          }}
        >
          Intelligent Condition Monitoring System
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: '0.875rem',
            display: { xs: 'block', sm: 'none' },
          }}
        >
          DAMSBF
        </Typography>
      </Box>

      {/* Right: Avatar, stats, search */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, sm: 1, md: 2 },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'flex-end', md: 'flex-start' },
          width: { xs: '100%', md: 'auto' },
          mt: { xs: 1, md: 0 },
        }}
      >
        {/* User Info - Hidden on very small screens */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ 
            bgcolor: '#fff', 
            color: '#004C97', 
            fontSize: { xs: '12px', sm: '14px' }, 
            width: { xs: 28, sm: 32 }, 
            height: { xs: 28, sm: 32 } 
          }}>
            {userName?.[0] || 'U'}
          </Avatar>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500,
              display: { xs: 'none', md: 'block' },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            {userName}
          </Typography>
        </Box>

        {/* Stats - Hidden on mobile */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
            My Visits: <strong>{myVisits}</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
            Total: <strong>{totalVisits}</strong>
          </Typography>
        </Box>

        {/* Search box */}
        <SearchContainer sx={{ 
          width: { xs: '100%', sm: 'auto' },
          minWidth: { xs: '100%', sm: '120px', md: '160px' },
          maxWidth: { xs: '100%', sm: '200px', md: '300px' },
          order: { xs: -1, md: 0 },
        }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              inputProps={{ 'aria-label': 'search' }}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <SuggestionBox sx={{
                width: { xs: 'calc(100vw - 32px)', sm: '100%' },
                maxWidth: { xs: 'none', sm: '300px' },
                left: { xs: 0, sm: 'auto' },
                right: { xs: 0, sm: 'auto' },
              }}>
                <List dense>
                  {filteredSuggestions.slice(0, 5).map((suggestion) => (
                    <ListItem disablePadding key={suggestion.path}>
                      <ListItemButton onClick={() => handleSelect(suggestion.path)}>
                        <ListItemText 
                          primary={suggestion.name}
                          primaryTypographyProps={{
                            sx: { fontSize: { xs: '0.875rem', sm: '1rem' } }
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </SuggestionBox>
            )}
          </Search>
        </SearchContainer>
      </Box>
    </Toolbar>
  );
}

export default Navbar;

