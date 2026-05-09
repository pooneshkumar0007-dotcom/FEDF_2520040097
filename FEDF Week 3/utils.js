export const addItem = (data, item) => [...data, item];

export const filterItems = (data, key) =>
    data.filter(d => d.name.toLowerCase().includes(key.toLowerCase()));