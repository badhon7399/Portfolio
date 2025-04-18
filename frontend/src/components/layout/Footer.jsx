import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub size={20} />,
    url: "https://github.com/yasinbadhon",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={20} />,
    url: "https://linkedin.com/in/yasinbadhon",
  },
  {
    name: "Twitter",
    icon: <FaTwitter size={20} />,
    url: "https://twitter.com/yasinbadhon",
  },
  {
    name: "Email",
    icon: <FaEnvelope size={20} />,
    url: "mailto:yasinbadhon@gmail.com",
  },
];

const contactInfo = [
  {
    icon: <FaMapMarkerAlt size={16} />,
    text: "Dhaka, Bangladesh",
  },
  {
    icon: <FaEnvelope size={16} />,
    text: "yasinbadhon@gmail.com",
    url: "mailto:yasinbadhon@gmail.com",
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
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
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Stack
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                spacing={2}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontFamily: '"Fira Code", monospace',
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    mb: 1,
                  }}
                >
                  Contact
                </Typography>
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {info.icon}
                    </Box>
                    {info.url ? (
                      <Typography
                        component="a"
                        href={info.url}
                        variant="body2"
                        sx={{
                          color: "secondary.light",
                          textDecoration: "none",
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {info.text}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "secondary.light",
                        }}
                      >
                        {info.text}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack
                alignItems="center"
                spacing={3}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Stack direction="row" spacing={3}>
                  {socialLinks.map((link) => (
                    <IconButton
                      key={link.name}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "primary.main",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "primary.light",
                          transform: "translateY(-3px)",
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                        },
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  ))}
                </Stack>

                <Typography
                  variant="body2"
                  component={motion.p}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  sx={{
                    color: "secondary.light",
                    textAlign: "center",
                    fontFamily: '"Fira Code", monospace',
                    fontSize: "0.9rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Designed & Built by Yasin Badhon
                </Typography>

                <Typography
                  variant="caption"
                  component={motion.p}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  sx={{
                    color: "secondary.main",
                    opacity: 0.8,
                    fontFamily: '"Fira Code", monospace',
                    fontSize: "0.8rem",
                  }}
                >
                  © {new Date().getFullYear()} All rights reserved
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
