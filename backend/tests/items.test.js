const { getItems, getItemById, postItem } = require("../src/routes/items");
const fs = require("fs").promises;

jest.mock("fs", () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
    },
}));

describe("Items Handlers Unit Tests", () => {
    const mockItems = [
        { id: 1, name: "Laptop Pro", category: "Electronics", price: 2499 },
        { id: 2, name: "Noise Cancelling Headphones", category: "Electronics", price: 399 },
    ];

    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();
        res = { json: jest.fn(), status: jest.fn(() => res) };
        next = jest.fn();
    });

    // --- GET /api/items ---
    test("getItems returns all items", async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockItems));
        req = { query: {} };

        await getItems(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            items: mockItems,
            total: mockItems.length
        });
        expect(next).not.toHaveBeenCalled();
    });

    test("getItems calls next on readFile error", async () => {
        fs.readFile.mockRejectedValue(new Error("File error"));
        req = { query: {} };

        await getItems(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    // --- GET /api/items/:id ---
    test("getItemById returns item if found", async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockItems));
        req = { params: { id: "1" } };

        await getItemById(req, res, next);

        expect(res.json).toHaveBeenCalledWith(mockItems[0]);
        expect(next).not.toHaveBeenCalled();
    });

    test("getItemById calls next with 404 if not found", async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockItems));
        req = { params: { id: "3" } };

        await getItemById(req, res, next);

        const errArg = next.mock.calls[0][0];
        expect(errArg.message).toBe("Item not found");
        expect(errArg.status).toBe(404);
    });

    // --- POST /api/items ---
    test("postItem adds a new item", async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockItems));
        fs.writeFile.mockResolvedValue();
        req = { body: { name: "New Item", category: "Misc", price: 123 } };

        await postItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: "New Item" }));
        expect(next).not.toHaveBeenCalled();
    });

    test("postItem calls next on write error", async () => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockItems));
        fs.writeFile.mockRejectedValue(new Error("Write failed"));
        req = { body: { name: "Fail Item", category: "Test", price: 100 } };

        await postItem(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});
