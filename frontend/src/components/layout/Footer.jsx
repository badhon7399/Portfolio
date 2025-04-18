import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
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
      <Container maxWidth={false}>
        <Box py={{ xs: 4, md: 4 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", md: "center" }}
            spacing={{ xs: 4, md: 2 }}
            mb={3}
          >
            {/* Brand and Description */}
            <Box
              sx={{
                maxWidth: { xs: "100%", md: "400px" },
                textAlign: { xs: "center", md: "left" },
                width: { xs: "100%", md: "auto" },
                px: { xs: 2, md: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                  fontFamily: '"Montserrat", sans-serif',
                  mb: { xs: 1.5, md: 1 },
                  fontSize: { xs: "1.25rem", md: "1.25rem" },
                }}
              >
                Yasin Badhon
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                  fontSize: { xs: "0.875rem", md: "0.875rem" },
                  opacity: 0.9,
                }}
              >
                Full Stack Developer specializing in MERN stack development.
                Creating innovative web solutions with a focus on user
                experience and performance.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Stack
              spacing={2}
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{
                width: { xs: "100%", md: "auto" },
                px: { xs: 2, md: 0 },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "primary.main",
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: { xs: "1rem", md: "1rem" },
                  fontWeight: 600,
                }}
              >
                Quick Links
              </Typography>
              <Stack
                spacing={1.5}
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        transition: "color 0.2s ease",
                        textAlign: "center",
                        fontSize: { xs: "0.875rem", md: "0.875rem" },
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {link.name}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Stack>

            {/* Contact Info */}
            <Stack
              spacing={2}
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{
                width: { xs: "100%", md: "auto" },
                px: { xs: 2, md: 0 },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "primary.main",
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: { xs: "1rem", md: "1rem" },
                  fontWeight: 600,
                }}
              >
                Contact
              </Typography>
              <Stack
                spacing={1.5}
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    color: "text.secondary",
                    transition: "color 0.2s ease",
                    width: "100%",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <FaEnvelope size={14} />
                  <MuiLink
                    href="mailto:yasinbadhon@gmail.com"
                    sx={{
                      color: "inherit",
                      textDecoration: "none",
                      fontSize: { xs: "0.875rem", md: "0.875rem" },
                    }}
                  >
                    yasinbadhon@gmail.com
                  </MuiLink>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    color: "text.secondary",
                    width: "100%",
                  }}
                >
                  <FaMapMarkerAlt size={14} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", md: "0.875rem" },
                    }}
                  >
                    Dhaka, Bangladesh
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Divider */}
          <Box
            sx={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.1), transparent)",
              my: { xs: 3, md: 3 },
            }}
          />

          {/* Bottom Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={{ xs: 2.5, sm: 2 }}
            sx={{
              width: "100%",
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                width: "100%",
                fontSize: { xs: "0.8rem", md: "0.875rem" },
                opacity: 0.9,
              }}
            >
              © {new Date().getFullYear()} Yasin Badhon. All rights reserved.
            </Typography>

            <Stack
              direction="row"
              spacing={2.5}
              justifyContent="center"
              sx={{
                width: "100%",
              }}
            >
              {socialLinks.map((link) => (
                <IconButton
                  key={link.name}
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    transition: "all 0.2s ease",
                    padding: "6px",
                    "&:hover": {
                      color: "primary.light",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
