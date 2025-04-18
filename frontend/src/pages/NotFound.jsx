import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
              fontWeight: 700,
              color: "primary.main",
              textShadow: "4px 4px 8px rgba(0,0,0,0.2)",
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: "secondary.main",
              fontWeight: 600,
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "secondary.light",
              maxWidth: "600px",
            }}
          >
            Oops! The page you are looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};

export default NotFound;
