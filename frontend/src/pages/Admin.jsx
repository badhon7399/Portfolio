import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { motion } from "framer-motion";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    images: [],
    githubUrl: "",
    liveUrl: "",
    category: "web",
    tags: [],
    featured: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/projects"),
          axios.get("http://localhost:5000/api/contact"),
        ]);
        setProjects(projectsRes.data);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (project = null) => {
    if (project) {
      setSelectedProject(project);
      setFormData(project);
    } else {
      setSelectedProject(null);
      setFormData({
        title: "",
        description: "",
        technologies: [],
        images: [],
        githubUrl: "",
        liveUrl: "",
        category: "web",
        tags: [],
        featured: false,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProject) {
        await axios.put(
          `http://localhost:5000/api/projects/${selectedProject._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/projects", formData);
      }
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data);
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateMessageStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${id}/status`, {
        status,
      });
      const response = await axios.get("http://localhost:5000/api/contact");
      setMessages(response.data);
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper sx={{ p: 4, backgroundColor: "background.default" }}>
            <Typography variant="h2" sx={{ color: "primary.main", mb: 4 }}>
              Admin Dashboard
            </Typography>

            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 4 }}>
              <Tab label="Projects" />
              <Tab label="Messages" />
            </Tabs>

            {activeTab === 0 && (
              <>
                <Button
                  variant="contained"
                  onClick={() => handleOpenDialog()}
                  sx={{ mb: 4 }}
                >
                  Add New Project
                </Button>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Technologies</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project._id}>
                          <TableCell>{project.title}</TableCell>
                          <TableCell>{project.category}</TableCell>
                          <TableCell>
                            <Box
                              sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                            >
                              {project.technologies.map((tech) => (
                                <Chip key={tech} label={tech} size="small" />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {project.featured ? "Featured" : "Regular"}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleOpenDialog(project)}
                              sx={{ color: "primary.main" }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteProject(project._id)}
                              sx={{ color: "error.main" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {activeTab === 1 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message._id}>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{message.message}</TableCell>
                        <TableCell>{message.status}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              handleUpdateMessageStatus(message._id, "read")
                            }
                            disabled={message.status === "read"}
                          >
                            Mark as Read
                          </Button>
                          <Button
                            onClick={() =>
                              handleUpdateMessageStatus(message._id, "replied")
                            }
                            disabled={message.status === "replied"}
                          >
                            Mark as Replied
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </motion.div>
      </Container>

      {/* Project Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedProject ? "Edit Project" : "Add New Project"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Technologies (comma-separated)"
                  value={formData.technologies.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technologies: e.target.value
                        .split(",")
                        .map((tech) => tech.trim()),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Images (comma-separated URLs)"
                  value={formData.images.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      images: e.target.value
                        .split(",")
                        .map((url) => url.trim()),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Live URL"
                  value={formData.liveUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, liveUrl: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                  <option value="other">Other</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tags (comma-separated)"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedProject ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Admin;
