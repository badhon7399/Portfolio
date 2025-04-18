import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
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

    const { success, error } = await login(formData.email, formData.password);

    if (success) {
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      // Redirect to admin dashboard after successful login
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } else {
      setSnackbar({
        open: true,
        message: error || "Login failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            sx={{
              p: 4,
              backgroundColor: "background.default",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "primary.main",
                mb: 4,
                textAlign: "center",
              }}
            >
              Admin Login
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ mb: 4 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.default",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </motion.div>
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

export default Login;
