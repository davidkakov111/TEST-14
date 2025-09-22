import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';

// Row component for a virtualized react-window List
function RowComponent({
  index,
  names,
  style
}) {
    const item = names[index];

    return (
        <div style={style}>
            <ListItemButton
                component={Link}
                to={`/items/${item.id}`}
                sx={{ height: '100%' }}
            >
                <ListItemText primary={item.name} />
            </ListItemButton>
        </div>
    );      
}

export default RowComponent;