import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        padding: "2rem 1rem",
      }}
    >
      <IconButton
        onClick={handleDrawerToggle}
        sx={{ alignSelf: "flex-end", color: theme.palette.primary.main }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: theme.palette.secondary.main,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        {isAuthenticated() && (
          <ListItem
            component={Link}
            to="/admin"
            onClick={handleDrawerToggle}
            sx={{
              color: theme.palette.secondary.main,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <ListItemText primary="Admin" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? "rgba(10, 25, 47, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: "none",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            component={Link}
            to="/"
            sx={{
              color: theme.palette.primary.main,
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            Portfolio
          </Button>
        </motion.div>

        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: theme.palette.primary.main }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component={Link}
                  to={item.path}
                  sx={{
                    color:
                      location.pathname === item.path
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.name}
                </Button>
              </motion.div>
            ))}
            {isAuthenticated() ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    to="/admin"
                    sx={{
                      color: theme.palette.secondary.main,
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Admin
                  </Button>
                </motion.div>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Login
                </Button>
              </motion.div>
            )}
          </Box>
        )}
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
