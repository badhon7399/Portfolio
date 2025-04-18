import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      showSnackbar("Error fetching projects", "error");
    }
  };

  const handleOpen = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        ...project,
        technologies: project.technologies.join(", "),
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
    };

    try {
      const url = editingProject
        ? `http://localhost:5000/api/projects/${editingProject._id}`
        : "http://localhost:5000/api/projects";

      const response = await fetch(url, {
        method: editingProject ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error("Failed to save project");

      showSnackbar(
        `Project ${editingProject ? "updated" : "created"} successfully`
      );
      handleClose();
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      showSnackbar("Error saving project", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete project");

      showSnackbar("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      showSnackbar("Error deleting project", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Project Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Add New Project
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Technologies</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    {project.description.substring(0, 100)}...
                  </TableCell>
                  <TableCell>{project.technologies.join(", ")}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpen(project)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(project._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingProject ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Technologies (comma-separated)"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Live URL"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {editingProject ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </motion.div>
  );
};

export default AdminDashboard;
