import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Box } from "@mui/material";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Create theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64ffda",
      light: "#9effff",
      dark: "#14cba8",
    },
    secondary: {
      main: "#8892b0",
      light: "#a8b2d1",
      dark: "#495670",
    },
    background: {
      default: "#0a192f",
      paper: "#112240",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: "4rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "3rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "2rem",
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Source Sans Pro", sans-serif',
      fontSize: "1.1rem",
      lineHeight: 1.8,
      letterSpacing: "0.01em",
    },
    body2: {
      fontFamily: '"Source Sans Pro", sans-serif',
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    subtitle1: {
      fontFamily: '"Fira Code", monospace',
      fontSize: "1.1rem",
      letterSpacing: "0.02em",
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
          padding: "8px 24px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              width: "100vw",
              maxWidth: "100vw",
              margin: 0,
              padding: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                width: "100%",
                position: "relative",
                mt: { xs: "56px", sm: "64px" },
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
