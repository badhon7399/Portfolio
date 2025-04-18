import { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { useScroll, useTransform } from "framer-motion";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import useTypewriter from "../hooks/useTypewriter";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Scroll animations for different sections
  const [aboutRef, aboutControls] = useScrollAnimation(0.2);
  const [projectsRef, projectsControls] = useScrollAnimation(0.1);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Typewriter text with natural, smooth animation
  const roleText = useTypewriter(
    [
      "Full Stack Developer",
      "MERN Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Designer",
    ],
    120, // Typing speed (ms per character) - more natural pace
    80, // Deletion speed (ms per character) - smoother deletion
    3000 // Longer pause between phrases for better readability
  );

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/projects/featured"
        );
        setFeaturedProjects(response.data);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section with parallax effect */}
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // Subtract header height
          display: "flex",
          alignItems: "center",
          position: "relative",
          py: { xs: 4, md: 0 }, // Add padding on mobile
        }}
      >
        <Motion.div style={{ opacity, y }} className="parallax-content">
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "primary.main",
                        mb: 2,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      Welcome to my portfoliojkj
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "primary.main",
                        fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                        display: "block",
                        mb: { xs: 2, md: 3 },
                        fontFamily: '"Playfair Display", serif',
                        textShadow: "0 2px 4px rgba(100, 255, 218, 0.1)",
                        lineHeight: 1.2,
                      }}
                    >
                      Hi, I'm Yasin Badhon
                    </Typography>
                  </Box>
                  <Box sx={{ mb: { xs: 3, md: 4 }, minHeight: "3.5rem" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        color: "secondary.main",
                        fontSize: { xs: "1.8rem", md: "2.5rem" },
                        borderRight: "4px solid",
                        borderColor: "secondary.main",
                        display: "inline-block",
                        paddingRight: "8px",
                        fontFamily: '"Montserrat", sans-serif',
                        animation: "blink-caret 1s step-end infinite",
                        "@keyframes blink-caret": {
                          "from, to": { borderColor: "transparent" },
                          "50%": { borderColor: "secondary.main" },
                        },
                      }}
                    >
                      {roleText}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "secondary.light",
                      mb: { xs: 4, md: 5 },
                      maxWidth: "600px",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                      lineHeight: 1.8,
                      letterSpacing: "0.01em",
                    }}
                  >
                    I build exceptional digital experiences. With a focus on
                    clean code, modern design, and user experience, I create
                    websites and applications that make an impact.
                  </Typography>
                  <Box sx={{ display: "flex", gap: { xs: 2, md: 3 } }}>
                    <Button
                      component={Link}
                      to="/projects"
                      variant="contained"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "background.default",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                    >
                      View My Work
                    </Button>
                    <Button
                      component={Link}
                      to="/contact"
                      variant="outlined"
                      sx={{
                        borderColor: "primary.main",
                        color: "primary.main",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        "&:hover": {
                          borderColor: "primary.light",
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                        },
                      }}
                    >
                      Contact Me
                    </Button>
                  </Box>
                </Motion.div>
              </Grid>
            </Grid>
          </Container>
        </Motion.div>
      </Box>

      {/* Featured Projects Section */}
      <Box
        ref={projectsRef}
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Motion.div
            initial="hidden"
            animate={projectsControls}
            variants={containerVariants}
          >
            <Typography
              variant="h2"
              sx={{
                color: "primary.main",
                mb: { xs: 4, md: 6 },
                textAlign: "center",
                fontFamily: '"Montserrat", sans-serif',
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "60px", md: "80px" },
                  height: "4px",
                  background:
                    "linear-gradient(90deg, transparent, #64ffda, transparent)",
                },
              }}
            >
              Featured Projects
            </Typography>
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {featuredProjects.map((project) => (
                <Grid item xs={12} md={4} key={project._id}>
                  <Motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Paper
                      sx={{
                        p: { xs: 2.5, md: 3 },
                        height: "100%",
                        backgroundColor: "background.default",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: (theme) =>
                            `0 10px 30px ${theme.palette.primary.main}20`,
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{ color: "primary.main", mb: 2 }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "secondary.main", mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {project.technologies.map((tech) => (
                          <Typography
                            key={tech}
                            variant="caption"
                            sx={{
                              color: "primary.main",
                              border: "1px solid",
                              borderColor: "primary.main",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                            }}
                          >
                            {tech}
                          </Typography>
                        ))}
                      </Box>
                    </Paper>
                  </Motion.div>
                </Grid>
              ))}
            </Grid>
          </Motion.div>
        </Container>
      </Box>

      {/* About Section */}
      <Box
        ref={aboutRef}
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.3), transparent)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.3), transparent)",
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Motion.div
                initial="hidden"
                animate={aboutControls}
                variants={containerVariants}
              >
                <Motion.div variants={itemVariants}>
                  <Box sx={{ position: "relative", mb: { xs: 3, md: 4 } }}>
                    <Typography
                      variant="h2"
                      sx={{
                        color: "primary.main",
                        position: "relative",
                        display: "inline-block",
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                        fontWeight: 600,
                        mb: { xs: 2, md: 3 },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: "-8px",
                          left: 0,
                          width: "60%",
                          height: "2px",
                          background:
                            "linear-gradient(90deg, #64ffda, transparent)",
                        },
                      }}
                    >
                      About Me
                    </Typography>
                  </Box>
                </Motion.div>

                <Motion.div
                  variants={itemVariants}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, delay: 0.2 },
                  }}
                  initial={{ opacity: 0, x: -50 }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "secondary.main",
                      mb: 3,
                      lineHeight: 1.8,
                      textAlign: "justify",
                      position: "relative",
                      pl: 2,
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: "1.1rem",
                      letterSpacing: "0.01em",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "2px",
                        background:
                          "linear-gradient(180deg, #64ffda, transparent)",
                      },
                    }}
                  >
                    Hi, I'm Yasin Badhon, a passionate and detail-oriented Web
                    Developer and a Computer Science and Engineering student
                    with a strong focus on building dynamic, responsive, and
                    user-centric applications using the MERN stack (MongoDB,
                    Express.js, React.js, Node.js). I specialize in full-stack
                    development, creating seamless experiences from front-end
                    design to back-end functionality. My academic background in
                    Computer Science has equipped me with a solid understanding
                    of software engineering principles, algorithms, and modern
                    development practices. I love turning ideas into reality
                    through clean, efficient, and scalable code. I'm constantly
                    exploring new technologies and best practices to stay ahead
                    in the ever-evolving world of web development. Whether it's
                    developing modern web interfaces or architecting robust
                    APIs, I bring creativity, precision, and dedication to every
                    project.
                  </Typography>
                </Motion.div>

                <Motion.div
                  variants={itemVariants}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, delay: 0.4 },
                  }}
                  initial={{ opacity: 0, x: -50 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "secondary.light",
                      fontStyle: "italic",
                      pl: 2,
                      borderLeft: "2px solid",
                      borderColor: "primary.main",
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                    }}
                  >
                    When I'm not coding, you can find me exploring new
                    technologies, contributing to open-source projects, or
                    enjoying outdoor activities.
                  </Typography>
                </Motion.div>
              </Motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
