import { Routes, Route, Link } from 'react-router-dom';
import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../state/DataContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function App() {
  return (
    <DataProvider>
      {/* Header */}
      <AppBar position="static" color="default">
        <Container maxWidth="lg">
          <Toolbar>
            <Button color="inherit" component={Link} sx={{ fontSize: '1.2rem' }} to="/">
              Items
            </Button>
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
    </DataProvider>
  );
}

export default App;