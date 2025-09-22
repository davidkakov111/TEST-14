import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// Display detailed information about a specific item
function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(setItem)
      .catch(() => navigate('/'));
  }, [id, navigate]);

  // Loading skeleton
  if (!item) return <Skeleton
    sx={{ bgcolor: 'grey.900', borderRadius: 1, margin: '20px auto' }}
    variant="rectangular"
    height={130}
    width={400}
  />;

  return (
    <Card sx={{ maxWidth: 400, margin: '20px auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {item.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Category:</strong> {item.category}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Price:</strong> ${item.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItemDetail;