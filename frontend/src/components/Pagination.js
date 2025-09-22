
// Pagination component
function Pagination({ page, totalPages, onPageChange }) {
    
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
        <div className="pagination">
            <button onClick={() => onPageChange(Math.max(page - 1, 1))}>Prev</button>

            {pagination.map((p, idx) =>
                p === "..." ? (
                <span key={idx}>...</span>
                ) : (
                <button
                    key={idx}
                    onClick={() => onPageChange(p)}
                    style={{ fontWeight: page === p ? "bold" : "normal" }}
                >
                    {p}
                </button>
                )
            )}

            <button onClick={() => onPageChange(Math.min(page + 1, totalPages))}>
                Next
            </button>
        </div>
    );
}

export default Pagination;
