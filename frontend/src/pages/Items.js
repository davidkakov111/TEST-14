import { useEffect, useRef, useState } from 'react';
import { useData } from '../state/DataContext';
import { List } from "react-window";
import Pagination from "../components/Pagination";
import RowComponent from "../components/ListRow";

// Items page
function Items() {
  const { items, fetchItems } = useData();
  const activeRef = useRef(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // items per page (currently fixed)
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalItems / limit);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // reset page when searching
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch items for current page
  const loadItems = async (pageNum = 1, q = '') => {
    setLoading(true);
    activeRef.current = true;
    
    try {
      const total = await fetchItems(activeRef, pageNum, limit, q);
      if (total !== undefined) setTotalItems(total);
    } catch (err) {
      console.error("Failed to fetch items:", err);  
    } finally {
      setLoading(false);
    }
  };

  // Fetch items when page or search query changes and on mount
  useEffect(() => {
    loadItems(page, debouncedQuery).catch(console.error);

    return () => {
      activeRef.current = false;
    };
  }, [page, debouncedQuery]);

  // TODO - show loading when needed
  return (
    <div>
      {/* Search input */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Items (virtualized) */}
      <List
        rowComponent={RowComponent}
        rowCount={items ? items.length : 0}
        height={400}
        rowHeight={50}
        rowProps={{ names: items }}
        width={'100%'}
      />
      
      {/* Pagination buttons */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Items;