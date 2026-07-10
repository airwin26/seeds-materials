import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const categoryChipSx = {
  mt: 1,
  mb: 1,
  bgcolor: 'secondary.light',
  color: '#457A3E',
  fontWeight: 500,
  borderRadius: '16px',
  '& .MuiChip-label': {
    px: 1.5,
  },
};

function CategoryDropdown({ id, categories, selected, onSelect }) {
  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id={`${id}-label`}>Category</InputLabel>
      <Select
        labelId={`${id}-label`}
        value={selected}
        label="Category"
        onChange={(e) => onSelect(e.target.value)}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)' }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function matchesSearch(item, searchTerm) {
  if (!searchTerm) return true;
  const term = searchTerm.toLowerCase();
  return (
    item.title.toLowerCase().includes(term) ||
    (item.category && item.category.toLowerCase().includes(term)) ||
    (item.description && item.description.toLowerCase().includes(term))
  );
}

function App() {
  const [links, setLinks] = useState([]);
  const [additionalResources, setAdditionalResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [campCategoryFilter, setCampCategoryFilter] = useState('');
  const [additionalCategoryFilter, setAdditionalCategoryFilter] = useState('');

  useEffect(() => {
    fetch('/resources.json')
      .then((res) => res.json())
      .then((data) => setLinks(data));
    fetch('/additional-resources.json')
      .then((res) => res.json())
      .then((data) => setAdditionalResources(data));
  }, []);

  const campCategories = useMemo(
    () => [...new Set(links.map((link) => link.category).filter(Boolean))].sort(),
    [links]
  );

  const additionalCategories = useMemo(
    () => [...new Set(additionalResources.map((resource) => resource.category).filter(Boolean))].sort(),
    [additionalResources]
  );

  const filteredLinks = links.filter(
    (link) =>
      matchesSearch(link, searchTerm) &&
      (!campCategoryFilter || link.category === campCategoryFilter)
  );

  const filteredAdditionalResources = additionalResources.filter(
    (resource) =>
      matchesSearch(resource, searchTerm) &&
      (!additionalCategoryFilter || resource.category === additionalCategoryFilter)
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'primary.dark',
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img src="/seeds_logo.png" alt="Seeds International Logo" style={{ height: 44 }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: { xs: '200px', sm: '320px' },
          py: { xs: 3, sm: 0 },
          width: '100%',
          backgroundImage: {
            xs: "url('/seeds_banner.png')",
            md: "url('/seeds_banner_wide.png')",
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', px: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: { xs: 1, sm: 2 },
              fontWeight: 700,
              color: 'primary.dark',
              fontSize: { xs: '1.35rem', sm: '2rem', md: '2.75rem' },
              lineHeight: { xs: 1.2, sm: 1.3 },
            }}
          >
            Seeds International Resources
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: { xs: 2, sm: 4 },
              color: 'primary.dark',
              fontWeight: 400,
              fontSize: { xs: '0.85rem', sm: '1.1rem', md: '1.5rem' },
              lineHeight: 1.4,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Your one-stop shop for all Seeds International resources
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              maxWidth: '400px',
              mx: 'auto',
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                height: '40px',
                '& fieldset': {
                  borderColor: 'primary.light',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'primary.dark',
                py: '8px',
              },
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" sx={{ color: 'primary.dark', fontWeight: 600 }}>
            Camp Resources
          </Typography>
          <CategoryDropdown
            id="camp-category"
            categories={campCategories}
            selected={campCategoryFilter}
            onSelect={setCampCategoryFilter}
          />
        </Box>
        <Grid container spacing={3}>
          {filteredLinks.map((link) => (
            <Grid item xs={12} sm={6} md={4} key={link.id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                },
              }}>
                <CardContent sx={{
                  flexGrow: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                      {link.title}
                    </Typography>
                  </Box>
                  <Chip
                    label={link.category}
                    size="small"
                    sx={categoryChipSx}
                  />
                  {link.links ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {link.links.map((item) => (
                        <Button
                          key={item.label}
                          href={item.url || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={!item.url}
                          sx={{
                            borderColor: 'secondary.main',
                            color: 'secondary.main',
                            '&:hover': {
                              borderColor: 'secondary.dark',
                              bgcolor: 'secondary.main',
                              color: 'secondary.contrastText',
                            },
                          }}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </Box>
                  ) : (
                    <Button
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        '&:hover': {
                          borderColor: 'secondary.dark',
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                        },
                      }}
                    >
                      Visit Link
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Additional Resources Section */}
      <Box sx={{
        width: '100vw',
        bgcolor: 'rgba(158, 94, 75, 0.08)',
        py: 6,
        mt: 8,
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h4" sx={{ color: 'primary.dark', fontWeight: 600 }}>
              Additional Resources
            </Typography>
            <CategoryDropdown
              id="additional-category"
              categories={additionalCategories}
              selected={additionalCategoryFilter}
              onSelect={setAdditionalCategoryFilter}
            />
          </Box>
          <Grid container spacing={2}>
            {filteredAdditionalResources.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource.id}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                        {resource.title}
                      </Typography>
                    </Box>
                    <Chip
                      label={resource.category}
                      size="small"
                      sx={categoryChipSx}
                    />
                    {resource.description && (
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.5 }}
                      >
                        {resource.description}
                      </Typography>
                    )}
                    <Button
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        mt: 1,
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        '&:hover': {
                          borderColor: 'secondary.dark',
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                        },
                      }}
                    >
                      Visit Link
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App; 