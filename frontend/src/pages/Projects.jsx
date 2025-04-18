import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const categories = ["web", "mobile", "desktop", "other"];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
        setFilteredProjects(response.data);

        // Extract unique tags
        const tags = new Set();
        response.data.forEach((project) => {
          project.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory, selectedTags]);

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
          My Projects
        </Typography>

        {/* Filters */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search Projects"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Tags */}
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, color: "secondary.main" }}
            >
              Filter by Tags:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagClick(tag)}
                  color={selectedTags.includes(tag) ? "primary" : "default"}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "background.default",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} md={6} key={project._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    height: "100%",
                    backgroundColor: "background.default",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
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
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                  >
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
                    <Button
                      component={Link}
                      to={`/projects/${project._id}`}
                      variant="text"
                      sx={{ color: "primary.main" }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
