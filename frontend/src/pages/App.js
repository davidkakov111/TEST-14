import { Routes, Route, Link } from 'react-router-dom';
import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../state/DataContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box, IconButton } from "@mui/material";

function App() {
  // Color scheme for theme toggle
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <DataProvider>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: 'background.default',
        color: 'text.primary',
      }}>
        {/* Header */}
        <AppBar position="static" color="default">
          <Container maxWidth="lg">
            <Toolbar>
              <Button color="inherit" component={Link} sx={{ fontSize: '1.2rem' }} to="/">
                Items
              </Button>

              {/* Spacer to push the theme toggle right */}
              <Box sx={{ flexGrow: 1 }} />

              {/* Theme toggle */}
              <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
                {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Routes / Pages */}
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/items/:id" element={<ItemDetail />} />
          </Routes>
        </Container>
      </Box>
    </DataProvider>
  );
}

export default App;