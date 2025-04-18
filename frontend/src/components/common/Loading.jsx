import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Loading = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "primary.main",
          }}
        />
      </motion.div>
      <Typography
        variant="h6"
        sx={{
          color: "secondary.main",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Loading;
