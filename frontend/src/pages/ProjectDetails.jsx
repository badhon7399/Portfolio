import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/${id}`
        );
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error loading project details");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "primary.main" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "error.main" }}>
          {error || "Project not found"}
        </Typography>
        <Button
          component={Link}
          to="/projects"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
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
            <Grid container spacing={4}>
              {/* Project Images */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    pb: 2,
                    "&::-webkit-scrollbar": {
                      height: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "background.paper",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "primary.main",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {project.images.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        sx={{
                          height: "300px",
                          borderRadius: 2,
                          objectFit: "cover",
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Grid>

              {/* Project Details */}
              <Grid item xs={12} md={8}>
                <Typography variant="h2" sx={{ color: "primary.main", mb: 2 }}>
                  {project.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "secondary.main", mb: 3 }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{ color: "primary.main", mb: 2 }}
                  >
                    Technologies Used
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        sx={{
                          backgroundColor: "background.paper",
                          color: "primary.main",
                          border: "1px solid",
                          borderColor: "primary.main",
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {project.tags.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h4"
                      sx={{ color: "primary.main", mb: 2 }}
                    >
                      Tags
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          sx={{
                            backgroundColor: "background.paper",
                            color: "secondary.main",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: "flex", gap: 2 }}>
                  {project.githubUrl && (
                    <Button
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      sx={{
                        borderColor: "primary.main",
                        color: "primary.main",
                        "&:hover": {
                          borderColor: "primary.light",
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                        },
                      }}
                    >
                      View Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      component="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "background.default",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                    >
                      Live Demo
                    </Button>
                  )}
                </Box>
              </Grid>

              {/* Project Info Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: "background.paper",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "primary.main", mb: 3 }}
                  >
                    Project Info
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "secondary.main" }}
                      >
                        Category
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "primary.main",
                          textTransform: "capitalize",
                        }}
                      >
                        {project.category}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "secondary.main" }}
                      >
                        Status
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: project.featured
                            ? "primary.main"
                            : "secondary.main",
                        }}
                      >
                        {project.featured ? "Featured" : "Completed"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "secondary.main" }}
                      >
                        Date
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "secondary.main" }}
                      >
                        {new Date(project.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProjectDetails;
