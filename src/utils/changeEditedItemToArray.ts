type IdString = {
  id: string;
};

export const changeEditedItemToArray = <Item>(items: (Item & IdString)[], editedPackage: (Item & IdString)): Item[] => {
  const indexEditedItem = items.findIndex(({ id }) => id === editedPackage.id);
  const copyItems = [...items];
  copyItems[indexEditedItem] = editedPackage;
  return copyItems;
};
