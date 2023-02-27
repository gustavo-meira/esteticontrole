type IdString = {
  id: string;
};

export const changeEditedItemToArray = <Item>(items: (Item & IdString)[], editedItem: (Item & IdString)): Item[] => {
  const indexEditedItem = items.findIndex(({ id }) => id === editedItem.id);
  const copyItems = [...items];
  copyItems[indexEditedItem] = editedItem;
  return copyItems;
};
