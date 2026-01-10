import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/tata-steel.png";

const cardData = [
  { name: "Blast Furnace", subPages: ["BF1", "BF2"] },
  { name: "Caster", subPages: ["Caster 1", "Caster 2", "Caster 3"] },
  { name: "Steel Melting Shop", subPages: ["BOF 1", "BOF 2", "BOF 3"] },
];

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredCard, setHoveredCard] = useState(null);
  const [ripple, setRipple] = useState({});
  const cardRefs = useRef({});
  const navigate = useNavigate();

  const handleMouseEnter = (cardName) => setHoveredCard(cardName);
  const handleMouseLeave = () => setHoveredCard(null);

  const handleSubpageClick = (sub, cardName, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ [sub]: { x, y, show: true } });
    setTimeout(() => setRipple({}), 400);

    const section = cardName.toLowerCase().replace(/\s+/g, "-");
    const unit = sub.toLowerCase();
    navigate(`/${section}/${unit}`);
  };

  const baseShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.18)";
  const activeShadow =
    "0 16px 40px 0 rgba(253,160,133,0.35), 0 2px 8px 0 #f6d36566, 0 0 32px 0 #fda08555";

  const borderGradient = {
    "Blast Furnace": "linear-gradient(120deg, #ff9a9e, #fad0c4)",
    Caster: "linear-gradient(120deg, #a1c4fd, #c2e9fb)",
    "Steel Melting Shop": "linear-gradient(120deg, #d4fc79, #96e6a1)",
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "#f7f9fc",
      width: '100%',
      overflowX: 'hidden',
    }}>
      {/* Banner */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 200, sm: 300, md: 400, lg: 450 },
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 76, 151, 0.3)",
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            px: { xs: 1.5, sm: 2 },
            py: { xs: 0.75, sm: 1 },
            borderRadius: { xs: "8px", sm: "12px" },
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            color: "#ffffff",
            textShadow: "0 2px 4px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.1)",
            letterSpacing: { xs: 0.5, sm: 1, md: 1.5 },
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.5rem', lg: '3rem' },
            position: "relative",
            zIndex: 1,
            maxWidth: { xs: '90%', sm: '80%', md: '70%' },
          }}
        >
          TATA STEEL KALINGANAGAR
        </Typography>
      </Box>

      {/* Welcome */}
      <Box sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        textAlign: "center",
        width: '100%',
      }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            maxWidth: 900,
            mx: "auto",
            background: "#ffffffdd",
            backdropFilter: "blur(6px)",
            borderRadius: { xs: 2, sm: 3 },
            boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            }}
          >
            Welcome to DAMSBF TSK
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: { xs: 1, sm: 0 },
            }}
          >
            Hello <b>Abhishek Kumar</b>, welcome to Digital Asset Monitoring System (DAMSBF) TSK.
            Here you can check the condition of all major plants and areas of TSK.
          </Typography>
        </Paper>
      </Box>

      {/* Feature Cards */}
      <Box sx={{ 
        px: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 4, sm: 5, md: 6 },
        width: '100%',
      }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, sm: 3, md: 4 },
            background: "#ffffffaa",
            backdropFilter: "blur(6px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            overflow: "visible",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: { xs: 2, sm: 2.5, md: 3 },
              textAlign: "center",
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
              color: "#1a237e",
              textShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            Features
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3, md: 4, lg: 6 },
              flexWrap: "wrap",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            {[
              {
                title: "Application Utilization",
                desc: "Check who is using the DAMSBF Application on the regular basis",
                borderColor: "#a5d8ff",
              },
              {
                title: "Cost Saved",
                desc: "This page is used to calculate the total savings via this application.",
                borderColor: "#c3fbd8",
              },
              {
                title: "Data DM",
                desc: "Daily Monitoring of data at each level from IBA to Application UI.",
                borderColor: "#ffdac1",
              },
            ].map((item) => (
              <Paper
                key={item.title}
                elevation={1}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: { xs: 2, sm: 3 },
                  width: { xs: '100%', sm: 'calc(50% - 12px)', md: '280px' },
                  maxWidth: { xs: '100%', sm: 'none', md: '300px' },
                  border: `2.5px solid ${item.borderColor}`,
                  backgroundColor: "#fff",
                  transition: "0.3s",
                  "&:hover": {
                    transform: { xs: "none", sm: "scale(1.03)" },
                    boxShadow: `0 6px 24px ${item.borderColor}88`,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ 
                    color: "#1a237e", 
                    mb: 1,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                  }}
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                >
                  {item.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Plant Home Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 4, sm: 5, md: 6 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: { xs: 0.5, sm: 1 },
            color: "#1a237e",
            mb: { xs: 3, sm: 4 },
            textShadow: "0 2px 8px #fff8",
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textAlign: 'center',
          }}
        >
          Plant Home
        </Typography>

        <Grid 
          container 
          spacing={{ xs: 3, sm: 4, md: 6, lg: 8 }} 
          justifyContent="center" 
          sx={{ 
            maxWidth: 1200,
            width: '100%',
          }}
        >
          {cardData.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.name} sx={{ width: '100%', position: 'relative', zIndex: hoveredCard === card.name ? 1000 : 1 }}>
              <Box ref={(el) => (cardRefs.current[card.name] = el)} sx={{ 
                perspective: { xs: 0, sm: 1200 },
                width: '100%',
                position: 'relative',
              }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 4 },
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: { xs: 3, sm: 4, md: 5 },
                    position: "relative",
                    overflow: "visible",
                    minHeight: { xs: 180, sm: 200, md: 210 },
                    width: '100%',
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(8px)",
                    border: "2.5px solid",
                    borderImage: `${borderGradient[card.name]} 1`,
                    transition: "transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.3s, border-image 1s",
                    transform: hoveredCard === card.name ? { 
                      xs: "scale(1)", 
                      sm: "scale(1.045) translateY(-10px)" 
                    } : "scale(1)",
                    zIndex: hoveredCard === card.name ? 1000 : 1,
                    ...(hoveredCard === card.name
                      ? { boxShadow: { xs: baseShadow, sm: activeShadow } }
                      : { boxShadow: baseShadow }),
                    "&:hover": {
                      boxShadow: {
                        xs: baseShadow,
                        sm: "0 24px 60px 0 rgba(253,160,133,0.40), 0 2px 8px 0 #f6d36588, 0 0 48px 0 #fda08577",
                      },
                    },
                    "&:active": {
                      transform: { xs: "scale(0.98)", sm: "scale(1.02)" },
                    },
                  }}
                  onMouseEnter={() => handleMouseEnter(card.name)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    // On mobile, navigate directly to first subpage
                    if (isMobile && card.subPages.length > 0) {
                      const section = card.name.toLowerCase().replace(/\s+/g, "-");
                      const unit = card.subPages[0].toLowerCase();
                      navigate(`/${section}/${unit}`);
                    }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    color="#1a237e" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    }}
                  >
                    {isMobile ? 'Tap for details' : 'Click for more details'}
                  </Typography>

                  <Slide
                    direction="down"
                    in={hoveredCard === card.name}
                    mountOnEnter
                    unmountOnExit
                    timeout={350}
                  >
                      <Box
                        sx={{
                          position: { xs: "relative", sm: "absolute" },
                          top: { xs: "auto", sm: "100%" },
                          left: { xs: "auto", sm: "50%" },
                          transform: { xs: "none", sm: "translateX(-50%)" },
                          mt: { xs: 2, sm: 2 },
                          mx: { xs: "auto", sm: 0 },
                          minWidth: { xs: '100%', sm: 200 },
                          maxWidth: { xs: '100%', sm: 250 },
                          background: "rgba(255,255,255,0.95)",
                          borderRadius: { xs: 2, sm: 4 },
                          boxShadow: "0 8px 32px 0 rgba(253,160,133,0.3)",
                          border: "2px solid #fda085",
                          zIndex: 9999,
                          py: { xs: 1, sm: 1 },
                          px: { xs: 1, sm: 0.5 },
                          backdropFilter: "blur(6px)",
                        }}
                      >
                      <Box
                        sx={{
                          height: 4,
                          width: "100%",
                          background: "linear-gradient(90deg, #fda085 0%, #f6d365 100%)",
                          borderRadius: 2,
                          mb: 1,
                        }}
                      />
                      <List>
                        {card.subPages.map((sub, idx) => (
                          <Slide
                            key={sub}
                            direction="right"
                            in={hoveredCard === card.name}
                            style={{ transitionDelay: `${idx * 80 + 100}ms` }}
                            mountOnEnter
                            unmountOnExit
                          >
                            <ListItem
                              button
                              onClick={(e) => handleSubpageClick(sub, card.name, e)}
                              sx={{
                                borderRadius: 2,
                                my: 0.5,
                                px: 2,
                                "&:hover": {
                                  background: "linear-gradient(90deg, #fda085 0%, #f6d365 100%)",
                                  color: "#fff",
                                  boxShadow: "0 2px 8px #fda08533",
                                },
                              }}
                            >
                              <ChevronRightIcon sx={{ color: "#fda085", mr: 1 }} />
                              <ListItemText primary={sub} />
                              {ripple[sub]?.show && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    left: ripple[sub].x - 20,
                                    top: ripple[sub].y - 20,
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: "rgba(253,160,133,0.25)",
                                    pointerEvents: "none",
                                    zIndex: 10,
                                  }}
                                />
                              )}
                            </ListItem>
                          </Slide>
                        ))}
                      </List>
                    </Box>
                  </Slide>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;