export const addNumeration = (items, currentPage, pageSize, reversed = false, total) => {
    const itemsWithNumbers = [];

    if (!reversed) {
        items.map((item) => {
            itemsWithNumbers.push({
                ...item,
                number: items.indexOf(item) + 1 + (currentPage - 1) * pageSize
            });
        });
    } else {
        items.map((item) => {
            itemsWithNumbers.push({
                ...item,
                number: count - items.indexOf(item) - (currentPage - 1) * pageSize
            });
        });
    }

    return items;
};