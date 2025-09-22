import { Link } from 'react-router-dom';

// Row component for a virtualized react-window List
function RowComponent({
  index,
  names,
  style
}) {
    return (
        <div style={style}>
            <Link to={'/items/' + names[index].id}>{names[index].name}</Link>
        </div>
    );      
}

export default RowComponent;