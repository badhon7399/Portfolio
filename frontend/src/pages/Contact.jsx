import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    url: "https://github.com/yourusername",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://linkedin.com/in/yourusername",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    url: "https://twitter.com/yourusername",
  },
  {
    name: "Email",
    icon: <FaEnvelope />,
    url: "mailto:your.email@example.com",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSnackbar({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error sending message. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            color: "primary.main",
            mb: 6,
            textAlign: "center",
          }}
        >
          Get In Touch
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                sx={{
                  p: 4,
                  backgroundColor: "background.default",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "primary.main",
                          color: "background.default",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  backgroundColor: "background.default",
                }}
              >
                <Typography variant="h3" sx={{ color: "primary.main", mb: 3 }}>
                  Contact Information
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "secondary.main", mb: 4 }}
                >
                  Feel free to reach out to me through any of the following
                  channels. I'm always open to discussing new projects, creative
                  ideas, or opportunities to be part of your visions.
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {socialLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={link.icon}
                        sx={{
                          justifyContent: "flex-start",
                          color: "secondary.main",
                          "&:hover": {
                            color: "primary.main",
                            backgroundColor: "rgba(100, 255, 218, 0.1)",
                          },
                        }}
                      >
                        {link.name}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
