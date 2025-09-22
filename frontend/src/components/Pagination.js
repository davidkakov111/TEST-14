import { Stack, Button, Typography } from '@mui/material';

// Pagination component
function Pagination({ page, totalPages, onPageChange }) {
    const btnSx = {
        minWidth: 25,    
        height: 25,       
        fontSize: '0.7rem',
        padding: '2px 4px' 
    };
    
    // Generate pagination buttons array
    const getPagination = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1, 2, 3); // first 3
            if (page > 4) pages.push('...');
            const start = Math.max(4, page - 1);
            const end = Math.min(totalPages - 3, page + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (page < totalPages - 3) pages.push('...');
            pages.push(totalPages - 2, totalPages - 1, totalPages); // last 3
        }

        return pages;
    };
    const pagination = getPagination();

    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={2} flexWrap="wrap">
            <Button 
                sx={btnSx}
                variant="outlined" 
                onClick={() => onPageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
            >
                Prev
            </Button>

            {pagination.map((p, idx) =>
                p === '...' ? (
                <Typography key={idx} sx={{ mx: 1 }}>...</Typography>
                ) : (
                <Button
                    sx={btnSx}
                    key={idx}
                    variant={page === p ? "contained" : "outlined"}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </Button>
                )
            )}

            <Button 
                sx={btnSx}
                variant="outlined" 
                onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
            >
                Next
            </Button>
        </Stack>
    );
}

export default Pagination;
